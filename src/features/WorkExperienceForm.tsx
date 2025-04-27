import { Plus } from "lucide-react";
import React from "react";
import Label from "../components/Label";
import TextInput from "../components/TextInput";
import TextArea from "../components/TextArea";

const WorkExperienceForm = ({
  experience,
  setExperience,
}: {
  experience: Experience;
  setExperience: React.Dispatch<React.SetStateAction<Experience>>;
}) => {
  const onChangeHandler = (
    ev: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => setExperience({ ...experience, [ev.target.name]: ev.target.value });

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form method="post" onSubmit={onSubmitHandler}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        <div className="flex flex-col gap-1">
          <Label text="Job Title" htmlFor="jobTitle" />
          <TextInput
            name="jobTitle"
            placeholder="React developer"
            onChange={onChangeHandler}
            value={experience.jobTitle}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label text="company name" htmlFor="companyName" />
          <TextInput
            name="companyName"
            placeholder="FluentTek"
            onChange={(e) =>
              setExperience({
                ...experience,
                company: { ...experience.company, name: e.target.value },
              })
            }
            value={experience.company.name}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label text="company location" htmlFor="companyLocation" />
          <TextInput
            name="companyLocation"
            placeholder="Mbinga, Tanzania"
            onChange={(e) =>
              setExperience({
                ...experience,
                company: { ...experience.company, location: e.target.value },
              })
            }
            value={experience.company.location}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label text="Starting Date" htmlFor="startDate" />
          <TextInput
            name="startDate"
            placeholder="E.g Jan 2013"
            onChange={onChangeHandler}
            value={experience.startDate}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label text="Ending Date" htmlFor="endDate" />
          <TextInput
            name="endDate"
            placeholder="E.g May 2019"
            onChange={onChangeHandler}
            value={experience.endDate}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-5">
        <Label text="responsibilities" htmlFor="responsibilities" />
        <TextArea
          name="responsibilities"
          required={true}
          onChange={onChangeHandler}
          value={experience.responsibilities}
        />
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

export default WorkExperienceForm;
