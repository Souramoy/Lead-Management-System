export interface Lead {
  id: number;
  name: string;
  phone: string;
  source: 'Call' | 'WhatsApp' | 'Field';
  status: 'Interested' | 'Not Interested' | 'Converted';
  created_at: string;
}
