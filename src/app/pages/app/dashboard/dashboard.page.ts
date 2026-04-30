import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonChip, IonSpinner } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { JobService } from '../core/services/job.service';
import { Job } from '../core/models/job.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonChip, RouterLink, IonSpinner]
})
export class DashboardPage implements OnInit {

  jobs = signal<Job[]>([]);
  loading = signal(true);
  errorMessage = signal('');

  // Temporary until auth/org onboarding exists.
  organizationId = 'PASTE_TEST_ORGANIZATION_ID';

  constructor(private jobService: JobService) {}

  async ngOnInit() {
    await this.loadTodayJobs();
  }

  async loadTodayJobs() {
    try {
      this.loading.set(true);
      const jobs = await this.jobService.getTodayJobs(this.organizationId);
      this.jobs.set(jobs);
    } catch (error) {
      console.error(error);
      this.errorMessage.set('Could not load today jobs.');
    } finally {
      this.loading.set(false);
    }
  }

  
}
