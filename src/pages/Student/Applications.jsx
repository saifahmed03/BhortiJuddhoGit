import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import Loading from "../../components/Loading";

export default function Applications() {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    university: "",
    program: "",
    intake: "",
    status: "Draft",
  });

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("applications")
      .select("*")
      .eq("auth_id", user.id)
      .order("created_at", { ascending: false });

    setApplications(data || []);
    setLoading(false);
  };

  // Open create/edit form
  const openForm = (app = null) => {
    if (app) {
      setEditId(app.id);
      setForm({
        university: app.university,
        program: app.program,
        intake: app.intake,
        status: app.status,
      });
    } else {
      setEditId(null);
      setForm({
        university: "",
        program: "",
        intake: "",
        status: "Draft",
      });
    }
    setFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const payload = {
      auth_id: user.id,
      ...form,
    };

    if (editId) {
      await supabase.from("applications").update(payload).eq("id", editId);
    } else {
      await supabase.from("applications").insert(payload);
    }

    setFormOpen(false);
    loadApplications();
  };

  const deleteApplication = async (id) => {
    await supabase.from("applications").delete().eq("id", id);
    loadApplications();
  };

  if (loading) return <Loading />;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Applications</h1>

      {/* Create Button */}
      <button
        onClick={() => openForm()}
        className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        + New Application
      </button>

      {/* Form */}
      {formOpen && (
        <div className="bg-white shadow p-6 rounded mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editId ? "Edit Application" : "New Application"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="font-medium">University</label>
              <input
                type="text"
                value={form.university}
                onChange={(e) =>
                  setForm({ ...form, university: e.target.value })
                }
                className="w-full mt-2 p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="font-medium">Program</label>
              <input
                type="text"
                value={form.program}
                onChange={(e) =>
                  setForm({ ...form, program: e.target.value })
                }
                className="w-full mt-2 p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="font-medium">Intake</label>
              <input
                type="text"
                placeholder="Fall 2025, Spring 2026..."
                value={form.intake}
                onChange={(e) =>
                  setForm({ ...form, intake: e.target.value })
                }
                className="w-full mt-2 p-2 border rounded"
              />
            </div>

            <div>
              <label className="font-medium">Status</label>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
                className="w-full mt-2 p-2 border rounded"
              >
                <option>Draft</option>
                <option>Submitted</option>
                <option>In Review</option>
                <option>Accepted</option>
                <option>Rejected</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {editId ? "Save Changes" : "Create"}
              </button>

              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Applications List */}
      <div className="space-y-4">
        {applications.length === 0 && (
          <p className="text-gray-600">No applications found.</p>
        )}

        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-white shadow p-4 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{app.university}</p>
              <p className="text-gray-600">{app.program}</p>
              <p className="text-sm text-gray-500">{app.status}</p>
              <p className="text-sm text-gray-400">{app.intake}</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => openForm(app)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>

              <a
                href={`/essays/${app.id}`}
                className="text-green-700 hover:underline"
              >
                Essays
              </a>

              <button
                onClick={() => deleteApplication(app.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
