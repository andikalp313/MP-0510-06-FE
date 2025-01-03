// @/types/index.ts
export interface Review {
  id: number;
  userId: number;
  eventId: number;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
    profilPicture: string;
  };
}

export interface CreateReviewPayload {
  eventId: number;
  rating: number;
  comment: string;
}
