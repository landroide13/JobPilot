import { Injectable } from '@angular/core';
import { Supabase } from '../../../../services/supabase';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private supabase: Supabase) {}

  async getClients(organizationId: string): Promise<Client[]> {
    const { data, error } = await this.supabase.client
      .from('clients')
      .select('*')
      .eq('organization_id', organizationId)
      .order('name', { ascending: true });

    if (error) throw error;

    return data as Client[];
  }
}












