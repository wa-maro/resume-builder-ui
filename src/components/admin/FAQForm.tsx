interface FAQFormProps {
  formData: FAQ;
  setFormData: React.Dispatch<React.SetStateAction<FAQ>>;
  onSubmit: (e: React.FormEvent) => void;
  onDelete?: () => void;
  title?: string;
}

const FAQForm: React.FC<FAQFormProps> = ({
  formData,
  setFormData,
  onSubmit,
  onDelete,
  title = "Create FAQ",
}) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, type, value } = e.target;

    // Handle checkbox separately
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement; // Narrow type
      setFormData({ ...formData, [name]: target.checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <form onSubmit={onSubmit} className="space-y-5">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">{title}</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Question
          </label>
          <input
            type="text"
            name="question"
            value={formData.question}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Answer
          </label>
          <textarea
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            rows={4}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Order
          </label>
          <input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="isActive"
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="isActive" className="text-sm text-gray-700">
            Active
          </label>
        </div>

        <div className="flex gap-4 pt-4">
          {formData._id && (
            <button
              type="button"
              onClick={onDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md transition"
            >
              Delete
            </button>
          )}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default FAQForm;
