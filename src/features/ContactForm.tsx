import { useState } from "react";
import Label from "../components/form/Label";
import TextInput from "../components/form/TextInput";
import { Send } from "lucide-react";
import TextArea from "../components/form/TextArea";
import { useTranslation } from "react-i18next";
import StatusMessage from "../components/StatusMessage";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v0";

const ContactForm = () => {
  const { t } = useTranslation();
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(`${API_BASE_URL}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      setStatus(result.success ? "success" : "error");
      setFormdata({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form
      method="post"
      aria-busy={loading}
      className="space-y-6 bg-white p-8 shadow-md rounded-xl max-w-4xl mx-auto"
      onSubmit={onSubmitHandler}
    >
      <div>
        <Label
          htmlFor="name"
          text={t("name")}
          style="block text-gray-700 mb-1 capitalize"
        />
        <TextInput
          name="name"
          style="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
          value={formData.name}
          onChange={onChangeHandler}
        />
      </div>

      <div>
        <Label
          htmlFor="email"
          text={t("email")}
          style="block text-gray-700 mb-1 capitalize"
        />
        <TextInput
          type="email"
          name="email"
          style="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
          value={formData.email}
          onChange={onChangeHandler}
        />
      </div>

      <div>
        <Label
          htmlFor="message"
          text={t("message")}
          style="block text-gray-700 mb-1 capitalize"
        />
        <TextArea
          name="message"
          required={true}
          value={formData.message}
          onChange={onChangeHandler}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 bg-amber-700 text-white px-4 py-2 rounded-md hover:bg-amber-800 transition"
      >
        <Send className="w-4 h-4" />
        {loading ? "Sending..." : t("send_message")}
      </button>

      <StatusMessage status={status} setStatus={setStatus} />
    </form>
  );
};

export default ContactForm;
