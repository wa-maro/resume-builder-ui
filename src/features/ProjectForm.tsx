import { useEffect, useState } from "react";
import Label from "../components/form/Label";
import TextInput from "../components/form/TextInput";
import TextArea from "../components/form/TextArea";
import ActionButton from "../components/ui/ActionButton";
import { Plus } from "lucide-react";
import FileInput from "../components/form/FileInput";
import ImagePreview from "../components/ui/ImagePreview";

const defaultProject: Project = {
  resume: "",
  title: "",
  description: "",
  image: "",
  socialLinks: [],
  tools: [],
};

const ProjectForm = ({
  projects,
  setProjects,
  editing,
  setEditing,
  onSave,
}: {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  editing: Project | null;
  setEditing?: React.Dispatch<React.SetStateAction<Project | null>>;
  onSave?: (project: Project) => void;
}) => {
  const [project, setProject] = useState<Project>(defaultProject);
  const [toolsInput, setToolsInput] = useState<string>("");
  const [socialLinksInput, setSocialLinksInput] = useState<string>("");

  useEffect(() => {
    if (editing) {
      setProject(editing);
      setToolsInput(editing.tools?.join(", ") || "");
      setSocialLinksInput(editing.socialLinks?.join(", ") || "");
    } else {
      setProject(defaultProject);
      setToolsInput("");
      setSocialLinksInput("");
    }
  }, [editing]);

  const onChangeHandler = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = ev.target;
    setProject({ ...project, [name]: value });
  };

  const onFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];
    if (file) setProject({ ...project, image: file });
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!project.title) return alert("Project title is required");
    if (!project.description) return alert("Project description is required");

    const finalProject: Project = {
      ...project,
      tools: [
        ...new Set(
          toolsInput
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t),
        ),
      ],
      socialLinks: [
        ...new Set(
          socialLinksInput
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s),
        ),
      ],
    };

    if (onSave) {
      onSave(finalProject);
    } else {
      if (editing) {
        setProjects((prev) =>
          prev.map((p) => (p._id === finalProject._id ? finalProject : p)),
        );
        setEditing?.(null);
      } else {
        setProjects([...projects, finalProject]);
      }
    }

    setProject(defaultProject);
    setToolsInput("");
    setSocialLinksInput("");
  };

  return (
    <form onSubmit={onSubmitHandler} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-x-6">
        <div className="flex flex-col gap-1">
          <Label text="Project Title" htmlFor="title" />
          <TextInput
            name="title"
            placeholder="House Painting"
            value={project.title}
            onChange={onChangeHandler}
            required={!editing}
          />
        </div>

        <div className="flex flex-col gap-1 relative">
          <Label text="Project Image" htmlFor="image" />
          <FileInput name="image" onChange={onFileChange} required={!editing} />
          {project.image && (
            <ImagePreview file={project.image} className="mt-2" />
          )}
          <p className="text-xs text-gray-500 absolute left-0 -bottom-5">
            Only image (e.g. PNG)
          </p>
        </div>

        <div className="flex flex-col gap-1 relative">
          <Label text="social Links (optional)" htmlFor="socialLinks" />
          <TextInput
            name="socialLinks"
            placeholder="https://wa.me/c/255700123456"
            value={socialLinksInput}
            onChange={(e) => setSocialLinksInput(e.target.value)}
          />
          <p className="text-xs text-gray-500 absolute left-0 -bottom-5">
            Separate with commas
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <Label text="Description" htmlFor="description" />
        <TextArea
          name="description"
          placeholder="Painted a 3-bedroom house using weather-resistant paint..."
          value={project.description}
          onChange={onChangeHandler}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label text="Tools/Materials" htmlFor="tools" />
        <TextInput
          name="tools"
          placeholder="Brush, Roller, Paint"
          value={toolsInput}
          onChange={(e) => setToolsInput(e.target.value)}
        />
        <p className="text-xs text-gray-500">Separate with commas</p>
      </div>

      <ActionButton
        text={editing ? "Update" : "Add"}
        theme="bg-violet-600"
        icon={<Plus size={16} />}
      />
    </form>
  );
};

export default ProjectForm;
