import { JobPhotoType } from '../models/job-photo.model';

export interface CreateJobPhotoDto {
  organization_id: string;
  job_id: string;
  photo_type: JobPhotoType;
  image_url: string;
}










