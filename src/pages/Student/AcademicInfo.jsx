import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import Loading from "../../components/Loading";

export default function AcademicInfo() {
  const [loading, setLoading] = useState(true);
  const [academic, setAcademic] = useState(null);

  useEffect(() => {
    const fetchAcademicInfo = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("academic_info")
        .select("*")
        .eq("auth_id", user.id)
        .single();

      setAcademic(data);
      setLoading(false);
    };

    fetchAcademicInfo();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Academic Information</h1>

      <div className="bg-white shadow rounded-lg p-6 space-y-4">

        <div>
          <label className="font-medium">High School / College</label>
          <input
            type="text"
            className="w-full border rounded p-2 mt-1"
            defaultValue={academic?.institute_name || ""}
            disabled
          />
        </div>

        <div>
          <label className="font-medium">GPA / CGPA</label>
          <input
            type="text"
            className="w-full border rounded p-2 mt-1"
            defaultValue={academic?.gpa || ""}
            disabled
          />
        </div>

        <div>
          <label className="font-medium">Major / Concentration</label>
          <input
            type="text"
            className="w-full border rounded p-2 mt-1"
            defaultValue={academic?.major || ""}
            disabled
          />
        </div>

        <div>
          <label className="font-medium">Passing Year</label>
          <input
            type="text"
            className="w-full border rounded p-2 mt-1"
            defaultValue={academic?.passing_year || ""}
            disabled
          />
        </div>

        <div>
          <label className="font-medium">Test Scores (IELTS / SAT / etc.)</label>
          <textarea
            className="w-full border rounded p-2 mt-1"
            rows="3"
            defaultValue={academic?.test_scores || ""}
            disabled
          />
        </div>

      </div>
    </div>
  );
}

