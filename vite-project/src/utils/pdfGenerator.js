import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (name, scores) => {
  const reportElement = document.getElementById('report-section');
  const canvas = await html2canvas(reportElement, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgWidth = 190;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
  pdf.save(`${name}_Political_Readiness_Report.pdf`);
};