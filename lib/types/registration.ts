export interface ParticipantData {
  fullName: string;
  email: string;
  whatsapp: string;
  institution: string;
}

export interface RegistrationDraft {
  eventSlug: string;
  participant: ParticipantData;
}
