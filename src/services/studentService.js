import { supabase } from "../supabaseClient";

// ---------------------------
// PROFILE
// ---------------------------
export async function getProfile(userId) {
  return await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
}

export async function updateProfile(userId, data) {
  return await supabase
    .from("profiles")
    .update(data)
    .eq("id", userId);
}

// ---------------------------
// ACADEMIC RECORDS (CRUD)
// ---------------------------
export async function getAcademicRecords(userId) {
  return await supabase
    .from("academic_records")
    .select("*")
    .eq("student_id", userId);
}

export async function addAcademicRecord(data) {
  return await supabase.from("academic_records").insert(data);
}

export async function updateAcademicRecord(id, data) {
  return await supabase
    .from("academic_records")
    .update(data)
    .eq("id", id);
}

export async function deleteAcademicRecord(id) {
  return await supabase
    .from("academic_records")
    .delete()
    .eq("id", id);
}

// ---------------------------
// DOCUMENTS (Upload / Get / Delete)
// ---------------------------
export async function uploadDocument(userId, file) {
  const fileName = `${userId}/${Date.now()}-${file.name}`;

  // Upload to storage bucket
  const { error: uploadError } = await supabase.storage
    .from("documents")
    .upload(fileName, file);

  if (uploadError) return { error: uploadError };

  // Save reference in DB
  return await supabase.from("documents").insert({
    student_id: userId,
    file_name: fileName,
    file_type: file.type,
  });
}

export async function getDocuments(userId) {
  return await supabase
    .from("documents")
    .select("*")
    .eq("student_id", userId);
}

export async function deleteDocument(id) {
  return await supabase
    .from("documents")
    .delete()
    .eq("id", id);
}

// ---------------------------
// APPLICATIONS (CRUD)
// ---------------------------
export async function getApplications(userId) {
  return await supabase
    .from("applications")
    .select("*, essays(*)")
    .eq("student_id", userId);
}

export async function createApplication(data) {
  return await supabase.from("applications").insert(data);
}

export async function updateApplication(id, data) {
  return await supabase
    .from("applications")
    .update(data)
    .eq("id", id);
}

export async function deleteApplication(id) {
  return await supabase
    .from("applications")
    .delete()
    .eq("id", id);
}

// ---------------------------
// ESSAYS (CRUD)
// ---------------------------
export async function getEssays(applicationId) {
  return await supabase
    .from("essays")
    .select("*")
    .eq("application_id", applicationId);
}

export async function addEssay(data) {
  return await supabase.from("essays").insert(data);
}

export async function updateEssay(id, data) {
  return await supabase
    .from("essays")
    .update(data)
    .eq("id", id);
}

export async function deleteEssay(id) {
  return await supabase
    .from("essays")
    .delete()
    .eq("id", id);
}
