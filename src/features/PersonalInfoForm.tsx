import Label from "../components/form/Label";
import TextInput from "../components/form/TextInput";
import Select from "../components/form/Select";
import SectionDivider from "../components/SectionDivider";
import { omitFields } from "../utility/omitFields";
import { toDDMMYYYY } from "../utility/dateFormat";
import ActionButton from "../components/ui/ActionButton";
import { Edit, Plus, Save, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const disabilityOptions: Disability[] = [
  "none",
  "visual",
  "hearing",
  "mobility",
  "cognitive",
  "other",
];

type PersonalInfoProps = {
  person: PersonalInfo;
  setPerson: React.Dispatch<React.SetStateAction<PersonalInfo>>;
  addPersonalInfo: (data: PersonalInfo) => Promise<void>;
  updatePersonalInfo: (data: PersonalInfo) => Promise<void>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const PersonalDetailForm = ({
  person,
  setPerson,
  addPersonalInfo,
  updatePersonalInfo,
  isEditing,
  setIsEditing,
}: PersonalInfoProps) => {
  const { t } = useTranslation();

  const onChangeHandler = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  function onCheckBox(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value.trim() as Disability;
    const isChecked = e.target.checked;

    let updated = [...(person.disabilities ?? [])];

    if (isChecked) {
      // If "none" is checked, remove others
      if (value === "none") {
        updated = ["none"];
      } else {
        updated = updated.filter((v) => v !== "none");
        updated.push(value);
      }
    } else {
      updated = updated.filter((v) => v !== value);
    }

    setPerson({ ...person, disabilities: updated });
  }

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: PersonalInfo = {
      ...omitFields(person, ["_id", "resume", "createdAt", "updatedAt"]),
      dateOfBirth: toDDMMYYYY(person.dateOfBirth),
    };

    if (!person._id) await addPersonalInfo(data);
    else await updatePersonalInfo(data);

    setIsEditing(false);
  };

  return (
    <form method="post" onSubmit={onSubmitHandler}>
      <SectionDivider title={t("personal_details")} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-x-6">
        <div className="flex flex-col gap-1.5">
          <Label text={t("full_name")} htmlFor="fullName" />
          <TextInput
            name="fullName"
            placeholder={t("full_name")}
            onChange={onChangeHandler}
            value={person.fullName}
            disabled={!isEditing}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label text={t("gender")} htmlFor="gender" />
          <Select
            label={t("choose_gender")}
            name="gender"
            onChange={onChangeHandler}
            value={person.gender}
            disabled={!isEditing}
          >
            <option value="female">{t("female")}</option>
            <option value="male">{t("male")}</option>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label text={t("date_of_birth")} htmlFor="dateOfBirth" />
          <TextInput
            type="date"
            name="dateOfBirth"
            onChange={onChangeHandler}
            value={person.dateOfBirth}
            disabled={!isEditing}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label text={t("nationality")} htmlFor="nationality" />
          <Select
            name="nationality"
            label={t("choose_nationality")}
            onChange={onChangeHandler}
            value={person.nationality}
            disabled={!isEditing}
          >
            <option value="tanzania">{t("tanzania")}</option>
            <option value="kenya">{t("kenya")}</option>
            <option value="uganda">{t("uganda")}</option>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label text={t("place_of_domicile")} htmlFor="placeOfDomicile" />
          <TextInput
            name="placeOfDomicile"
            placeholder={t("place_of_domicile_placeholder")}
            onChange={onChangeHandler}
            value={person.placeOfDomicile ?? ""}
            disabled={!isEditing}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label text={t("marital_status")} htmlFor="maritualStatus" />
          <Select
            label={t("choose_marital_status")}
            name="maritualStatus"
            onChange={onChangeHandler}
            value={person.maritualStatus ?? ""}
            disabled={!isEditing}
          >
            <option value="single">{t("single")}</option>
            <option value="married">{t("married")}</option>
            <option value="divorced">{t("divorced")}</option>
            <option value="widowed">{t("widowed")}</option>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-1 max-w-xs my-5">
        <fieldset>
          <legend className="text-sm text-gray-600 capitalize mb-1">
            {t("disabilities")}
          </legend>
          <ul className="grid grid-cols-2 gap-1">
            {disabilityOptions.map((option) => (
              <li key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name={option}
                  id={option}
                  value={option}
                  checked={(person.disabilities ?? []).includes(option)}
                  onChange={onCheckBox}
                  disabled={!isEditing}
                />
                <label htmlFor={option}>{t(`${option}`)}</label>
              </li>
            ))}
          </ul>
        </fieldset>
      </div>

      <SectionDivider title={t("contact_details")} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-x-6">
        <div className="flex flex-col gap-1.5">
          <Label text={t("email")} htmlFor="email" />
          <TextInput
            type="email"
            name="email"
            placeholder={t("email")}
            onChange={onChangeHandler}
            value={person.email ?? ""}
            disabled={!isEditing}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label text={t("phone")} htmlFor="phone" />
          <TextInput
            type="tel"
            name="phone"
            placeholder={t("phone")}
            onChange={onChangeHandler}
            value={person.phone ?? ""}
            disabled={!isEditing}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label text={t("physical_address")} htmlFor="physicalAddress" />
          <TextInput
            name={t("physicalAddress")}
            placeholder={t("placeholder_physical_address")}
            onChange={onChangeHandler}
            value={person.physicalAddress}
            disabled={!isEditing}
          />
        </div>
      </div>

      <div className="">
        {!isEditing ? (
          <button
            className={`${
              person._id
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-emerald-600 hover:bg-emerald-700"
            } text-white rounded cursor-pointer px-5 py-1.5 flex items-center gap-x-2 mt-5`}
            onClick={() => setIsEditing(true)}
          >
            {person._id ? t("update") : t("add")}
            {person._id ? <Edit size={16} /> : <Plus size={16} />}
          </button>
        ) : (
          <div className="flex items-center justify-between">
            <button
              className="bg-slate-800 rounded-s text-white cursor-pointer px-3.5 py-1.5 flex items-center gap-x-2 mt-5"
              onClick={() => setIsEditing(false)}
            >
              <X size={16} />
              {t("cancel")}
            </button>
            <ActionButton
              text={t("save")}
              theme="bg-teal-600"
              icon={<Save size={16} />}
            />
          </div>
        )}
      </div>
    </form>
  );
};

export default PersonalDetailForm;
