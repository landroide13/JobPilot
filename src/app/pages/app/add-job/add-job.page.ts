import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Client } from '../core/models/client.model';
import { JobService } from '../core/services/job.service';
import { ClientService } from '../core/services/client.service';

@Component({
  selector: 'app-add-job',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonicModule
  ],
  templateUrl: './add-job.page.html',
  styleUrls: ['./add-job.page.scss']
})
export class AddJobPage implements OnInit {
  clients = signal<Client[]>([]);
  loading = signal(false);
  saving = signal(false);
  errorMessage = signal('');

  organizationId = 'd8c9ffbb-69d7-4a64-bd9c-001704f6d7ff';

  form = {
    client_id: '',
    title: '',
    description: '',
    scheduled_at: new Date().toISOString()
  };

  constructor(
    private jobService: JobService,
    private clientService: ClientService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.loadClients();
  }

  async loadClients() {
    try {
      this.loading.set(true);
      const clients = await this.clientService.getClients(this.organizationId);
      this.clients.set(clients);
    } catch (error) {
      console.error(error);
      this.errorMessage.set('Could not load clients.');
    } finally {
      this.loading.set(false);
    }
  }

  async submit() {
    if (!this.form.client_id || !this.form.title) {
      this.errorMessage.set('Client and title are required.');
      return;
    }

    try {
      this.saving.set(true);
      this.errorMessage.set('');

      await this.jobService.createJob({
        organization_id: this.organizationId,
        client_id: this.form.client_id,
        title: this.form.title,
        description: this.form.description,
        scheduled_at: this.form.scheduled_at
      });

      await this.router.navigateByUrl('/app/jobs');
    } catch (error) {
      console.error(error);
      this.errorMessage.set('Could not create job.');
    } finally {
      this.saving.set(false);
    }
  }
}
