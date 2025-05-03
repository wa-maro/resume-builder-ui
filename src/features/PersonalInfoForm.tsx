import { ArrowRight } from "lucide-react";
import Label from "../components/Label";
import TextInput from "../components/TextInput";
import Select from "../components/Select";
import SectionDivider from "../components/SectionDivider";
import ActionButton from "../components/ActionButton";

const disabilityOptions: Disability[] = [
  "none",
  "visual",
  "hearing",
  "mobility",
  "cognitive",
  "other",
];

const PersonalDetailForm = ({
  person,
  setPerson,
}: {
  person: PersonalInfo;
  setPerson: React.Dispatch<React.SetStateAction<PersonalInfo>>;
}) => {
  const onChangeHandler = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  function onCheckBox(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value as Disability;
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
  };

  return (
    <form method="post" onSubmit={onSubmitHandler}>
      <SectionDivider title="Personal Details" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        <div className="flex flex-col gap-1.5">
          <Label text="Full Name" htmlFor="fullName" />
          <TextInput
            name="fullName"
            placeholder="Full Name"
            onChange={onChangeHandler}
            value={person.fullName}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label text="gender" htmlFor="gender" />
          <Select
            label="Choose gender"
            name="gender"
            onChange={onChangeHandler}
            value={person.gender}
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label text="date of birth" htmlFor="dateOfBirth" />
          <TextInput
            type="date"
            name="dateOfBirth"
            onChange={onChangeHandler}
            value={person.dateOfBirth}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label text="nationality" htmlFor="nationality" />
          <Select
            name="nationality"
            label="Choose nationality"
            onChange={onChangeHandler}
            value={person.nationality}
          >
            <option value="tanzania">Tanzanian</option>
            <option value="kenya">Kenyan</option>
            <option value="uganda">Uganda</option>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label text="place Of Domicile" htmlFor="placeOfDomicile" />
          <TextInput
            name="placeOfDomicile"
            placeholder="District, Region"
            onChange={onChangeHandler}
            value={person.placeOfDomicile ?? ""}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1 max-w-xs mt-5 mb-10">
        <fieldset>
          <legend className="text-sm text-gray-600 capitalize mb-1">
            Disabilities
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
                />
                <label>{option}</label>
              </li>
            ))}
          </ul>
        </fieldset>
      </div>

      <SectionDivider title="Contanct Details" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        <div className="flex flex-col gap-1.5">
          <Label text="email" htmlFor="email" />
          <TextInput
            type="email"
            name="email"
            placeholder="Email"
            onChange={onChangeHandler}
            value={person.email ?? ""}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label text="phone" htmlFor="phone" />
          <TextInput
            type="tel"
            name="phone"
            placeholder="Phone"
            onChange={onChangeHandler}
            value={person.phone ?? ""}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label text="Physical Address" htmlFor="physicalAddress" />
          <TextInput
            name="physicalAddress"
            placeholder="P.O Box ..."
            onChange={onChangeHandler}
            value={person.physicalAddress}
          />
        </div>
      </div>

      <ActionButton
        text="Next"
        theme="bg-teal-600"
        icon={<ArrowRight size={16} />}
      />
    </form>
  );
};

export default PersonalDetailForm;
