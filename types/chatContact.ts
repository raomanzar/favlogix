export interface NavItem {
  label: string;
  icon: string;
  href: string;
  isActive?: boolean;
}

export interface InboxFilter {
  label: string;
  icon: string;
  count?: number;
  isActive?: boolean;
}

export interface Team {
  label: string;
  icon: string;
  count: number;
  color?: string;
}

export interface User {
  id: string;
  name: string;
  count?: number;
  avatar?: string;
  color?: string;
  isActive?: boolean;
}

export interface Channel {
  id: string;
  name: string;
  icon: string;
  color?: string;
}

export interface ChatContact {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread?: boolean;
  avatarColor?: string;
  avatarLetter?: string;
}

export interface Message {
  id: string;
  content: string;
  time: string;
  isSent: boolean;
  isRead?: boolean;
}

export interface ContactData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  assignee: string;
  team: string;
}

export interface ContactLabel {
  id: string;
  label: string;
  color: string;
}

export interface Note {
  id: string;
  content: string;
  color?: string;
}

export interface OtherChat {
  id: string;
  name: string;
  lastMessage: string;
  date: string;
  icon: string;
  color?: string;
}
