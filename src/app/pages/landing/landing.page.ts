import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonInput, IonSelect, IonSelectOption, IonTextarea } from '@ionic/angular/standalone';
import { Supabase } from '../../services/supabase';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonButton, IonInput, IonSelect, IonSelectOption, IonTextarea]
})
export class LandingPage {

  lang = signal<'en' | 'fr'>('en');

  t = {
    en: {
      badge: 'Built for plumbers, HVAC teams and cleaners',
      title: 'Stop losing field service jobs in WhatsApp.',
      subtitle:
        'JobPilot helps small trade businesses schedule jobs, send client updates, capture before/after photos, and invoice with Stripe — from one mobile-first CRM.',
      primaryCta: 'Join the early access list',
      secondaryCta: 'See how it works',
      problemTitle: 'WhatsApp is great for chat. Bad for managing jobs.',
      problems: [
        'Lost client messages',
        'Missed appointments',
        'No proof of completed work',
        'Slow invoice payments'
      ],
      featuresTitle: 'Everything your field team needs',
      scheduling: 'Job scheduling',
      schedulingText: 'Assign jobs, dates, status and technicians.',
      photos: 'Before / after photos',
      photosText: 'Document work and keep proof for clients.',
      sms: 'Client SMS updates',
      smsText: 'Send automatic updates when a job is booked, started or completed.',
      invoices: 'Stripe invoicing',
      invoicesText: 'Create invoices and get paid faster online.',
      citiesTitle: 'Launching for local service teams in Lille, Paris and Berlin',
      citiesText:
        'Designed for small teams that need fewer admin tasks and more completed jobs.',
      formTitle: 'Get early access',
      name: 'Your name',
      email: 'Email',
      city: 'City',
      trade: 'Trade',
      message: 'What is your biggest job management problem?',
      submit: 'Request access'
    },
    fr: {
      badge: 'Pour plombiers, chauffagistes, climaticiens et services de nettoyage',
      title: 'Arrêtez de perdre des chantiers dans WhatsApp.',
      subtitle:
        'JobPilot aide les petites entreprises terrain à planifier les interventions, envoyer des mises à jour client, ajouter des photos avant/après et facturer avec Stripe.',
      primaryCta: 'Rejoindre la liste early access',
      secondaryCta: 'Voir comment ça marche',
      problemTitle: 'WhatsApp est utile pour discuter. Pas pour gérer les interventions.',
      problems: [
        'Messages clients perdus',
        'Rendez-vous oubliés',
        'Pas de preuve photo du travail',
        'Paiements de factures trop lents'
      ],
      featuresTitle: 'Tout ce qu’il faut pour votre équipe terrain',
      scheduling: 'Planning des interventions',
      schedulingText: 'Assignez les interventions, dates, statuts et techniciens.',
      photos: 'Photos avant / après',
      photosText: 'Documentez le travail et gardez une preuve pour vos clients.',
      sms: 'SMS clients',
      smsText: 'Envoyez des mises à jour automatiques quand une intervention est réservée, commencée ou terminée.',
      invoices: 'Facturation Stripe',
      invoicesText: 'Créez des factures et encaissez plus vite en ligne.',
      citiesTitle: 'Lancement pour les équipes locales à Lille, Paris et Berlin',
      citiesText:
        'Conçu pour les petites équipes qui veulent moins d’administration et plus d’interventions terminées.',
      formTitle: 'Obtenir un accès anticipé',
      name: 'Votre nom',
      email: 'Email',
      city: 'Ville',
      trade: 'Métier',
      message: 'Quel est votre plus gros problème de gestion ?',
      submit: 'Demander un accès'
    }
  };

  form = {
    name: '',
    email: '',
    city: '',
    trade: '',
    message: ''
  };

  loading = signal(false);
  success = signal(false);
  errorMessage = signal('');

  constructor(private supabaseService: Supabase) {}

  copy() {
    return this.t[this.lang()];
  }

  switchLang(value: 'en' | 'fr') {
    this.lang.set(value);
  }

  async submitLead() {
    this.loading.set(true);
    this.success.set(false);
    this.errorMessage.set('');

    const { error } = await this.supabaseService.createLead({
      name: this.form.name,
      email: this.form.email,
      city: this.form.city,
      trade: this.form.trade,
      message: this.form.message,
      language: this.lang(),
      source: 'meta_ads_landing',
      campaign: new URLSearchParams(window.location.search).get('utm_campaign')
    });

    this.loading.set(false);

    if (error) {
      this.errorMessage.set('Something went wrong. Please try again.');
      return;
    }

    this.success.set(true);

    this.form = {
      name: '',
      email: '',
      city: '',
      trade: '',
      message: ''
    };
  }

}
