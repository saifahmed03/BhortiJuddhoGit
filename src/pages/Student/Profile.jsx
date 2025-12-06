import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import Loading from "../../components/Loading";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("students")
        .select("*")
        .eq("auth_id", user.id)
        .single();

      setStudent(data);
      setLoading(false);
    };

    fetchProfile();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Your Profile</h1>

      <div className="bg-white shadow rounded-lg p-6 space-y-4">

        <div>
          <label className="font-medium">Full Name</label>
          <input
            type="text"
            className="w-full border rounded p-2 mt-1"
            defaultValue={student?.full_name}
            disabled
          />
        </div>

        <div>
          <label className="font-medium">Email</label>
          <input
            type="text"
            className="w-full border rounded p-2 mt-1"
            defaultValue={student?.email}
            disabled
          />
        </div>

        <div>
          <label className="font-medium">Phone</label>
          <input
            type="text"
            className="w-full border rounded p-2 mt-1"
            defaultValue={student?.phone || ""}
            disabled
          />
        </div>

        <div>
          <label className="font-medium">Country</label>
          <input
            type="text"
            className="w-full border rounded p-2 mt-1"
            defaultValue={student?.country || ""}
            disabled
          />
        </div>

      </div>
    </div>
  );
}
