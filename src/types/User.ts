export interface User {
  address: string;
  id: number;
  name: string;
  email: string;
  profilePicture: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface Organizer {
  id: number;
  name: string;
  organizerName: string;
  email: string;
  profilePicture: string;
  address: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}