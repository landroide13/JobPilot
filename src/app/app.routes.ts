import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    loadComponent: () => import('./pages/landing/landing.page').then( m => m.LandingPage)
  },

  {
    path: 'app/dashboard',
    loadComponent: () =>
      import('./pages/app/dashboard/dashboard.page').then(m => m.DashboardPage)
  },
  {
    path: 'app/jobs',
    loadComponent: () =>
      import('./pages/app/jobs/jobs.page').then(m => m.JobsPage)
  },
  {
    path: 'app/jobs/new',
    loadComponent: () =>
      import('./pages/app/add-job/add-job.page').then(m => m.AddJobPage)
  },


  {
    path: 'job-detail',
    loadComponent: () => import('./pages/app/job-detail/job-detail.page').then( m => m.JobDetailPage)
  },
  {
    path: 'clients',
    loadComponent: () => import('./pages/app/clients/clients.page').then( m => m.ClientsPage)
  },
  {
    path: 'invoices',
    loadComponent: () => import('./pages/app/invoices/invoices.page').then( m => m.InvoicesPage)
  },
];
