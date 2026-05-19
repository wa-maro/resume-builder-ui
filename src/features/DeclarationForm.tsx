import { Edit, Save, X } from "lucide-react";
import Label from "../components/form/Label";
import TextArea from "../components/form/TextArea";
import TextInput from "../components/form/TextInput";
import ActionButton from "../components/ui/ActionButton";
import { useTranslation } from "react-i18next";

const DeclarationForm = ({
  declaration,
  setDeclaration,
  onSave,
  setAlert,
  resume,
  isEditing,
  setIsEditing,
}: {
  declaration: Declaration;
  setDeclaration: React.Dispatch<React.SetStateAction<Declaration>>;
  onSave: (data: Declaration) => Promise<void>;
  setAlert: React.Dispatch<React.SetStateAction<Alert | undefined>>;
  resume?: Resume;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation();

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    if (!declaration.statement.trim() || !declaration.date) {
      setAlert({
        success: false,
        messages: ["Please fill in all required fields."],
      });
      return;
    }

    await onSave(declaration);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1 mb-5">
        <Label htmlFor="statement" text={t("statement")} />
        <TextArea
          name="statement"
          required
          value={declaration.statement}
          disabled={!isEditing}
          onChange={(e) =>
            setDeclaration({ ...declaration, statement: e.target.value })
          }
          placeholder="Declaration statement..."
        />
      </div>

      <div className="flex flex-col gap-1 mb-5">
        <Label htmlFor="signature" text={t("signature")} />
        <TextInput
          name="signature"
          type="text"
          value={declaration.signature ?? ""}
          disabled={!isEditing}
          onChange={(e) =>
            setDeclaration({ ...declaration, signature: e.target.value })
          }
          placeholder="Signature"
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="date" text={t("date")} />
        <TextInput
          name="date"
          type="date"
          value={declaration.date ?? new Date().toISOString().split("T")[0]}
          disabled={!isEditing}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) =>
            setDeclaration({ ...declaration, date: e.target.value })
          }
        />
      </div>

      {!isEditing && (
        <button
          type="button"
          className={`${
            resume?.declaration
              ? "bg-blue-700 hover:bg-blue-600"
              : "bg-emerald-700 hover:bg-emerald-600"
          } text-white rounded px-3.5 py-1.5 flex items-center gap-x-2 mt-5`}
          onClick={() => setIsEditing(true)}
        >
          <Edit size={16} />
          {t("update_resume")}
        </button>
      )}

      {isEditing && (
        <div className="flex items-center justify-between">
          <button
            type="button" // prevent form submission
            className="bg-slate-800 rounded-s text-white cursor-pointer px-3.5 py-1.5 flex items-center gap-x-2 mt-5"
            onClick={() => setIsEditing(false)}
          >
            <X size={16} />
            {t("cancel")}
          </button>

          <ActionButton
            text={t("save")}
            theme="bg-emerald-700 hover:bg-slate-600"
            icon={<Save size={16} />}
          />
        </div>
      )}
    </form>
  );
};

export default DeclarationForm;
