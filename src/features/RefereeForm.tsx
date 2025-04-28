import { Plus } from "lucide-react";
import Label from "../components/Label";
import TextInput from "../components/TextInput";
import ActionButton from "../components/ActionButton";
import { useState } from "react";

const newReferee: Reference = {
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
}: {
  references: Reference[];
  setReferences: React.Dispatch<React.SetStateAction<Reference[]>>;
}) => {
  const [reference, setReference] = useState<Reference>(newReferee);

  const onChangeHandler = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setReference({ ...reference, [ev.target.name]: ev.target.value });

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (references.length >= 3) return;

    // set resume ID
    reference.resumeId = "";

    setReferences([...references, reference]);
    setReference(newReferee);
  };

  return (
    <form method="post" onSubmit={onSubmitHandler}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        <div className="flex flex-col gap-1">
          <Label text="full name" htmlFor="fullName" />
          <TextInput
            type="text"
            name="fullName"
            placeholder="Full name"
            onChange={onChangeHandler}
            value={reference.fullName}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label text="position" htmlFor="position" />
          <TextInput
            type="text"
            name="position"
            placeholder="Position"
            onChange={onChangeHandler}
            value={reference.position}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label text="organization" htmlFor="organization" />
          <TextInput
            type="text"
            name="organization"
            placeholder="organization name"
            onChange={onChangeHandler}
            value={reference.organization}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label text="email" htmlFor="email" />
          <TextInput
            type="text"
            name="email"
            placeholder="Email"
            onChange={onChangeHandler}
            value={reference.email}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label text="phone" htmlFor="phone" />
          <TextInput
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={onChangeHandler}
            value={reference.phone}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label text="Physical Address" htmlFor="physicalAddress" />
          <TextInput
            type="text"
            name="physicalAddress"
            placeholder="P.O Box..."
            onChange={onChangeHandler}
            value={reference.physicalAddress}
          />
        </div>
      </div>

      <ActionButton
        text="Add"
        theme="bg-violet-600"
        icon={<Plus size={16} />}
      />
    </form>
  );
};

export default RefereeForm;
