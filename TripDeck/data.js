// Mock Data for TripDeck — Proposal Studio

const PRODUCTS = [
  {
    id: 1, name: "Leads", category: "leads",
    description: "Verified travel leads delivered directly to your CRM",
    plans: [
      { id: 101, name: "Starter", description: "50 leads/month", mrp: 2999, billing: "monthly", features: ["50 verified leads/mo", "Email + WhatsApp delivery", "Lead quality score", "Basic CRM integration", "7-day support"] },
      { id: 102, name: "Growth", description: "150 leads/month", mrp: 6999, billing: "monthly", features: ["150 verified leads/mo", "Priority delivery", "Lead quality score", "Full CRM integration", "Dedicated support", "Monthly performance report"] },
      { id: 103, name: "Pro", description: "Unlimited leads", mrp: 14999, billing: "monthly", features: ["Unlimited leads/mo", "Real-time delivery", "Advanced filtering", "API access", "Dedicated account manager", "Weekly strategy calls"] }
    ]
  },
  {
    id: 2, name: "CRM", category: "crm",
    description: "Complete CRM built for travel agents — bookings, follow-ups, pipeline",
    plans: [
      { id: 201, name: "Basic", description: "1 user", mrp: 999, billing: "monthly", features: ["1 user seat", "Booking management", "Customer profiles", "Follow-up reminders", "Basic reports", "Email support"] },
      { id: 202, name: "Pro", description: "5 users", mrp: 2999, billing: "monthly", features: ["5 user seats", "Full pipeline management", "Automated follow-ups", "WhatsApp integration", "Advanced analytics", "Priority support"] },
      { id: 203, name: "Enterprise", description: "Unlimited users", mrp: 7999, billing: "monthly", features: ["Unlimited users", "Custom workflows", "API & webhooks", "White-label option", "Dedicated server", "24/7 phone support"] }
    ]
  },
  {
    id: 3, name: "Website", category: "website",
    description: "Ready-made travel agency website with booking integration",
    plans: [
      { id: 301, name: "Standard", description: "1 page", mrp: 4999, billing: "one-time", hosting: 499, features: ["1-page website", "Mobile responsive", "Booking inquiry form", "WhatsApp chat widget", "SSL certificate", "Free domain 1st year"] },
      { id: 302, name: "Business", description: "5 pages + blog", mrp: 12999, billing: "one-time", hosting: 999, features: ["5-page website + blog", "Tour package pages", "Online booking engine", "Payment gateway", "SEO optimization", "Social media links"] },
      { id: 303, name: "Premium", description: "Full custom", mrp: 29999, billing: "one-time", hosting: 1999, features: ["Fully custom design", "Unlimited pages", "Booking + payment system", "Customer portal", "Admin dashboard", "Priority development"] }
    ]
  },
  {
    id: 4, name: "Banner Ads", category: "ads",
    description: "Banner placements on Tripclap.com travel marketplace",
    plans: [
      { id: 401, name: "Basic", description: "1 placement", mrp: 1999, billing: "monthly", features: ["1 banner placement", "Category pages only", "Standard ad size", "Monthly impressions report", "Ad creative support"] },
      { id: 402, name: "Standard", description: "3 placements", mrp: 4499, billing: "monthly", features: ["3 banner placements", "Category + listing pages", "Multiple ad sizes", "Click tracking", "Bi-weekly reports", "Priority placement"] },
      { id: 403, name: "Premium", description: "Homepage feature", mrp: 9999, billing: "monthly", features: ["Homepage featured slot", "All page placements", "Video banner support", "Real-time analytics", "Dedicated ad manager", "A/B testing"] }
    ]
  }
];

const CLIENTS = [
  { id: 1, agency: "Skyline Travel & Tours", contact: "Rajesh Mehta", email: "rajesh@skylinetravel.com", phone: "98765 43210", city: "Mumbai", state: "Maharashtra", gst: "27AABCT1234A1Z5", proposals: 4, lastStatus: "Accepted" },
  { id: 2, agency: "Wanderlust Holidays", contact: "Priya Sharma", email: "priya@wanderlust.in", phone: "91234 56789", city: "Delhi", state: "Delhi", gst: "07AABCW5678B1Z3", proposals: 2, lastStatus: "Sent" },
  { id: 3, agency: "Royal Journeys Pvt Ltd", contact: "Amit Patel", email: "amit@royaljourneys.com", phone: "90000 12345", city: "Ahmedabad", state: "Gujarat", gst: "24AABCR9012C1Z1", proposals: 7, lastStatus: "Accepted" },
  { id: 4, agency: "Heritage Tours", contact: "Sunita Reddy", email: "sunita@heritagetours.in", phone: "87654 32109", city: "Hyderabad", state: "Telangana", gst: "36AABCH3456D1Z9", proposals: 1, lastStatus: "Draft" },
  { id: 5, agency: "Blue Horizon Travels", contact: "Kiran Kumar", email: "kiran@bluehorizon.com", phone: "93456 78901", city: "Bangalore", state: "Karnataka", gst: "29AABCB7890E1Z7", proposals: 3, lastStatus: "Expired" },
  { id: 6, agency: "Pearl Travels", contact: "Meena Nair", email: "meena@pearltravels.in", phone: "94567 89012", city: "Chennai", state: "Tamil Nadu", gst: "33AABCP2345F1Z5", proposals: 5, lastStatus: "Accepted" },
];

