import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

export interface LeadPayload {
  name: string;
  email: string;
  city: string;
  trade: string;
  message?: string;
  language: 'en' | 'fr';
  source?: string;
  campaign?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class Supabase {

  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabasePublishableKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false
        }
      }
    );
  }

  get client() {
    return this.supabase;
  }
 
  async createLead(payload: any) {
    return this.supabase
      .from('leads')
      .insert(payload)
  }

  // async notifyLead(lead: any) {
  //   return this.supabase.functions.invoke('send-lead-email', {
  //     body: lead
  //   });
  // }
  
}
