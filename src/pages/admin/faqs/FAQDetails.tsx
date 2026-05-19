import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/ui/Spinner";
import FAQForm from "../../../components/admin/FAQForm";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1/admin";

const FAQDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [faq, setFAQ] = useState<any>();
  const [formData, setFormData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  const fetchFAQ = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/faqs/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result: FetchResponse<any> = await res.json();
      setFAQ(result.data);
      setFormData(result.data);
    } catch (error) {
      console.error("❌ Failed to fetch faq", error);
      setFAQ(undefined);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/faqs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result: FetchResponse<any> = await res.json();
      if (!result.success) return;

      navigate("/admin/system/faqs");
    } catch (error) {
      console.error("❌ Failed to delete FAQ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/faqs/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: formData.question,
          answer: formData.answer,
          order: Number(formData.order),
          isActive: formData.isActive,
        }),
      });
      const result = await res.json();
      if (!result.success) return;

      setFormData({
        question: "",
        answer: "",
        order: 0,
        isActive: true,
      });

      navigate("/admin/system/faqs");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQ();
  }, []);

  if (loading) return <Spinner />;
  if (!faq) return <div>FAQ not found</div>;

  return (
    <div>
      <FAQForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default FAQDetails;
