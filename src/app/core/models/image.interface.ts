
// interface for workout image model

export interface ImageResponse {
  id?: string;
  workoutId?: string;
  muscularGroupId?: string;
  originalFilename?: string;
  contentType?: string;
  sizeBytes?: number;
  createdAt?: string;
  downloadUrl?: string;
}
