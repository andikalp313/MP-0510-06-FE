export interface Event {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  content: string;
  startDate: string; // Pastikan formatnya sesuai (ISO string, misalnya "2024-12-01T00:00:00Z")
  location: string;
  price: number;
  eventCategory: string;
  endDate: string;
  user: {
    name: string;
  };
}
