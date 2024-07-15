import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';

const ApprovalPdf = ({contentRef}) => {
  const handleGeneratePdf = async  () => {
    const input = contentRef.current;
    if (input) {
      try {
        const canvas = await html2canvas(input, { scale: 2, useCORS: true });  // 스케일을 2로 설정하여 해상도 개선
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth() - 20; // 양 옆 여백을 위해 20mm 줄임
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth, pdfHeight);

        // PDF 다운로드
        pdf.save('download.pdf');
      } catch (error) {
        console.error('Error generating PDF', error);
      }
    } else {
      console.error('Element not found');
    }
  };
  return (
    <div>
      <button onClick={handleGeneratePdf}>pdf로 저장?</button>
    </div>
  );
};

export default ApprovalPdf;