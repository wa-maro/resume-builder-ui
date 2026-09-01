import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/ui/Spinner";
import { toDDMMYYYY, toYYYDDMM } from "../../../utility/dateFormat";
import { useTranslation } from "react-i18next";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1/admin";

const disabilityOptions: Disability[] = [
  "none",
  "visual",
  "hearing",
  "mobility",
  "cognitive",
  "other",
];

const PersonalInfoDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [personalInfo, setPersonalInfo] = useState<any>();
  const [formData, setFormData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  const getPersonalInfo = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/personal-informations/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result: FetchResponse<any> = await res.json();
      setPersonalInfo(result.data);
      setFormData({
        ...result.data,
        dateOfBirth: toYYYDDMM(result.data.dateOfBirth),
      });
    } catch (error) {
      console.error("❌ Failed to fetch personal info", error);
      setPersonalInfo(undefined);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPersonalInfo();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function onCheckBox(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value.trim() as Disability;
    const isChecked = e.target.checked;

    let updated = [...(formData.disabilities ?? [])];

    if (isChecked) {
      // If "none" is checked, remove others
      if (value === "none") {
        updated = ["none"];
      } else {
        updated = updated.filter((v) => v !== "none");
        updated.push(value);
      }
    } else {
      updated = updated.filter((v) => v !== value);
    }

    setFormData({ ...formData, disabilities: updated });
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/personal-informations/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          dateOfBirth: toDDMMYYYY(formData.dateOfBirth),
        }),
      });
      const result: FetchResponse<any> = await res.json();
      if (!result.success) return;
      navigate("/admin/sections/personal-informations");
    } catch (error) {
      console.error("❌ Failed to update personal info", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/personal-informations/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result: FetchResponse<any> = await res.json();
      if (!result.success) return;
      navigate("/admin/sections/personal-informations");
    } catch (error) {
      console.error("❌ Failed to delete personal info", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (!personalInfo) return <div>Personal info not found</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-cyan-800">
        Personal Info Details
      </h2>

      <form onSubmit={handleUpdate} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            value={formData.resume.user.username || ""}
            readOnly
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-100"
          />
        </div>

        {/* Resume Title (immutable) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Resume Title
          </label>
          <input
            type="text"
            value={t(formData.resume.title) || ""}
            readOnly
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-100"
          />
        </div>

        {/* Editable Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          >
            <option value="female">{t("female")}</option>
            <option value="male">{t("male")}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nationality
          </label>
          <select
            name="nationality"
            value={formData.nationality || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          >
            <option value="tanzania">{t("tanzania")}</option>
            <option value="kenya">{t("kenya")}</option>
            <option value="uganda">{t("uganda")}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Place of Domicile
          </label>
          <input
            type="text"
            name="placeOfDomicile"
            value={formData.placeOfDomicile || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Marital Status
          </label>
          <select
            name="maritualStatus"
            value={formData.maritualStatus || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          >
            <option value="single">{t("single")}</option>
            <option value="married">{t("married")}</option>
            <option value="divorced">{t("divorced")}</option>
            <option value="widowed">{t("widowed")}</option>{" "}
          </select>
        </div>

        <div className="flex flex-col gap-1 max-w-xs my-5">
          <fieldset>
            <legend className="text-sm text-gray-600 capitalize mb-1">
              {t("disabilities")}
            </legend>
            <ul className="grid grid-cols-2 gap-1">
              {disabilityOptions.map((option) => (
                <li key={option} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name={option}
                    id={option}
                    value={option}
                    checked={(formData.disabilities ?? []).includes(option)}
                    onChange={onCheckBox}
                  />
                  <label htmlFor={option}>{t(`${option}`)}</label>
                </li>
              ))}
            </ul>
          </fieldset>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Physical Address
          </label>
          <input
            type="text"
            name="physicalAddress"
            value={formData.physicalAddress || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md transition"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoDetails;
