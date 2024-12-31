export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface Organizer {
  id: number;
  name: string;
  organizerName: string;
  email: string;
  address: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}