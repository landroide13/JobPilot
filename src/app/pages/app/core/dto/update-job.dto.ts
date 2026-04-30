import { JobStatus } from '../models/job.model';

export interface UpdateJobStatusDto {
  status: JobStatus;
  completed_at?: string | null;
}























