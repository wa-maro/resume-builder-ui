import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Spinner from "../../../components/ui/Spinner";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1/admin";

const AcademicDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [academic, setAcademic] = useState<any>();
  const [formData, setFormData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (files && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0], // store the actual File
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleChangev2 = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    // Split the name by dot to handle nested objects
    const keys = name.split(".");
    setFormData((prev: any) => {
      let updated = { ...prev };
      let temp = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        temp[keys[i]] = { ...temp[keys[i]] }; // create shallow copy of nested objects
        temp = temp[keys[i]];
      }
      temp[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const getSchool = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/academic-qualifications/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result: FetchResponse<any> = await res.json();
      setAcademic(result.data);
      setFormData(result.data);
    } catch (error) {
      console.error("❌ Failed to fetch academic qualification", error);
      setAcademic(undefined);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const changedData: Record<string, any> = {};

      // Compare top-level fields
      ["award", "level", "startYear", "endYear"].forEach((key) => {
        if (JSON.stringify(formData[key]) !== JSON.stringify(academic[key])) {
          changedData[key] = formData[key];
        }
      });

      // Compare nested institution fields
      ["name", "location"].forEach((key) => {
        if (formData.institution?.[key] !== academic.institution?.[key]) {
          changedData[`institution.${key}`] = formData.institution?.[key];
        }
      });

      // Compare nested grade fields
      ["classification", "gpa"].forEach((key) => {
        if (formData.grade?.[key] !== academic.grade?.[key]) {
          changedData[`grade.${key}`] = formData.grade?.[key];
        }
      });

      // Files
      if (formData.certificate !== academic.certificate) {
        changedData.certificate = formData.certificate;
      }
      if (formData.transcript !== academic.transcript) {
        changedData.transcript = formData.transcript;
      }

      if (Object.keys(changedData).length === 0) {
        setLoading(false);
        return navigate("/admin/sections/academic-qualifications");
      }

      // Build FormData payload
      const payload = new FormData();

      if (changedData.award) payload.append("award", changedData.award);
      if (changedData.level) payload.append("level", changedData.level);
      if (changedData["institution.name"])
        payload.append("institution[name]", changedData["institution.name"]);
      if (changedData["institution.location"])
        payload.append(
          "institution[location]",
          changedData["institution.location"],
        );
      if (changedData.startYear)
        payload.append("startYear", String(changedData.startYear));
      if (changedData.endYear)
        payload.append("endYear", String(changedData.endYear));
      if (changedData["grade.classification"])
        payload.append(
          "grade[classification]",
          changedData["grade.classification"],
        );
      if (changedData["grade.gpa"])
        payload.append("grade[gpa]", String(changedData["grade.gpa"]));

      if (changedData.certificate && changedData.certificate instanceof File) {
        payload.append("certificate", changedData.certificate);
      }
      if (changedData.transcript && changedData.transcript instanceof File) {
        payload.append("transcript", changedData.transcript);
      }

      // Send PATCH request
      const res = await fetch(`${API_BASE_URL}/academic-qualifications/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: payload,
      });

      const result: FetchResponse<any> = await res.json();
      if (!result.success) return;

      navigate("/admin/sections/academic-qualifications");
    } catch (error) {
      console.error("❌ Failed to update academic qualification", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/academic-qualifications/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result: FetchResponse<any> = await res.json();
      if (!result.success) return;
      navigate("/admin/sections/academic-qualifications");
    } catch (error) {
      console.error("❌ Failed to delete academic qualification", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSchool();
  }, []);

  if (loading) return <Spinner />;
  if (!academic) return <div>Academic qualification not found</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-cyan-800">
        Academic Details
      </h2>

      <form onSubmit={handleUpdate} className="space-y-5">
        {/* Immutable fields */}

        {/* Editable Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Level
          </label>
          <select
            name="level"
            value={formData.level || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          >
            <option value="Diploma">{t("diploma")}</option>
            <option value="Advanced Diploma">{t("advanced_diploma")}</option>
            <option value="Bachelor's">{t("bachelors")}</option>
            <option value="Postgraduate Diploma">
              {t("postgraduate_diploma")}
            </option>
            <option value="Master's">{t("masters")}</option>
            <option value="Doctorate (PhD)">{t("doctorate")}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Institution Name
          </label>
          <input
            type="text"
            name="institution.name"
            value={formData.institution.name || ""}
            onChange={handleChangev2}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Institution Location
          </label>
          <input
            type="text"
            name="institution.location"
            value={formData.institution.location || ""}
            onChange={handleChangev2}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Year
          </label>
          <input
            type="text"
            name="startYear"
            value={formData.startYear.toString() || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Year
          </label>
          <input
            type="text"
            name="endYear"
            value={formData.endYear.toString() || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Award
          </label>
          <input
            type="text"
            name="award"
            value={formData.award || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t("grade_classification")}
          </label>
          <select
            name="grade.classification"
            value={formData.grade?.classification}
            onChange={handleChangev2}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          >
            <option value="Diploma">{t("diploma")}</option>
            <option value="Advanced Diploma">{t("advanced_diploma")}</option>
            <option value="Bachelor's">{t("bachelors")}</option>
            <option value="Postgraduate Diploma">
              {t("postgraduate_diploma")}
            </option>
            <option value="Master's">{t("masters")}</option>
            <option value="Doctorate (PhD)">{t("doctorate")}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t("grade_gpa")}
          </label>
          <input
            type="text"
            name="grade.gpa"
            value={formData.grade?.gpa.toString()}
            onChange={handleChangev2}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div className="flex items-center space-x-16">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Certificate
            </label>
            <input
              type="file"
              name="certificate"
              onChange={handleChange}
              className="mt-1 w-64 border border-gray-300 rounded-md max-w-fit cursor-pointer file:cursor-pointer file:border-0 file:py-1.5 file:px-2.5 file:mr-4 file:bg-gray-800 file:text-white"
            />
            {formData?.certificate && formData.certificate instanceof File && (
              <p className="text-sm text-gray-600 mt-1">
                Selected file: {formData.certificate.name}
              </p>
            )}
            {formData?.certificate &&
              typeof formData.certificate === "string" && (
                <a
                  href={
                    formData.certificate.startsWith("http")
                      ? formData.certificate
                      : `${API_BASE_URL.replace("/api/v1/admin", "")}${
                          formData.certificate
                        }`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm mt-1 block"
                >
                  View certificate
                </a>
              )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Transcript
            </label>
            <input
              type="file"
              name="transcript"
              onChange={handleChange}
              className="mt-1 w-64 border border-gray-300 rounded-md max-w-fit cursor-pointer file:cursor-pointer file:border-0 file:py-1.5 file:px-2.5 file:mr-4 file:bg-gray-800 file:text-white"
            />
            {formData?.transcript && formData.transcript instanceof File && (
              <p className="text-sm text-gray-600 mt-1">
                Selected file: {formData.transcript.name}
              </p>
            )}
            {formData?.transcript &&
              typeof formData.transcript === "string" && (
                <a
                  href={
                    formData.transcript.startsWith("http")
                      ? formData.transcript
                      : `${API_BASE_URL.replace("/api/v1/admin", "")}${
                          formData.transcript
                        }`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm mt-1 block"
                >
                  View transcript
                </a>
              )}
          </div>
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

export default AcademicDetails;
