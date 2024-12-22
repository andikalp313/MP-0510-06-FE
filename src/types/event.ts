export interface Event {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  content: string;
  startDate: string; // Pastikan formatnya sesuai (ISO string, misalnya "2024-12-01T00:00:00Z")
  location: string;
  price: number;
  avaliableSeats: string;
  eventCategory: string;
  endDate: string;
  user: {
    name: string;
  };
}

export interface EventData {
  title: string;
  description: string;
  price: number;
  content: string;
  eventCategory: string;
  startDate: string;
  endDate: string;
  availableSeats: number;
  location: string;
  thumbnail?: File;
}

export interface EventResponse {
  id: number;
  title: string;
  description: string;
  price: number;
  content: string;
  eventCategory: string;
  startDate: string;
  endDate: string;
  availableSeats: number;
  location: string;
  thumbnailUrl: string;
  createdAt: string;
  updatedAt: string;
}
