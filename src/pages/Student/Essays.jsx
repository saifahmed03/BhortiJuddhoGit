import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import Loading from "../../components/Loading";

export default function Essays() {
  const { applicationId } = useParams();

  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState(null);
  const [essays, setEssays] = useState([]);

  const [formOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    loadData();
  }, [applicationId]);

  const loadData = async () => {
    setLoading(true);

    // 1) Load application info
    const { data: appData } = await supabase
      .from("applications")
      .select("*")
      .eq("id", applicationId)
      .single();

    setApplication(appData);

    // 2) Load essays
    const { data: essayData } = await supabase
      .from("essays")
      .select("*")
      .eq("application_id", applicationId)
      .order("created_at", { ascending: false });

    setEssays(essayData || []);
    setLoading(false);
  };

  const openForm = (essay = null) => {
    if (essay) {
      setEditId(essay.id);
      setForm({
        title: essay.title,
        content: essay.content,
      });
    } else {
      setEditId(null);
      setForm({ title: "", content: "" });
    }
    setFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const payload = {
      auth_id: user.id,
      application_id: applicationId,
      title: form.title,
      content: form.content,
    };

    if (editId) {
      await supabase.from("essays").update(payload).eq("id", editId);
    } else {
      await supabase.from("essays").insert(payload);
    }

    setFormOpen(false);
    loadData();
  };

  const deleteEssay = async (id) => {
    await supabase.from("essays").delete().eq("id", id);
    loadData();
  };

  if (loading) return <Loading />;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Application Header */}
      {application && (
        <div className="mb-6">
          <h1 className="text-3xl font-semibold">Essays</h1>
          <p className="text-gray-700 mt-2">
            <span className="font-medium">{application.university}</span> —{" "}
            {application.program} ({application.intake})
          </p>
        </div>
      )}

      {/* Create Button */}
      <button
        onClick={() => openForm()}
        className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        + New Essay
      </button>

      {/* Form */}
      {formOpen && (
        <div className="bg-white shadow p-6 rounded mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editId ? "Edit Essay" : "New Essay"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-medium">Title</label>
              <input
                type="text"
                className="w-full mt-2 p-2 border rounded"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="font-medium">Content</label>
              <textarea
                rows="8"
                className="w-full mt-2 p-2 border rounded"
                value={form.content}
                onChange={(e) =>
                  setForm({ ...form, content: e.target.value })
                }
                required
              />
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

      {/* Essays List */}
      <div className="space-y-4">
        {essays.length === 0 && (
          <p className="text-gray-600">No essays found.</p>
        )}

        {essays.map((essay) => (
          <div
            key={essay.id}
            className="bg-white shadow p-4 rounded"
          >
            <h3 className="font-semibold text-lg">{essay.title}</h3>

            <p className="text-gray-700 mt-2 whitespace-pre-wrap">
              {essay.content}
            </p>

            <div className="mt-4 flex gap-4">
              <button
                onClick={() => openForm(essay)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>

              <button
                onClick={() => deleteEssay(essay.id)}
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
