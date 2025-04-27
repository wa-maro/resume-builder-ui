import { useState } from "react";
import Label from "../components/Label";
import TextInput from "../components/TextInput";
import { Send } from "lucide-react";
import TextArea from "../components/TextArea";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: handle form submission (e.g., call API or send email)
    // Connect to an email service (like EmailJS, Nodemailer API) or a backend endpoint
  };

  return (
    <form
      method="post"
      className="space-y-6 bg-white p-8 shadow-md rounded-xl"
      onSubmit={onSubmitHandler}
    >
      <div>
        <Label
          htmlFor="name"
          text="name"
          style="block text-gray-700 mb-1 capitalize"
        />
        <TextInput
          name="name"
          style="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-rose-600"
          value={form.name}
          onChange={onChangeHandler}
        />
      </div>

      <div>
        <Label
          htmlFor="email"
          text="email"
          style="block text-gray-700 mb-1 capitalize"
        />
        <TextInput
          type="email"
          name="email"
          style="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-rose-600"
          value={form.email}
          onChange={onChangeHandler}
        />
      </div>

      <div>
        <Label
          htmlFor="message"
          text="message"
          style="block text-gray-700 mb-1 capitalize"
        />
        <TextArea
          name="message"
          required={true}
          value={form.message}
          onChange={onChangeHandler}
        />
      </div>

      <button
        type="submit"
        className="flex items-center gap-2 bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-700 transition"
      >
        <Send className="w-4 h-4" />
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
