import QRCode from "qrcode";

/**
 * Generates a UPI QR code as a base64 PNG data URL.
 * Returns null if no UPI ID is provided.
 */
export async function generateUpiQr(upiId, companyName = "") {
  if (!upiId?.trim()) return null;
  const upiString = `upi://pay?pa=${encodeURIComponent(upiId.trim())}&pn=${encodeURIComponent(companyName)}&cu=INR`;
  try {
    return await QRCode.toDataURL(upiString, { width: 220, margin: 1, color: { dark: "#000000", light: "#ffffff" } });
  } catch {
    return null;
  }
}
