import {
  NavItem,
  InboxFilter,
  Team,
  User,
  Channel,
  ChatContact,
  Message,
  ContactData,
  ContactLabel,
  Note,
  OtherChat,
} from "@/types/chatContact";

export const navItems: NavItem[] = [
  { label: "Inbox", icon: "inbox", href: "/dashboard/inbox", isActive: true },
  { label: "Contacts", icon: "contacts", href: "/dashboard/contacts" },
  { label: "AI Employees", icon: "ai", href: "/dashboard/ai-employees" },
  { label: "Workflows", icon: "workflows", href: "/dashboard/workflows" },
  { label: "Campaigns", icon: "campaigns", href: "/dashboard/campaigns" },
];

export const inboxFilters: InboxFilter[] = [
  { label: "My Inbox", icon: "user", isActive: true },
  { label: "All", icon: "all", count: 28 },
  { label: "Unassigned", icon: "unassigned", count: 5 },
];

export const teams: Team[] = [
  { label: "Sales", icon: "team", count: 7, color: "#FFC107" },
  { label: "Customer Support", icon: "team", count: 16, color: "#4CAF50" },
];

export const users: User[] = [
  { id: "1", name: "Sarah Williams", count: 2, color: "#9C27B0" },
  {
    id: "2",
    name: "Michael Johnson",
    count: 11,
    color: "#E91E63",
    isActive: true,
  },
  { id: "3", name: "Emily Davis", color: "#00BCD4" },
  { id: "4", name: "Christopher Miller", count: 4, color: "#FF5722" },
  { id: "5", name: "Amanda Garcia", count: 5, color: "#8BC34A" },
  { id: "6", name: "Joshua Martinez", color: "#3F51B5" },
  { id: "7", name: "Ashley Taylor", count: 1, color: "#009688" },
  { id: "8", name: "Daniel Anderson", color: "#795548" },
  { id: "9", name: "Jessica Thomas", count: 2, color: "#607D8B" },
];

export const channels: Channel[] = [
  { id: "1", name: "Fit4Life", icon: "whatsapp", color: "#25D366" },
  { id: "2", name: "Fit4Life", icon: "instagram", color: "#E1306C" },
];

export const chatContacts: ChatContact[] = [
  {
    id: "1",
    name: "Olivia Mckinsey",
    lastMessage: "Oh my god 😍 I'll try it ASAP, thank...",
    time: "23:23",
    avatarColor: "#FF9800",
    avatarLetter: "O",
  },
  {
    id: "2",
    name: "Sara Williams",
    lastMessage: "Good Evening, Emily! Hope you are...",
    time: "23:16",
    avatarColor: "#4CAF50",
    avatarLetter: "E",
  },
  {
    id: "3",
    name: "Frank Thompson",
    lastMessage: "Thank you for signing up Frank! If t...",
    time: "22:28",
    avatarColor: "#2196F3",
    avatarLetter: "F",
  },
  {
    id: "4",
    name: "Grace Lee",
    lastMessage: "I am sending you the report right a...",
    time: "20:43",
    avatarColor: "#8BC34A",
    avatarLetter: "G",
  },
  {
    id: "5",
    name: "Henry Adams",
    lastMessage: "Thank you for filling out our survey!",
    time: "17:37",
    avatarColor: "#9C27B0",
    avatarLetter: "H",
  },
  {
    id: "6",
    name: "Isabella Martinez",
    lastMessage: "I will update you soon Isabella!",
    time: "16:01",
    avatarColor: "#E91E63",
    avatarLetter: "I",
  },
  {
    id: "7",
    name: "James Brown",
    lastMessage: "Hello James! Let's collaborate on...",
    time: "13:44",
    avatarColor: "#607D8B",
    avatarLetter: "J",
  },
  {
    id: "8",
    name: "Katherine White",
    lastMessage: "Hi Katherine, looking forward to our...",
    time: "09:02",
    avatarColor: "#795548",
    avatarLetter: "K",
  },
  {
    id: "9",
    name: "Lucas Green",
    lastMessage: "Hey Lucas! Ready for the holiday...",
    time: "Yesterday",
    avatarColor: "#00BCD4",
    avatarLetter: "L",
  },
];

export const messages: Message[] = [
  {
    id: "1",
    content:
      "Hi, I recently joined Fit4Life and I'm trying to access my workout plan, but I can't login. Can you help?",
    time: "23:08",
    isSent: false,
  },
  {
    id: "2",
    content:
      "Hello Olivia 👋 I'm Michael, your AI customer support assistant. Let's fix this quickly. Could you confirm the email address?",
    time: "23:08",
    isSent: true,
    isRead: true,
  },
  {
    id: "3",
    content: "Yes, it's olivia.Mckinsey@gmail.com",
    time: "23:16",
    isSent: false,
  },
  {
    id: "4",
    content:
      "Thanks! Looks like your reset wasn't completed. I've sent a new link - please check your inbox.",
    time: "23:16",
    isSent: true,
    isRead: true,
  },
  {
    id: "5",
    content: "I see it. resetting now...",
    time: "23:17",
    isSent: false,
  },
  {
    id: "6",
    content: "Done! I'm logged in. Thanks!",
    time: "23:20",
    isSent: false,
  },
  {
    id: "7",
    content:
      'Perfect 🎉 Your plan is ready under "My Programs". Since you\'re starting out, I suggest our Premium Guide - it boosts results and is 20% off here 👉 www.Fit4Life.com/Premium',
    time: "23:20",
    isSent: true,
    isRead: true,
  },
  {
    id: "8",
    content: "Oh my god 😍 I'll try it ASAP, thank you so much!!",
    time: "23:23",
    isSent: false,
  },
];

export const contactData: ContactData = {
  firstName: "Olivia",
  lastName: "Mckinsey",
  phoneNumber: "+1 (312) 555-0134",
  email: "olivia.Mckinsey@gmail.com",
  assignee: "James West",
  team: "Sales Team",
};

export const contactLabels: ContactLabel[] = [
  { id: "1", label: "Closed Won", color: "#F44336" },
  { id: "2", label: "Chicago", color: "#FFC107" },
];

export const notes: Note[] = [
  { id: "1", content: "Add a note", color: "transparent" },
  {
    id: "2",
    content: "Strong potential for future upgrades",
    color: "#4CAF50",
  },
];

export const otherChats: OtherChat[] = [
  {
    id: "1",
    name: "Fit4Life",
    lastMessage: "On my way!",
    date: "08/08/25",
    icon: "instagram",
    color: "#E1306C",
  },
];
