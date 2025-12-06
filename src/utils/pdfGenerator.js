import jsPDF from "jspdf";

export const generatePDF = (content, filename = "document.pdf") => {
  const doc = new jsPDF();
  doc.text(content, 10, 10);
  doc.save(filename);
};
