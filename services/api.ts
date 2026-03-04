// API service for fetching data from dummy APIs

export interface ApiUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

export interface ApiMessage {
  id: number;
  body: string;
  postId: number;
  user: {
    id: number;
    username: string;
  };
}

export interface ApiContact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
}

// Fetch users for the sidebar
export const fetchUsers = async (): Promise<ApiUser[]> => {
  const response = await fetch("https://dummyjson.com/users?limit=9");
  const data = await response.json();
  return data.users;
};

// Fetch contacts for the chat list
export const fetchContacts = async (): Promise<ApiContact[]> => {
  const response = await fetch("https://dummyjson.com/users?limit=10&skip=10");
  const data = await response.json();
  return data.users;
};

// Fetch comments as messages
export const fetchMessages = async (): Promise<ApiMessage[]> => {
  const response = await fetch("https://dummyjson.com/comments?limit=8");
  const data = await response.json();
  return data.comments;
};

// Fetch single user for details panel
export const fetchUserDetails = async (
  userId: number = 1,
): Promise<ApiContact> => {
  const response = await fetch(`https://dummyjson.com/users/${userId}`);
  const data = await response.json();
  return data;
};

// Fetch posts for other chats
export const fetchPosts = async (): Promise<[]> => {
  const response = await fetch("https://dummyjson.com/posts?limit=3");
  const data = await response.json();
  return data.posts;
};

// Simulate delay for loading effect
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
