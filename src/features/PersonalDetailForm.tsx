import { ArrowRight } from "lucide-react";
import Label from "../components/Label";
import TextInput from "../components/TextInput";
import Select from "../components/Select";

const PersonalDetailForm = ({
  person,
  setPerson,
}: {
  person: Person;
  setPerson: React.Dispatch<React.SetStateAction<Person>>;
}) => {
  const onChangeHandler = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form method="post" onSubmit={onSubmitHandler}>
      <div className="text-sm flex items-center space-x-2 mt-6 mb-5">
        <span className="h-0.5 bg-teal-400 flex-1"></span>
        <span>Personal Details</span>
        <span className="h-0.5 bg-teal-400 flex-1"></span>
      </div>

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
          <Label text="Sex" htmlFor="sex" />
          <Select
            label="Choose gender"
            name="sex"
            onChange={onChangeHandler}
            value={person.sex}
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
            value={person.placeOfDomicile}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label text="disabilty (if any)" htmlFor="disabilities" />
          <TextInput
            name="disabilities"
            placeholder="Leave empty if none"
            onChange={onChangeHandler}
            value={person.disabilities}
          />
        </div>
      </div>

      <div className="text-sm flex items-center space-x-2 mt-10 mb-5">
        <span className="h-0.5 bg-teal-400 flex-1"></span>
        <span>Contanct Details</span>
        <span className="h-0.5 bg-teal-400 flex-1"></span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        <div className="flex flex-col gap-1.5">
          <Label text="email" htmlFor="email" />
          <TextInput
            type="email"
            name="email"
            placeholder="Email"
            onChange={onChangeHandler}
            value={person.email}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label text="phone" htmlFor="phone" />
          <TextInput
            type="tel"
            name="phone"
            placeholder="Phone"
            onChange={onChangeHandler}
            value={person.phone}
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

      <div className="mt-8">
        <button
          type="submit"
          className="rounded-e font-medium px-3.5 py-1.5 text-sm text-nowrap text-center flex items-center space-x-2 bg-teal-600 text-gray-200 cursor-pointer"
        >
          <span>Next</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </form>
  );
};

export default PersonalDetailForm;
