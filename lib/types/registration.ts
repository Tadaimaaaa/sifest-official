export interface ParticipantData {
  fullName: string;
  email: string;
  whatsapp: string;
  institution: string;
  metadata?: any;
}

export interface RegistrationDraft {
  eventSlug: string;
  participant: ParticipantData;
}
