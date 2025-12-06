// src/pages/Admin/AdminPanel.jsx
import React, { useEffect, useState } from "react";
import {
  getAllStudents, deleteStudent,
  getAllUniversities, addUniversity, updateUniversity, deleteUniversity,
  getAllPrograms, addProgram, updateProgram, deleteProgram,
  getAllApplications, updateApplicationStatus
} from "../../services/adminService";
import Loading from "../../components/Loading";

export default function AdminPanel() {
  const [loading, setLoading] = useState(true);

  const [students, setStudents] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [applications, setApplications] = useState([]);

  const [editItem, setEditItem] = useState(null);
  const [editType, setEditType] = useState(""); // "student" | "university" | "program"

  const [form, setForm] = useState({});

  // -------------------------------
  // Load all data
  // -------------------------------
  const loadData = async () => {
    setLoading(true);

    const { data: studentsData } = await getAllStudents();
    const { data: universitiesData } = await getAllUniversities();
    const { data: programsData } = await getAllPrograms();
    const { data: applicationsData } = await getAllApplications();

    setStudents(studentsData || []);
    setUniversities(universitiesData || []);
    setPrograms(programsData || []);
    setApplications(applicationsData || []);

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // -------------------------------
  // CRUD Handlers
  // -------------------------------
  const handleDelete = async (type, id) => {
    if (!window.confirm("Are you sure?")) return;

    switch (type) {
      case "student": await deleteStudent(id); break;
      case "university": await deleteUniversity(id); break;
      case "program": await deleteProgram(id); break;
      default: return;
    }
    loadData();
  };

  const handleEdit = (type, item) => {
    setEditType(type);
    setEditItem(item);
    setForm({ ...item });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    switch (editType) {
      case "university": await updateUniversity(editItem.id, form); break;
      case "program": await updateProgram(editItem.id, form); break;
      default: break;
    }

    setEditItem(null);
    setEditType("");
    setForm({});
    loadData();
  };

  const handleApplicationStatusChange = async (id, status) => {
    await updateApplicationStatus(id, status);
    loadData();
  };

  if (loading) return <Loading />;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold mb-6 text-[#FF4FD2]">Admin Dashboard</h1>

      {/* -------------------------
          Analytics Cards
      -------------------------- */}
      <div className="grid grid-cols-4 gap-4">
        <div className="card p-4">
          <h2 className="font-semibold text-[#4F9CFF]">Students</h2>
          <p className="text-2xl font-bold">{students.length}</p>
        </div>
        <div className="card p-4">
          <h2 className="font-semibold text-[#4F9CFF]">Universities</h2>
          <p className="text-2xl font-bold">{universities.length}</p>
        </div>
        <div className="card p-4">
          <h2 className="font-semibold text-[#4F9CFF]">Programs</h2>
          <p className="text-2xl font-bold">{programs.length}</p>
        </div>
        <div className="card p-4">
          <h2 className="font-semibold text-[#4F9CFF]">Applications</h2>
          <p className="text-2xl font-bold">{applications.length}</p>
        </div>
      </div>

      {/* -------------------------
          Students Table
      -------------------------- */}
      <div className="card p-4">
        <h2 className="text-xl font-semibold mb-4 text-[#FF4FD2]">Students</h2>
        <table className="admin-table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id}>
                <td>{s.full_name}</td>
                <td>{s.email}</td>
                <td>{s.country}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleDelete("student", s.id)}
                    className="text-red-500 hover:text-red-600 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* -------------------------
          Universities Table
      -------------------------- */}
      <div className="card p-4">
        <h2 className="text-xl font-semibold mb-4 text-[#FF4FD2]">Universities</h2>
        <table className="admin-table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {universities.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.country}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleEdit("university", u)}
                    className="text-blue-500 hover:text-blue-600 font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete("university", u.id)}
                    className="text-red-500 hover:text-red-600 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* -------------------------
          Programs Table
      -------------------------- */}
      <div className="card p-4">
        <h2 className="text-xl font-semibold mb-4 text-[#FF4FD2]">Programs</h2>
        <table className="admin-table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>University ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {programs.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.university_id}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleEdit("program", p)}
                    className="text-blue-500 hover:text-blue-600 font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete("program", p.id)}
                    className="text-red-500 hover:text-red-600 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* -------------------------
          Applications Table
      -------------------------- */}
      <div className="card p-4">
        <h2 className="text-xl font-semibold mb-4 text-[#FF4FD2]">Applications</h2>
        <table className="admin-table w-full">
          <thead>
            <tr>
              <th>Student</th>
              <th>University</th>
              <th>Program</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app.id}>
                <td>{app.essays?.[0]?.auth_id || "N/A"}</td>
                <td>{app.university}</td>
                <td>{app.program}</td>
                <td>
                  <select
                    value={app.status}
                    onChange={(e) => handleApplicationStatusChange(app.id, e.target.value)}
                    className="border p-1 rounded focus:outline-none focus:ring-2 focus:ring-[#FF4FD2]"
                  >
                    <option>Draft</option>
                    <option>Submitted</option>
                    <option>In Review</option>
                    <option>Accepted</option>
                    <option>Rejected</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete("application", app.id)}
                    className="text-red-500 hover:text-red-600 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* -------------------------
          Edit Form Modal
      -------------------------- */}
      {editItem && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-[#20202A] p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4 text-[#FF4FD2]">Edit {editType}</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              {Object.keys(form).map((key) => (
                <div className="input-floating" key={key}>
                  <input
                    type="text"
                    value={form[key]}
                    placeholder=" "
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  />
                  <label>{key}</label>
                </div>
              ))}

              <div className="flex gap-3 justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4F9CFF] rounded hover:bg-[#3e86e6] text-white font-semibold"
                >
                  Save
                </button>
                <button
                  onClick={() => { setEditItem(null); setEditType(""); }}
                  type="button"
                  className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 text-white font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

