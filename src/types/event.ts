export interface Event {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  content: string;
  startDate: string; // Pastikan formatnya sesuai (ISO string, misalnya "2024-12-01T00:00:00Z")
  location: string;
  priceReguler: number;
  priceVip: number;
  priceVvip: number;
  avaliableSeatsReguler: string;
  avaliableSeatsVip: string;
  avaliableSeatsVvip: string;
  eventCategory: string;
  endDate: string;
  user: {
    name: string;
  };
}

export interface EventData {
  title: string;
  description: string;
  priceReguler: number;
  priceVip: number;
  priceVvip: number;
  avaliableSeatsReguler: string;
  avaliableSeatsVip: string;
  avaliableSeatsVvip: string;
  content: string;
  eventCategory: string;
  startDate: string;
  endDate: string;
  location: string;
  thumbnail?: File;
}

export interface EventResponse {
  id: number;
  title: string;
  description: string;
  priceReguler: number;
  priceVip: number;
  priceVvip: number;
  avaliableSeatsReguler: string;
  avaliableSeatsVip: string;
  avaliableSeatsVvip: string;
  content: string;
  eventCategory: string;
  startDate: string;
  endDate: string;
  location: string;
  thumbnailUrl: string;
  createdAt: string;
  updatedAt: string;
}
