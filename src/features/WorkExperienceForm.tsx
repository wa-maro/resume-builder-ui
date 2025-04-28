import { Plus } from "lucide-react";
import Label from "../components/Label";
import TextInput from "../components/TextInput";
import TextArea from "../components/TextArea";
import ActionButton from "../components/ActionButton";
import { useState } from "react";

const newExperience: Experience = {
  jobTitle: "",
  company: { name: "", location: "" },
  responsibilities: "",
  currentlyWorking: false,
  startDate: "",
  endDate: "",
};

const WorkExperienceForm = ({
  experiences,
  setExperiences,
}: {
  experiences: Experience[];
  setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;
}) => {
  const [experience, setExperience] = useState<Experience>(newExperience);

  const onChangeHandler = (
    ev: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => setExperience({ ...experience, [ev.target.name]: ev.target.value });

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // set resume ID
    experience.resumeId = "";

    setExperiences([...experiences, experience]);
    setExperience(newExperience);
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

      <ActionButton
        text="Add"
        theme="bg-violet-600"
        icon={<Plus size={16} />}
      />
    </form>
  );
};

export default WorkExperienceForm;
