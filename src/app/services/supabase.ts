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

  readonly client: SupabaseClient;

  constructor() {
    this.client = createClient(
      environment.supabaseUrl,
       environment.supabaseKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false
        }
      }
    );
    console.log('Supabase URL:', environment.supabaseUrl);
    console.log('Supabase key exists:', !!environment.supabaseKey);
  }

  // get client() {
  //   return this.supabase;
  // } 
 
  async createLead(payload: LeadPayload) {
    return this.client
      .from('leads')
      .insert(payload)
  }

  // async notifyLead(lead: any) {
  //   return this.supabase.functions.invoke('send-lead-email', {
  //     body: lead
  //   });
  // }
  
}
