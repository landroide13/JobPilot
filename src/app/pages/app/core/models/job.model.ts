export type JobStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

export interface Job {
  id: string;
  organization_id: string;
  client_id: string;
  title: string;
  description?: string;
  status: JobStatus;
  scheduled_at?: string;
  completed_at?: string;
  created_at: string;
  clients?: {
    name: string;
    phone?: string;
    email?: string;
    address?: string;
    notes?: string;
  };
}












