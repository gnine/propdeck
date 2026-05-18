export const seedProducts = [
  {
    id: "prod_leads",
    name: "Leads",
    category: "leads",
    color: "#f59e0b",
    description: "Verified travel leads delivered directly to your CRM",
    plans: [
      {
        id: "plan_leads_starter",
        name: "Starter",
        description: "50 leads/month",
        mrp: 2999,
        billing: "monthly",
        features: ["50 verified leads/mo", "Email + WhatsApp delivery", "Lead quality score", "Basic CRM integration", "7-day support"],
      },
      {
        id: "plan_leads_growth",
        name: "Growth",
        description: "150 leads/month",
        mrp: 6999,
        billing: "monthly",
        features: ["150 verified leads/mo", "Priority delivery", "Lead quality score", "Full CRM integration", "Dedicated support", "Monthly performance report"],
      },
      {
        id: "plan_leads_pro",
        name: "Pro",
        description: "Unlimited leads",
        mrp: 14999,
        billing: "monthly",
        features: ["Unlimited leads/mo", "Real-time delivery", "Advanced filtering", "API access", "Dedicated account manager", "Weekly strategy calls"],
      },
    ],
  },
  {
    id: "prod_crm",
    name: "CRM",
    category: "crm",
    color: "#3b82f6",
    description: "Complete CRM built for travel agents - bookings, follow-ups, pipeline",
    plans: [
      { id: "plan_crm_basic", name: "Basic", description: "1 user", mrp: 999, billing: "monthly", features: ["1 user seat", "Booking management", "Customer profiles", "Follow-up reminders", "Basic reports", "Email support"] },
      { id: "plan_crm_pro", name: "Pro", description: "5 users", mrp: 2999, billing: "monthly", features: ["5 user seats", "Full pipeline management", "Automated follow-ups", "WhatsApp integration", "Advanced analytics", "Priority support"] },
      { id: "plan_crm_enterprise", name: "Enterprise", description: "Unlimited users", mrp: 7999, billing: "monthly", features: ["Unlimited users", "Custom workflows", "API & webhooks", "White-label option", "Dedicated server", "24/7 phone support"] },
    ],
  },
  {
    id: "prod_website",
    name: "Website",
    category: "website",
    color: "#8b5cf6",
    description: "Ready-made travel agency website with booking integration",
    plans: [
      { id: "plan_website_standard", name: "Standard", description: "1 page", mrp: 4999, billing: "one-time", hosting: 499, features: ["1-page website", "Mobile responsive", "Booking inquiry form", "WhatsApp chat widget", "SSL certificate", "Free domain 1st year"] },
      { id: "plan_website_business", name: "Business", description: "5 pages + blog", mrp: 12999, billing: "one-time", hosting: 999, features: ["5-page website + blog", "Tour package pages", "Online booking engine", "Payment gateway", "SEO optimization", "Social media links"] },
      { id: "plan_website_premium", name: "Premium", description: "Full custom", mrp: 29999, billing: "one-time", hosting: 1999, features: ["Fully custom design", "Unlimited pages", "Booking + payment system", "Customer portal", "Admin dashboard", "Priority development"] },
    ],
  },
  {
    id: "prod_ads",
    name: "Banner Ads",
    category: "ads",
    color: "#ef4444",
    description: "Banner placements on Tripclap.com travel marketplace",
    plans: [
      { id: "plan_ads_basic", name: "Basic", description: "1 placement", mrp: 1999, billing: "monthly", features: ["1 banner placement", "Category pages only", "Standard ad size", "Monthly impressions report", "Ad creative support"] },
      { id: "plan_ads_standard", name: "Standard", description: "3 placements", mrp: 4499, billing: "monthly", features: ["3 banner placements", "Category + listing pages", "Multiple ad sizes", "Click tracking", "Bi-weekly reports", "Priority placement"] },
      { id: "plan_ads_premium", name: "Premium", description: "Homepage feature", mrp: 9999, billing: "monthly", features: ["Homepage featured slot", "All page placements", "Video banner support", "Real-time analytics", "Dedicated ad manager", "A/B testing"] },
    ],
  },
];

