import { Plus } from "lucide-react";
import Label from "../components/Label";
import TextInput from "../components/TextInput";

const RefereeForm = ({
  reference,
  setReference,
}: {
  reference: Reference;
  setReference: React.Dispatch<React.SetStateAction<Reference>>;
}) => {
  const onChangeHandler = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setReference({ ...reference, [ev.target.name]: ev.target.value });

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
          <Label text="institution" htmlFor="institution" />
          <TextInput
            type="text"
            name="institution"
            placeholder="Institution name"
            onChange={onChangeHandler}
            value={reference.institution}
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

      <div className="mt-5 flex justify-end">
        <button
          type="submit"
          className="bg-violet-400 text-gray-100 rounded-s font-medium px-3.5 py-1.5 text-sm text-nowrap text-center flex items-center gap-x-2"
        >
          <Plus size={16} />
          <span>Add</span>
        </button>
      </div>
    </form>
  );
};

export default RefereeForm;
