import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/ui/Spinner";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1/admin";

const SchoolDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [school, setSchool] = useState<any>();
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
      const res = await fetch(`${API_BASE_URL}/school-qualifications/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result: FetchResponse<any> = await res.json();
      setSchool(result.data);
      setFormData(result.data);
    } catch (error) {
      console.error("❌ Failed to fetch school qualification", error);
      setSchool(undefined);
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
        if (JSON.stringify(formData[key]) !== JSON.stringify(school[key])) {
          changedData[key] = formData[key];
        }
      });

      // Compare nested school fields
      if (formData.school?.name !== school.school?.name) {
        changedData["school.name"] = formData.school?.name;
      }
      if (formData.school?.location !== school.school?.location) {
        changedData["school.location"] = formData.school?.location;
      }

      if (formData.grade?.division !== school.grade?.division) {
        changedData["grade.division"] = formData.grade?.division;
      }
      if (formData.grade?.points !== school.grade?.points) {
        changedData["grade.points"] = formData.grade?.points;
      }

      if (formData.certificate !== school.certificate) {
        changedData.certificate = formData.certificate;
      }

      if (Object.keys(changedData).length === 0) {
        setLoading(false);
        return navigate("/admin/sections/school-qualifications");
      }

      const payload = new FormData();

      if (changedData.award) payload.append("award", changedData.award);
      if (changedData.level) payload.append("level", changedData.level);

      if (changedData["school.name"])
        payload.append("school[name]", changedData["school.name"]);
      if (changedData["school.location"])
        payload.append("school[location]", changedData["school.location"]);

      if (changedData.startYear)
        payload.append("startYear", String(changedData.startYear));
      if (changedData.endYear)
        payload.append("endYear", String(changedData.endYear));

      if (changedData["grade.division"])
        payload.append("grade[division]", changedData["grade.division"]);
      if (changedData["grade.points"])
        payload.append("grade[points]", String(changedData["grade.points"]));

      if (changedData.certificate && changedData.certificate instanceof File) {
        payload.append("certificate", changedData.certificate);
      }

      // Send PATCH request
      const res = await fetch(`${API_BASE_URL}/school-qualifications/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });

      const result: FetchResponse<any> = await res.json();
      if (!result.success) return;

      navigate("/admin/sections/school-qualifications");
    } catch (error) {
      console.error("❌ Failed to update qualification", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/school-qualifications/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result: FetchResponse<any> = await res.json();
      if (!result.success) return;
      navigate("/admin/sections/school-qualifications");
    } catch (error) {
      console.error("❌ Failed to delete school qualification", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSchool();
  }, []);

  if (loading) return <Spinner />;
  if (!school) return <div>School qualification not found</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-cyan-800">
        School Details
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
            <option value="Primary">{t("primary")}</option>
            <option value="O-Level">{t("o_level")}</option>
            <option value="A-Level">{t("a_level")}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            School Name
          </label>
          <input
            type="text"
            name="school.name"
            value={formData.school.name || ""}
            onChange={handleChangev2}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            School Location
          </label>
          <input
            type="text"
            name="school.location"
            value={formData.school.location || ""}
            onChange={handleChangev2}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Award
          </label>
          <select
            name="award"
            value={formData.award || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          >
            <option value="Primary School Leaving Examination (PSLE)">
              {t("primary_school_leaving_examination")}
            </option>
            <option value="The Certificate of Secondary Education Examination (CSEE)">
              {t("certificate_of_secondary_education")}
            </option>
            <option value="Advanced Certificate of Secondary Education Examination (ACSEE)">
              {t("advanced_certificate_of_secondary_education")}
            </option>
          </select>
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
            {t("grade_division")}
          </label>
          <input
            type="text"
            name="grade.division"
            value={formData.grade?.division || ""}
            onChange={handleChangev2}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t("grade_points")}
          </label>
          <input
            type="text"
            name="grade.points"
            value={formData.grade?.points || ""}
            onChange={handleChangev2}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

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

export default SchoolDetails;
