import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../../supabaseClient";
import Loading from "../../components/Loading";

export default function Documents() {
  const [loading, setLoading] = useState(true);
  const [docs, setDocs] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("documents")
      .select("*")
      .eq("auth_id", user.id)
      .order("created_at", { ascending: false });

    setDocs(data || []);
    setLoading(false);
  };

  const handleUpload = async () => {
    const file = fileRef.current.files[0];
    if (!file) return;

    setUploading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const filePath = `${user.id}/${Date.now()}-${file.name}`;

    // Upload to Storage
    const { error: storageErr } = await supabase.storage
      .from("documents")
      .upload(filePath, file);

    if (storageErr) {
      console.error(storageErr);
      setUploading(false);
      return;
    }

    // Insert into DB
    await supabase.from("documents").insert({
      auth_id: user.id,
      file_name: filePath,
      file_type: file.type,
    });

    fileRef.current.value = "";
    await loadDocuments();
    setUploading(false);
  };

  const deleteDoc = async (docId, filePath) => {
    // Delete from storage
    await supabase.storage.from("documents").remove([filePath]);

    // Delete DB entry
    await supabase.from("documents").delete().eq("id", docId);

    loadDocuments();
  };

  const getPublicURL = (filePath) => {
    const { data } = supabase.storage.from("documents").getPublicUrl(filePath);
    return data.publicUrl;
  };

  if (loading) return <Loading />;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Documents</h1>

      {/* Upload Section */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <label className="font-medium">Upload Document</label>
        <input
          type="file"
          ref={fileRef}
          className="mt-2"
          accept=".pdf,.docx,.png,.jpg,.jpeg,.txt"
        />

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {docs.length === 0 && (
          <p className="text-gray-600">No documents uploaded yet.</p>
        )}

        {docs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white shadow rounded p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{doc.file_name.split("/").pop()}</p>
              <p className="text-sm text-gray-500">{doc.file_type}</p>
            </div>

            <div className="flex gap-3">
              <a
                href={getPublicURL(doc.file_name)}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                View
              </a>

              <button
                onClick={() => deleteDoc(doc.id, doc.file_name)}
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