const PROPOSALS = [
  { id: "TC-2025-0012", clientId: 1, client: "Skyline Travel & Tours", contact: "Rajesh Mehta", products: ["Leads (Growth)", "CRM (Pro)"], amount: 118530, status: "Accepted", date: "12 Apr 2025", rep: "Aditya Bose" },
  { id: "TC-2025-0011", clientId: 2, client: "Wanderlust Holidays", contact: "Priya Sharma", products: ["Website (Business)"], amount: 16757, status: "Sent", date: "10 Apr 2025", rep: "Aditya Bose" },
  { id: "TC-2025-0010", clientId: 3, client: "Royal Journeys Pvt Ltd", contact: "Amit Patel", products: ["Leads (Pro)", "CRM (Enterprise)", "Banner Ads (Standard)"], amount: 298474, status: "Accepted", date: "05 Apr 2025", rep: "Sneha Kulkarni" },
  { id: "TC-2025-0009", clientId: 4, client: "Heritage Tours", contact: "Sunita Reddy", products: ["CRM (Basic)"], amount: 14155, status: "Draft", date: "01 Apr 2025", rep: "Aditya Bose" },
  { id: "TC-2025-0008", clientId: 5, client: "Blue Horizon Travels", contact: "Kiran Kumar", products: ["Leads (Starter)", "Banner Ads (Basic)"], amount: 57728, status: "Expired", date: "20 Mar 2025", rep: "Sneha Kulkarni" },
  { id: "TC-2025-0007", clientId: 6, client: "Pearl Travels", contact: "Meena Nair", products: ["Leads (Growth)", "CRM (Pro)", "Website (Standard)"], amount: 147200, status: "Revised", date: "15 Mar 2025", rep: "Aditya Bose" },
];

const SETTINGS = {
  company: { name: "Tripclap (ThinkNext Technologies Pvt Ltd)", gst: "29AABCT9876A1Z2", address: "4th Floor, Tower B, Cyber City, Gurugram, Haryana 122002", signatory: "Vikram Tiwari", designation: "Head of Sales", website: "agents.tripclap.com" },
  payment: { bank: "HDFC Bank", account: "50100234567890", ifsc: "HDFC0001234", holder: "ThinkNext Technologies Pvt Ltd", type: "Current", upi: "tripclap@hdfcbank" },
  email: { host: "smtp.gmail.com", port: "587", user: "proposals@tripclap.com", fromName: "Tripclap Sales", fromEmail: "proposals@tripclap.com", subject: "Tripclap Proposal {{id}} for {{agency}}", validity: 7 },
  defaults: { gst: 18, validity: 7, kyc: ["GST Registration Certificate", "PAN Card of Business / Proprietor", "Business Registration Certificate", "Cancelled Cheque / Bank Statement", "Aadhaar of Authorized Signatory"], tnc: "1. This proposal is valid for the number of days mentioned above from the date of issue.\n2. Prices are subject to change after the validity period.\n3. Services will be activated within 48 hours of KYC completion and payment confirmation.\n4. No refund will be issued after account activation.\n5. For support, contact support@tripclap.com" }
};

const CURRENT_REP = { name: "Aditya Bose", email: "aditya@tripclap.com", phone: "98100 55678" };

function formatINR(amount) {
  if (!amount && amount !== 0) return "₹0";
  return "₹" + amount.toLocaleString("en-IN");
}

function getStatusStyle(status) {
  const map = {
    Draft: { bg: "#F3F4F6", color: "#6B7280" },
    Sent: { bg: "#EFF6FF", color: "#2563EB" },
    Accepted: { bg: "#E1F5EE", color: "#0F6E56" },
    Expired: { bg: "#FEF2F2", color: "#DC2626" },
    Revised: { bg: "#FFFBEB", color: "#D97706" },
  };
  return map[status] || map.Draft;
}

Object.assign(window, { PRODUCTS, CLIENTS, PROPOSALS, SETTINGS, CURRENT_REP, formatINR, getStatusStyle });
