import { Injectable } from '@angular/core';
import { Supabase } from '../../../../services/supabase';
import { CreateJobDto } from '../dto/create-job.dto';
import { UpdateJobStatusDto } from '../dto/update-job.dto';
import { Job } from '../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  constructor(private supabase: Supabase) {} 

  async getTodayJobs(organizationId: string): Promise<Job[]> {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const { data, error } = await this.supabase.client
      .from('jobs')
      .select(`
        *,
        clients (
          name,
          phone,
          address
        )
      `)
      .eq('organization_id', organizationId)
      .gte('scheduled_at', start.toISOString())
      .lte('scheduled_at', end.toISOString())
      .order('scheduled_at', { ascending: true });

    if (error) throw error;

    return data as Job[];
  }

  async getJobs(organizationId: string): Promise<Job[]> {
    const { data, error } = await this.supabase.client
      .from('jobs')
      .select(`
        *,
        clients (
          name,
          phone,
          address
        )
      `)
      .eq('organization_id', organizationId)
      .order('scheduled_at', { ascending: true });

    if (error) {
      console.error('Supabase jobs error:', error);
      throw error;
    }

    console.log(data)

    return data as Job[];
  }

  async createJob(dto: CreateJobDto): Promise<void> {
    const { error } = await this.supabase.client
      .from('jobs')
      .insert(dto);

    if (error) throw error;
  }

  async updateStatus(jobId: string, dto: UpdateJobStatusDto): Promise<void> {
    const { error } = await this.supabase.client
      .from('jobs')
      .update(dto)
      .eq('id', jobId);

    if (error) throw error;
  }
}




















