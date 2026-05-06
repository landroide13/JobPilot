import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonSpinner, IonChip, IonButton } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../core/services/job.service';
import { Job } from '../core/models/job.model';
import { JobPhoto, JobPhotoType } from '../core/models/job-photo.model';
import { JobPhotoService } from '../core/services/job-photo.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.page.html',
  styleUrls: ['./job-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonSpinner, IonChip, IonButton]
})
export class JobDetailPage implements OnInit {

  job = signal<Job | null>(null);
  photos = signal<JobPhoto[]>([]);
  loading = signal(true);
  saving = signal(false);
  uploading = signal(false);
  errorMessage = signal('');

  organizationId = 'd8c9ffbb-69d7-4a64-bd9c-001704f6d7ff';

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private jobPhotoService: JobPhotoService
  ) {}

  async ngOnInit() {
    await this.loadJob();
  }

  get jobId(): string {
    return this.route.snapshot.paramMap.get('id') ?? '';
  }

  async loadJob() {
    try {
      this.loading.set(true);

      const [job, photos] = await Promise.all([
        this.jobService.getJobById(this.jobId),
        this.jobPhotoService.getPhotos(this.jobId)
      ]);

      this.job.set(job);
      this.photos.set(photos);
    } catch (error) {
      console.error(error);
      this.errorMessage.set('Could not load job.');
    } finally {
      this.loading.set(false);
    }
  }

  beforePhotos() {
    return this.photos().filter(photo => photo.photo_type === 'before');
  }

  afterPhotos() {
    return this.photos().filter(photo => photo.photo_type === 'after');
  }

  async setStatus(status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled') {
    const job = this.job();
    if (!job) return;

    try {
      this.saving.set(true);

      await this.jobService.updateStatus(job.id, {
        status,
        completed_at: status === 'completed' ? new Date().toISOString() : null
      });

      await this.loadJob();
    } catch (error) {
      console.error(error);
      this.errorMessage.set('Could not update status.');
    } finally {
      this.saving.set(false);
    }
  }

  async markCompleted() {
    const job = this.job();
    if (!job) return;

    try {
      this.saving.set(true);
      await this.jobService.markCompleted(job.id);
      await this.loadJob();
    } catch (error) {
      console.error(error);
      this.errorMessage.set('Could not mark job as completed.');
    } finally {
      this.saving.set(false);
    }
  }

  async uploadPhoto(event: Event, type: JobPhotoType) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const job = this.job();
    if (!job) return;

    try {
      this.uploading.set(true);

      await this.jobPhotoService.uploadPhoto({
        organizationId: this.organizationId,
        jobId: job.id,
        type,
        file
      });

      input.value = '';
      await this.loadJob();
    } catch (error) {
      console.error(error);
      this.errorMessage.set('Could not upload photo.');
    } finally {
      this.uploading.set(false);
    }
  }

}