export const seedClients = [
  { id: "client_skyline", agency: "Skyline Travel & Tours", contact: "Rajesh Mehta", email: "rajesh@skylinetravel.com", phone: "98765 43210", city: "Mumbai", state: "Maharashtra", gst: "27AABCT1234A1Z5", notes: "" },
  { id: "client_wanderlust", agency: "Wanderlust Holidays", contact: "Priya Sharma", email: "priya@wanderlust.in", phone: "91234 56789", city: "Delhi", state: "Delhi", gst: "07AABCW5678B1Z3", notes: "" },
  { id: "client_royal", agency: "Royal Journeys Pvt Ltd", contact: "Amit Patel", email: "amit@royaljourneys.com", phone: "90000 12345", city: "Ahmedabad", state: "Gujarat", gst: "24AABCR9012C1Z1", notes: "" },
  { id: "client_heritage", agency: "Heritage Tours", contact: "Sunita Reddy", email: "sunita@heritagetours.in", phone: "87654 32109", city: "Hyderabad", state: "Telangana", gst: "36AABCH3456D1Z9", notes: "" },
  { id: "client_blue", agency: "Blue Horizon Travels", contact: "Kiran Kumar", email: "kiran@bluehorizon.com", phone: "93456 78901", city: "Bangalore", state: "Karnataka", gst: "29AABCB7890E1Z7", notes: "" },
  { id: "client_pearl", agency: "Pearl Travels", contact: "Meena Nair", email: "meena@pearltravels.in", phone: "94567 89012", city: "Chennai", state: "Tamil Nadu", gst: "33AABCP2345F1Z5", notes: "" },
];

export const seedSettings = {
  company: {
    name: "Tripclap (ThinkNext Technologies Pvt Ltd)",
    tagline: "Empowering Travel Agents Across India",
    gst: "29AABCT9876A1Z2",
    address: "4th Floor, Tower B, Cyber City, Gurugram, Haryana 122002",
    signatory: "Vikram Tiwari",
    designation: "Head of Sales",
    phone: "98100 55678",
    website: "agents.tripclap.com",
    about: "Tripclap is India's leading platform dedicated to travel agents. Through agents.tripclap.com, we provide verified leads, a purpose-built CRM, professional websites, and marketplace exposure - everything you need to grow your travel business.",
  },
  payment: {
    bank: "HDFC Bank",
    account: "50100234567890",
    ifsc: "HDFC0001234",
    holder: "ThinkNext Technologies Pvt Ltd",
    type: "Current",
    upi: "tripclap@hdfcbank",
    razorpayKey: "",
  },
  email: {
    mode: "gmail_oauth",
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUser: "proposals@tripclap.com",
    smtpPassword: "",
    gmailConnected: false,
    fromName: "Tripclap Sales",
    fromEmail: "proposals@tripclap.com",
    subjectTemplate: "Tripclap Proposal {{id}} for {{agency}}",
  },
  defaults: {
    gstRate: 18,
    validityDays: 7,
    proposalPrefix: "TC",
    proposalStartNumber: 1,
    maxRepDiscount: 30,
    kyc: ["GST Registration Certificate", "PAN Card of Business / Proprietor", "Business Registration Certificate", "Cancelled Cheque / Bank Statement", "Aadhaar of Authorized Signatory"],
    terms: [
      "This proposal is valid for the number of days mentioned above from the date of issue.",
      "Prices are subject to change after the validity period.",
      "Services will be activated within 48 hours of KYC completion and payment confirmation.",
      "No refund will be issued after account activation.",
      "For support, contact support@tripclap.com",
    ],
  },
};

export const seedRep = {
  id: "rep_aditya",
  name: "Aditya Bose",
  email: "aditya@tripclap.com",
  phone: "98100 55678",
  role: "Sales Rep",
};

export const seedProposals = [
  { id: "TC-2025-0012", clientId: "client_skyline", products: ["Leads (Growth)", "CRM (Pro)"], amount: 118530, status: "Accepted", date: "2025-04-12", repId: "rep_aditya" },
  { id: "TC-2025-0011", clientId: "client_wanderlust", products: ["Website (Business)"], amount: 16757, status: "Sent", date: "2025-04-10", repId: "rep_aditya" },
  { id: "TC-2025-0010", clientId: "client_royal", products: ["Leads (Pro)", "CRM (Enterprise)", "Banner Ads (Standard)"], amount: 298474, status: "Accepted", date: "2025-04-05", repId: "rep_sneha" },
  { id: "TC-2025-0009", clientId: "client_heritage", products: ["CRM (Basic)"], amount: 14155, status: "Draft", date: "2025-04-01", repId: "rep_aditya" },
  { id: "TC-2025-0008", clientId: "client_blue", products: ["Leads (Starter)", "Banner Ads (Basic)"], amount: 57728, status: "Expired", date: "2025-03-20", repId: "rep_sneha" },
  { id: "TC-2025-0007", clientId: "client_pearl", products: ["Leads (Growth)", "CRM (Pro)", "Website (Standard)"], amount: 147200, status: "Revised", date: "2025-03-15", repId: "rep_aditya" },
];
