import Label from "../components/form/Label";
import TextArea from "../components/form/TextArea";
import ActionButton from "../components/ui/ActionButton";
import { Plus, Save, X } from "lucide-react";
import Select from "../components/form/Select";
import { useTranslation } from "react-i18next";

export const jobTitles = [
  "house_painter",
  "electrician",
  "plumber",
  "carpenter",
  "construction_worker",
  "mechanic",
  "auto_electrician",
  "tailor",
  "computer_technician",
  "charcoal_seller",
  "shopkeeper",
  "sign_painter",
  "chef",
  "electrical_equipment_technician",
  "driver",
  "vegetable_vendor",
  "fish_seller",
  "fruit_seller",
  "sports_teacher",
  "business_consultant",
];

interface ResumeFormProps {
  formData: { title: string; summary: string };
  onChangeHandler: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  isUpdate?: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResumeForm: React.FC<ResumeFormProps> = ({
  formData,
  onChangeHandler,
  onSubmitHandler,
  isUpdate = false,
  setIsEditing,
}) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmitHandler} className="pb-6">
      <div className="flex flex-col gap-1 mb-4 lg:max-w-sm">
        <Label text={t("job_title")} htmlFor="jobTitle" />
        <Select
          label={t("select_job_title")}
          name="title"
          value={formData.title}
          onChange={onChangeHandler}
        >
          {jobTitles.map((job) => (
            <option key={job} value={job}>
              {t(`${job}`)}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <Label text={t("professional_summary")} htmlFor="summary" />
        <TextArea
          name="summary"
          required
          placeholder={t("professional_summary_placeholder")}
          value={formData.summary}
          onChange={onChangeHandler}
        />
      </div>

      <div className="flex items-center justify-between">
        {isUpdate && (
          <button
            className="bg-slate-800 rounded-s text-white cursor-pointer px-3.5 py-1.5 flex items-center gap-x-2 mt-5"
            onClick={() => setIsEditing(false)}
          >
            <X size={16} />
            {t("cancel")}
          </button>
        )}
        <ActionButton
          text={isUpdate ? t("update_resume") : t("create_resume")}
          theme="bg-emerald-700 hover:bg-slate-600"
          icon={isUpdate ? <Save size={16} /> : <Plus size={16} />}
        />
      </div>
    </form>
  );
};

export default ResumeForm;
