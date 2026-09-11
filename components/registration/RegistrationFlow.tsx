"use client";

import React, { useState, useEffect } from "react";
import { EventData } from "@/data/events";
import { RegistrationDraft, ParticipantData } from "@/lib/types/registration";
import { StepIndicator } from "@/components/registration/StepIndicator";
import { StepEventSelection } from "@/components/registration/StepEventSelection";
import { StepParticipantData } from "@/components/registration/StepParticipantData";
import { StepReview } from "@/components/registration/StepReview";
import { StepETicket } from "@/components/registration/StepETicket";
import { Container } from "@/components/ui/Container";
import { registerParticipant } from "@/app/actions/registrationActions";
import { updatePaymentProofUrl } from "@/app/actions/paymentProofActions";
import { createClient } from "@/lib/supabase/client";
import { UploadCloud, CheckCircle } from "lucide-react";
import Image from "next/image";

interface RegistrationFlowProps {
  initialEventSlug?: string;
  events: EventData[];
}

export function RegistrationFlow({ initialEventSlug, events }: RegistrationFlowProps) {
  // State
  const [currentStep, setCurrentStep] = useState<number>(initialEventSlug ? 2 : 1);
  const [draft, setDraft] = useState<RegistrationDraft>({
    eventSlug: initialEventSlug || "",
    participant: {
      fullName: "",
      email: "",
      whatsapp: "",
      institution: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successResult, setSuccessResult] = useState<{ code: string; id: string } | null>(null);

  // Persist draft and step to sessionStorage (NOT successResult - causes stale state issues)
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('sifest_reg_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.draft && parsed.draft.eventSlug) {
          // If URL param forces an event and it differs from cache, use URL param
          if (initialEventSlug && initialEventSlug !== parsed.draft.eventSlug) {
            setDraft((prev) => ({ ...prev, eventSlug: initialEventSlug }));
            setCurrentStep(2);
          } else {
            setDraft(parsed.draft);
            if (initialEventSlug) {
              setCurrentStep(parsed.step && parsed.step > 2 ? parsed.step : 2);
            } else if (parsed.step && parsed.step >= 1 && parsed.step < steps.length) {
              setCurrentStep(parsed.step);
            }
          }
        }
      } else if (initialEventSlug) {
        setDraft((prev) => ({ ...prev, eventSlug: initialEventSlug }));
        setCurrentStep(2);
      }
    } catch (e) {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      // Only save while form is in progress (not after completion)
      if (!successResult) {
        sessionStorage.setItem('sifest_reg_draft', JSON.stringify({ draft, step: currentStep }));
      }
    } catch (e) {}
  }, [draft, currentStep, successResult]);

  // Derived state
  const selectedEvent = events.find((e) => e.slug === draft.eventSlug);

  const steps = draft.eventSlug.startsWith('turnamen-futsal')
    ? [
        { id: 1, label: "Acara" },
        { id: 2, label: draft.eventSlug === 'turnamen-futsal-umum' ? "Data Tim" : "Data Sekolah" },
        { id: 3, label: "Data Pemain" },
        { id: 4, label: "Ulasan" },
        { id: 5, label: "Pembayaran" },
      ]
    : draft.eventSlug === 'turnamen-esport-mlbb'
    ? [
        { id: 1, label: "Acara" },
        { id: 2, label: "Data Tim" },
        { id: 3, label: "Data Pemain" },
        { id: 4, label: "Ulasan" },
        { id: 5, label: "Pembayaran" },
      ]
    : [
        { id: 1, label: "Acara" },
        { id: 2, label: "Data Peserta" },
        { id: 3, label: "Ulasan" },
        { id: 4, label: "Pembayaran" },
      ];

  const handleEventSelect = (slug: string) => {
    setDraft((prev) => ({ ...prev, eventSlug: slug }));
  };

  const handleParticipantUpdate = (participantData: ParticipantData) => {
    setDraft((prev) => ({ ...prev, participant: participantData }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const goToStep = (step: number) => setCurrentStep(step);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Map dynamic fields to standard participant fields for database constraints
      const submissionDraft = { ...draft };
      if (draft.eventSlug.startsWith('turnamen-futsal')) {
        const school = draft.participant.metadata?.schoolData;
        const team = draft.participant.metadata?.teamData;
        if (school) {
          submissionDraft.participant = {
            ...submissionDraft.participant,
            fullName: school.coachName || team?.coachName || 'Official Tim',
            email: school.email || '',
            whatsapp: school.coachWhatsapp || team?.coachWhatsapp || '',
            institution: school.schoolName || '',
          };
        }
      } else if (draft.eventSlug === 'turnamen-esport-mlbb') {
        const team = draft.participant.metadata?.teamData;
        if (team) {
          submissionDraft.participant = {
            ...submissionDraft.participant,
            fullName: team.captainName || '',
            email: draft.participant.email || '', // Email is not specifically asked in MLBB, we might need a fallback or collect it
            whatsapp: team.captainWhatsapp || '',
            institution: team.teamName || '',
          };
        }
      } else if (draft.eventSlug === 'turnamen-esport-efootball') {
        submissionDraft.participant = {
          ...submissionDraft.participant,
          email: `${draft.participant.whatsapp.replace(/\D/g, '')}@efootball.sifest.id`,
          institution: 'Peserta Umum / E-Football',
        };
      } else if (draft.eventSlug.startsWith('open-bazaar')) {
        submissionDraft.participant = {
          ...submissionDraft.participant,
          email: `${draft.participant.whatsapp.replace(/\D/g, '')}@bazaar.sifest.id`,
        };
      } else if (draft.eventSlug === 'lomba-keagamaan') {
        // MTQ: ensure email and institution are properly mapped
        submissionDraft.participant = {
          ...submissionDraft.participant,
          email: draft.participant.email?.trim() || `${draft.participant.whatsapp.replace(/\D/g, '')}@mtq.sifest.id`,
          institution: draft.participant.institution?.trim() || 'Peserta MTQ',
        };
      }

      const result = await registerParticipant(submissionDraft);
      
      if (result.success && result.registrationCode && result.registrationId) {
        setSuccessResult({
          code: result.registrationCode,
          id: result.registrationId
        });
        setCurrentStep(steps.length);
      } else {
        setSubmitError(result.error || "Gagal melakukan pendaftaran.");
      }
    } catch (error) {
      console.error("[RegistrationFlow] Exception:", error);
      setSubmitError("Terjadi kesalahan jaringan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !successResult) return;

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Ukuran file maksimal 5MB.");
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    try {
      const supabase = createClient();
      const fileExt = file.name.split('.').pop();
      const fileName = `proof_${successResult.id}_${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('registration_files')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('registration_files')
        .getPublicUrl(fileName);

      const res = await updatePaymentProofUrl(successResult.id, publicUrlData.publicUrl);
      if (res.success) {
        setUploadSuccess(true);
      } else {
        throw new Error(res.error || "Gagal menyimpan URL ke database");
      }
    } catch (err: any) {
      setUploadError(err.message || "Gagal mengunggah bukti pembayaran.");
    } finally {
      setIsUploading(false);
    }
  };

  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Helper to check if event is free
  const isEventFree = () => {
    if (!selectedEvent || !selectedEvent.price) return false;
    const lp = selectedEvent.price.toLowerCase().trim();
    return lp === "gratis" || lp === "free" || lp === "0";
  };

  // If successfully registered, logic continues below in currentStep === steps.length

  return (
    <div className="w-full relative z-10 pt-32 pb-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center px-6 py-2 rounded-full glass-strong border-white/20 mb-6">
              <span className="text-sm font-bold tracking-widest text-brand-accent uppercase">
                PENDAFTARAN
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 text-glow uppercase">
              {(selectedEvent && currentStep > 1) ? `PENDAFTARAN ${selectedEvent.title}` : "PENDAFTARAN SI FEST 2026"}
            </h1>
            <p className="text-white/70 max-w-xl mx-auto">
              Lengkapi data di bawah ini untuk mengikuti kegiatan festival teknologi terbesar tahun ini.
            </p>
          </div>

          <StepIndicator currentStep={currentStep} steps={steps} />

          <div className="mt-8 relative">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-brand-primary/5 rounded-[100px] blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              {currentStep === 1 && (
                <StepEventSelection
                  events={events}
                  selectedEventSlug={draft.eventSlug}
                  onSelect={handleEventSelect}
                  onNext={nextStep}
                />
              )}

              {/* Standard Event Participant Data */}
              {currentStep === 2 && !draft.eventSlug.startsWith('turnamen-futsal') && draft.eventSlug !== 'turnamen-esport-mlbb' && draft.eventSlug !== 'turnamen-esport-efootball' && draft.eventSlug !== 'lomba-keagamaan' && !draft.eventSlug.startsWith('open-bazaar') && (
                <StepParticipantData
                  data={draft.participant}
                  eventSlug={draft.eventSlug}
                  onUpdate={handleParticipantUpdate}
                  onNext={nextStep}
                  onBack={prevStep}
                  mode="default"
                />
              )}

              {/* MTQ Participant Data */}
              {currentStep === 2 && draft.eventSlug === 'lomba-keagamaan' && (
                <StepParticipantData
                  data={draft.participant}
                  eventSlug={draft.eventSlug}
                  onUpdate={handleParticipantUpdate}
                  onNext={nextStep}
                  onBack={prevStep}
                  mode="mtq"
                />
              )}

              {/* Bazaar Participant Data */}
              {currentStep === 2 && draft.eventSlug.startsWith('open-bazaar') && (
                <StepParticipantData
                  data={draft.participant}
                  eventSlug={draft.eventSlug}
                  onUpdate={handleParticipantUpdate}
                  onNext={nextStep}
                  onBack={prevStep}
                  mode="bazaar"
                />
              )}

              {/* E-Football Participant Data */}
              {currentStep === 2 && draft.eventSlug === 'turnamen-esport-efootball' && (
                <StepParticipantData
                  data={draft.participant}
                  eventSlug={draft.eventSlug}
                  onUpdate={handleParticipantUpdate}
                  onNext={nextStep}
                  onBack={prevStep}
                  mode="efootball"
                />
              )}

              {/* Futsal SLTA School Data */}
              {currentStep === 2 && draft.eventSlug.startsWith('turnamen-futsal') && (
                <StepParticipantData
                  data={draft.participant}
                  eventSlug={draft.eventSlug}
                  onUpdate={handleParticipantUpdate}
                  onNext={nextStep}
                  onBack={prevStep}
                  mode="school"
                />
              )}

              {/* Futsal SLTA Player Data */}
              {currentStep === 3 && draft.eventSlug.startsWith('turnamen-futsal') && (
                <StepParticipantData
                  data={draft.participant}
                  eventSlug={draft.eventSlug}
                  onUpdate={handleParticipantUpdate}
                  onNext={nextStep}
                  onBack={prevStep}
                  mode="players"
                />
              )}

              {/* MLBB Team Data */}
              {currentStep === 2 && draft.eventSlug === 'turnamen-esport-mlbb' && (
                <StepParticipantData
                  data={draft.participant}
                  eventSlug={draft.eventSlug}
                  onUpdate={handleParticipantUpdate}
                  onNext={nextStep}
                  onBack={prevStep}
                  mode="mlbb-team"
                />
              )}

              {/* MLBB Player Data */}
              {currentStep === 3 && draft.eventSlug === 'turnamen-esport-mlbb' && (
                <StepParticipantData
                  data={draft.participant}
                  eventSlug={draft.eventSlug}
                  onUpdate={handleParticipantUpdate}
                  onNext={nextStep}
                  onBack={prevStep}
                  mode="mlbb-players"
                />
              )}

              {currentStep === steps.length - 1 && selectedEvent && !successResult && (
                <div className="space-y-4">
                  {submitError && (
                    <div className="w-full bg-status-warning/10 border border-status-warning/20 text-status-warning p-4 rounded-xl flex items-center justify-center text-center">
                      {submitError}
                    </div>
                  )}
                  <StepReview
                    draft={draft}
                    event={selectedEvent}
                    onEditStep={goToStep}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                  />
                </div>
              )}

              {/* Payment Step */}
              {currentStep === steps.length && successResult && selectedEvent && (
                <div className="max-w-xl mx-auto text-center space-y-6 glass-medium p-10 rounded-[2rem] border border-brand-accent/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="w-20 h-20 bg-brand-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(245,183,22,0.3)]">
                    <svg className="w-10 h-10 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  
                  <h2 className="font-heading text-4xl font-bold text-white text-glow">
                    Pendaftaran Berhasil!
                  </h2>
                  
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-8">
                    <p className="text-white/60 text-sm mb-2 uppercase tracking-widest font-semibold">Kode Pendaftaran Anda</p>
                    <p className="text-3xl md:text-4xl font-mono font-bold text-brand-accent tracking-wider">
                      {successResult.code}
                    </p>
                  </div>
                  
                  <p className="text-white/80 leading-relaxed mb-6">
                    {isEventFree() 
                      ? "Pendaftaran Anda telah berhasil dicatat di sistem kami. Terima kasih telah mendaftar!"
                      : "Data Anda telah dicatat di sistem kami. Langkah selanjutnya adalah menyelesaikan pembayaran biaya registrasi."}
                  </p>

                  {!isEventFree() && (
                    <div className="bg-[#0A192F] border border-brand-accent/30 rounded-xl p-6 mb-8 text-left space-y-4">
                      <h3 className="font-bold text-white mb-2">Instruksi Pembayaran Manual</h3>
                      <p className="text-white/80 text-sm">Silakan transfer biaya sebesar <strong className="text-brand-accent">{selectedEvent.price}</strong> ke rekening berikut:</p>
                      
                      <div className="space-y-3">
                        <div className="bg-white/5 p-4 rounded-lg border border-white/10 flex items-center gap-3 sm:gap-4">
                          <div className="bg-white rounded-lg p-2 flex-shrink-0">
                            <Image src="/images/banks/logo-bri.jpg" alt="BRI" width={64} height={42} className="object-contain w-12 sm:w-16" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-mono text-base sm:text-lg font-bold break-all">817301013354530</p>
                            <p className="text-white/60 text-xs sm:text-sm truncate">a.n. ZHARA DELVIA PUTRI</p>
                          </div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-lg border border-white/10 flex items-center gap-3 sm:gap-4">
                          <div className="bg-white rounded-lg p-2 flex-shrink-0">
                            <Image src="/images/banks/logo-bank-nagari.jpg" alt="Bank Nagari" width={64} height={42} className="object-contain w-12 sm:w-16" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-mono text-base sm:text-lg font-bold break-all">10030234000065</p>
                            <p className="text-white/60 text-xs sm:text-sm truncate">a.n. FACHRATUN RAHIMA</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10">
                        <label className="block text-sm font-medium text-white/90 mb-2">Unggah Bukti Pembayaran</label>
                        {uploadSuccess ? (
                          <div className="flex items-center gap-2 text-status-success bg-status-success/10 p-3 rounded-xl border border-status-success/20">
                            <CheckCircle size={20} />
                            <span className="text-sm">Bukti pembayaran berhasil diunggah!</span>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2">
                            <label className={`relative flex items-center justify-center px-4 py-3 border border-white/20 border-dashed rounded-xl cursor-pointer transition-colors bg-white/5 hover:bg-white/10`}>
                              <input type="file" className="hidden" accept="image/*,application/pdf" onChange={handleFileUpload} disabled={isUploading} />
                              {isUploading ? (
                                <div className="flex items-center gap-2 text-brand-accent">
                                  <div className="w-5 h-5 border-2 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
                                  <span>Mengunggah...</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 text-white/70">
                                  <UploadCloud size={20} />
                                  <span>Pilih File Gambar/PDF</span>
                                </div>
                              )}
                            </label>
                            {uploadError && <p className="text-status-warning text-xs">{uploadError}</p>}
                            <p className="text-white/50 text-xs text-center">Maksimal 5MB.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {isEventFree() ? (
                    <button
                      onClick={() => goToStep(steps.length + 2)}
                      className="block w-full py-4 rounded-xl font-bold text-lg text-center transition-all duration-300 bg-brand-primary text-brand-secondary hover:bg-brand-accent hover:shadow-[0_0_20px_rgba(245,183,22,0.4)]"
                    >
                      Lihat E-Ticket
                    </button>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <p className="text-white/70 text-sm mb-2">
                        *Silakan unggah bukti pembayaran dan konfirmasi melalui WhatsApp terlebih dahulu sebelum menekan tombol Selesai.
                      </p>
                      <a
                        href={`https://wa.me/6285185778725?text=Halo%20Panitia%20SI%20FEST%202026%2C%20saya%20ingin%20mengonfirmasi%20pembayaran%20pendaftaran%20berikut%3A%0A%0A%F0%9F%8E%AF%20*KONFIRMASI%20PEMBAYARAN%20SI%20FEST%202026*%0A%0A%E2%80%A2%20Nama%20Acara%3A%20${encodeURIComponent(selectedEvent.title)}%0A%E2%80%A2%20Kode%20Pendaftaran%3A%20*${successResult.code}*%0A%E2%80%A2%20Nama%20Peserta%3A%20${encodeURIComponent(draft.participant.fullName)}%0A%E2%80%A2%20Asal%20Institusi%3A%20${encodeURIComponent(draft.participant.institution)}%0A%0ABukti%20pembayaran%20telah%20saya%20lampirkan.%20Mohon%20konfirmasi%20penerimaan.%20Terima%20kasih!%20%F0%9F%99%8F`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 bg-[#25D366] text-white hover:bg-[#128C7E] hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]"
                      >
                        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                        </svg>
                        Konfirmasi via WhatsApp
                      </a>
                      {uploadSuccess ? (
                        <button
                          onClick={() => goToStep(steps.length + 2)}
                          className="block w-full py-4 rounded-xl font-bold text-lg text-center transition-all duration-300 bg-white/10 text-white hover:bg-white/20 border border-white/10"
                        >
                          Selesai & Lihat E-Ticket
                        </button>
                      ) : (
                        <button
                          disabled
                          className="block w-full py-4 rounded-xl font-bold text-lg text-center transition-all duration-300 bg-white/5 text-white/30 border border-white/5 cursor-not-allowed"
                        >
                          Selesai
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Step 6: E-Ticket */}
              {currentStep === steps.length + 2 && successResult && selectedEvent && (
                <StepETicket 
                  event={selectedEvent} 
                  draft={draft} 
                  successResult={successResult} 
                />
              )}

              {/* Edge case fallback */}
              {(currentStep === steps.length - 1 || currentStep === steps.length || currentStep === steps.length + 1 || currentStep === steps.length + 2) && !selectedEvent && (
                <div className="text-center py-20">
                  <p className="text-white/60 mb-6">Acara tidak valid atau belum dipilih.</p>
                  <button onClick={() => goToStep(1)} className="text-brand-accent hover:underline">
                    Kembali pilih acara
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
