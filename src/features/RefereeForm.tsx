import { Plus } from "lucide-react";
import Label from "../components/form/Label";
import TextInput from "../components/form/TextInput";
import ActionButton from "../components/ui/ActionButton";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const newReferee: Referee = {
  fullName: "",
  position: "",
  organization: "",
  email: "",
  phone: "",
  physicalAddress: "",
};

const RefereeForm = ({
  references,
  setReferences,
  editing,
  setEditing,
  onSave,
}: {
  references: Referee[];
  setReferences: React.Dispatch<React.SetStateAction<Referee[]>>;
  editing: Referee | null;
  setEditing?: React.Dispatch<React.SetStateAction<Referee | null>>;
  onSave?: (reference: Referee) => void;
}) => {
  const { t } = useTranslation();
  const [reference, setReference] = useState<Referee>(newReferee);

  const onChangeHandler = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => setReference({ ...reference, [ev.target.name]: ev.target.value });

  useEffect(() => {
    if (editing) {
      setReference(editing);
    } else {
      setReference(reference);
    }
  }, [editing]);

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!reference.fullName) return alert(t("referee_name_required"));
    if (!reference.position) return alert(t("referee_position_required"));
    if (!reference.organization)
      return alert(t("referee_organization_required"));
    if (!reference.phone) return alert(t("referee_email_required"));
    if (!reference.email) return alert(t("referee_phone_required"));
    if (!reference.physicalAddress)
      return alert(t("referee_physical_address_required"));

    if (references.length >= 3) return;
    if (onSave) {
      onSave(reference);
    } else {
      if (editing) {
        setReferences((prev) =>
          prev.map((p) => (p._id === reference._id ? reference : p)),
        );
        setEditing?.(null);
      } else {
        setReferences([...references, reference]);
      }
    }

    setReference(newReferee);
  };

  return (
    <form method="post" onSubmit={onSubmitHandler}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-x-6">
        <div className="flex flex-col gap-1">
          <Label text={t("full_name")} htmlFor="fullName" />
          <TextInput
            type="text"
            name="fullName"
            placeholder={t("full_name")}
            onChange={onChangeHandler}
            value={reference.fullName}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label text={t("position")} htmlFor="position" />
          <TextInput
            type="text"
            name="position"
            placeholder={t("position")}
            onChange={onChangeHandler}
            value={reference.position}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label
            text={`${t("organization")} / ${t("institution")}`}
            htmlFor="organization"
          />
          <TextInput
            type="text"
            name="organization"
            placeholder={t("placeholder_organization_name")}
            onChange={onChangeHandler}
            value={reference.organization}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label text={t("email")} htmlFor="email" />
          <TextInput
            type="text"
            name="email"
            placeholder={t("email")}
            onChange={onChangeHandler}
            value={reference.email}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label text={t("phone")} htmlFor="phone" />
          <TextInput
            type="text"
            name="phone"
            placeholder={t("phone")}
            onChange={onChangeHandler}
            value={reference.phone}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label text={t("physical_address")} htmlFor="physicalAddress" />
          <TextInput
            type="text"
            name="physicalAddress"
            placeholder={t("placeholder_physical_address")}
            onChange={onChangeHandler}
            value={reference.physicalAddress}
          />
        </div>
      </div>

      <ActionButton
        text={editing ? t("update") : t("add")}
        theme="bg-violet-600"
        icon={<Plus size={16} />}
      />
    </form>
  );
};

export default RefereeForm;
