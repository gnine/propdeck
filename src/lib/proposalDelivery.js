export async function exportProposalPdf() {
  throw new Error("PDF export adapter is not wired yet. The UI contract is ready for html2canvas + jsPDF.");
}

export async function sendProposalEmail({ settings }) {
  if (settings.email.mode === "gmail_oauth") {
    throw new Error("Gmail OAuth adapter is pending Google Cloud credentials.");
  }
  if (settings.email.mode === "smtp") {
    throw new Error("SMTP sending needs a secure backend or local relay. Browser-only SMTP is intentionally blocked.");
  }
}
