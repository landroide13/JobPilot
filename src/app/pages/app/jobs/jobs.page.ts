import { Component,signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonSegment, IonSegmentButton, IonLabel, IonSpinner, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonChip, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { Job, JobStatus } from '../core/models/job.model';
import { JobService } from '../core/services/job.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonSegment, IonSegmentButton, IonLabel, IonSpinner, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonChip, RouterLink, IonButtons, IonBackButton]
})
export class JobsPage {

  jobs = signal<Job[]>([]);
  loading = signal(true);
  selectedStatus = signal<'all' | JobStatus>('all');

  organizationId = 'd8c9ffbb-69d7-4a64-bd9c-001704f6d7ff';

  constructor(private jobService: JobService) {}

  async ionViewWillEnter(){
    await this.loadJobs();
  }

  async loadJobs() {
    try {
      this.loading.set(true);
      const jobs = await this.jobService.getJobs(this.organizationId);
      console.log(jobs)
      this.jobs.set(jobs);
    } catch (error) {
      console.error(error);
    } finally {
      this.loading.set(false);
    }
  }

  filteredJobs() {
    if (this.selectedStatus() === 'all') {
      return this.jobs();
    }

    return this.jobs().filter(job => job.status === this.selectedStatus());
  }

  setStatus(value: any) {
    this.selectedStatus.set(value);
  }

}
