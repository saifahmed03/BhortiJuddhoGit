// src/services/fileService.js
import { supabase } from '../supabaseClient';

export const uploadDocument = async (userId, file) => {
  const fileName = `${userId}/${Date.now()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from('student-documents')
    .upload(fileName, file);

  if (uploadError) return { error: uploadError };

  // save reference in DB
  return supabase.from('documents').insert({
    student_id: userId,
    file_url: fileName,
    type: file.type,
  });
};

export const downloadDocument = (fileName) => {
  return supabase.storage.from('student-documents').getPublicUrl(fileName);
};
