export type JobPhotoType = 'before' | 'after';

export interface JobPhoto {
  id: string;
  organization_id: string;
  job_id: string;
  photo_type: JobPhotoType;
  image_url: string;
  created_at: string;
}







