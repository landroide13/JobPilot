import { Injectable } from '@angular/core';
import { Supabase } from '../../../../services/supabase';
import { JobPhoto, JobPhotoType } from '../models/job-photo.model';

@Injectable({
  providedIn: 'root'
})
export class JobPhotoService {
  constructor(private supabase: Supabase) {}

  async getPhotos(jobId: string): Promise<JobPhoto[]> {
    const { data, error } = await this.supabase.client
      .from('job_photos')
      .select('*')
      .eq('job_id', jobId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data as JobPhoto[];
  }

  async uploadPhoto(params: {
    organizationId: string;
    jobId: string;
    type: JobPhotoType;
    file: File;
  }): Promise<void> {
    const fileExt = params.file.name.split('.').pop();
    const filePath = `${params.organizationId}/${params.jobId}/${params.type}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await this.supabase.client.storage
      .from('job-photos')
      .upload(filePath, params.file);

    if (uploadError) throw uploadError;

    const { data } = this.supabase.client.storage
      .from('job-photos')
      .getPublicUrl(filePath);

    const { error: insertError } = await this.supabase.client
      .from('job_photos')
      .insert({
        organization_id: params.organizationId,
        job_id: params.jobId,
        photo_type: params.type,
        image_url: data.publicUrl
      });

    if (insertError) throw insertError;
  }
}