import ResumeLayout from "../layouts/ResumeLayout";

function ResumeBuilder() {
  return (
    <ResumeLayout>
      <h2 className="text-2xl font-bold mb-4">Resume Section</h2>
      <p className="text-gray-600">
        Select a section from the sidebar to begin editing your resume.
      </p>
    </ResumeLayout>
  );
}

export default ResumeBuilder;
