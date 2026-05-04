import { Award } from 'lucide-react'
import jsPDF from 'jspdf'

function Certificate({ userName, course, userEmail, isCompleted }) {
  const generateCertificate = () => {
    if (!userName || userName === 'Learner') {
      alert('Please log in to download certificate')
      return
    }
    if (!isCompleted) {
      alert('Please complete the course first')
      return
    }

    const completionDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const safeUserName = userName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    const safeCourseName = course?.title?.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    const pdfFilename = `certificate-${safeUserName}-${safeCourseName}.pdf`;

    const doc = new jsPDF('portrait', 'pt', 'a4');
    const { width, height } = doc.internal.pageSize;
    const margin = 72;
    const contentWidth = width - 2 * margin;
    const center = width / 2;
    const contentHeight = height - 2 * margin;
    const contentTop = margin;
    const contentLeft = margin;
    const contentRight = width - margin;

    // 1. Gold double border around page content
    doc.setDrawColor(53, 162, 240); // #35a2f0
    doc.setLineWidth(8);
    doc.rect(contentLeft, contentTop, contentWidth, contentHeight, 'S');
    doc.setLineWidth(4);
    doc.rect(contentLeft + 6, contentTop + 6, contentWidth - 12, contentHeight - 12, 'S');

    let y = contentTop + 80;

    // 2. Title "CERTIFICATE" (30px bold, centered)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(30);
    doc.setTextColor(0, 0, 0); // Black
    doc.text('CERTIFICATE', center, y, { align: 'center' });
    y += 50;

    // 3. "OF COMPLETION" (30px bold, centered)
    doc.text('OF COMPLETION', center, y, { align: 'center' });
    y += 40;

    // 4. Horizontal underline line (gold, centered)
    doc.setLineWidth(3);
    doc.setDrawColor(53, 162, 240);
    const lineLength = contentWidth * 0.6;
    const lineX = center - lineLength / 2;
    doc.line(lineX, y, lineX + lineLength, y);
    doc.setLineWidth(1);
    y += 50;

    // 5. Student username (22px bold, centered, wrapped)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(0, 0, 0);
    const userLines = doc.splitTextToSize(userName.toUpperCase(), contentWidth - 40);
    doc.text(userLines, center, y, { align: 'center' });
    y += (userLines.length * 28) + 40;

    // 6. "has successfully completed" (14px normal, centered)
    doc.setFont('helvetica');
    doc.setFontSize(14);
    doc.text('has successfully completed', center, y, { align: 'center' });
    y += 40;

    // 7. Course title inside rounded box (18px bold, auto width)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    const courseText = course?.title?.toUpperCase() || '';
    const courseLines = doc.splitTextToSize(courseText, contentWidth * 0.8);
    const lineHeight = 22;
    const courseBoxHeight = (courseLines.length * lineHeight) + 40;
    const courseBoxWidth = Math.min(contentWidth * 0.7, 450);
    const courseBoxX = center - courseBoxWidth / 2;
    const courseBoxY = y + 10;

    // Yellow rounded box
    doc.setDrawColor(53, 162, 240); // #35a2f0
    doc.setFillColor(255, 255, 255); // White fill
    doc.setLineWidth(3);
    doc.roundedRect(courseBoxX, courseBoxY, courseBoxWidth, courseBoxHeight, 12, 12, 'FD');

    // Course text
    doc.setTextColor(0, 0, 0);
    doc.text(courseLines, center, courseBoxY + 28, { align: 'center' });
    y = courseBoxY + courseBoxHeight + 40;

    // 8. Description paragraph (11px normal, wrapped, centered)
    doc.setFont('helvetica');
    doc.setFontSize(11);
    const description = `${userName} has demonstrated proficiency in all course objectives and is qualified to apply the acquired knowledge and skills professionally.`;
    const descLines = doc.splitTextToSize(description, contentWidth - 60);
    doc.text(descLines, center, y, { align: 'center' });
    y += (descLines.length * 16) + 50;

    // 9. Issue date at bottom center (14px bold)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(`Issued on: ${completionDate}`, center, y + 20, { align: 'center' });

    doc.save(pdfFilename);
  }

  return (
    <button
      onClick={generateCertificate}
      disabled={!userEmail || !isCompleted}
      className={'mt-3 flex w-full items-center justify-center gap-2 rounded-xl border py-3.5 text-sm font-semibold transition-colors ' + 
        (userEmail && isCompleted
          ? 'border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20'
          : 'border-gray-600 bg-gray-700 text-gray-500 cursor-not-allowed')
      }
    >
      <Award className="h-4 w-4" />
      Download Certificate
    </button>
  )
}

export default Certificate
