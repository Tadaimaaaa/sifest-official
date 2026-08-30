"use client";

import React, { useState } from "react";
import { EventData } from "@/data/events";
import { RegistrationDraft, ParticipantData } from "@/lib/types/registration";
import { StepIndicator } from "@/components/registration/StepIndicator";
import { StepEventSelection } from "@/components/registration/StepEventSelection";
import { StepParticipantData } from "@/components/registration/StepParticipantData";
import { StepReview } from "@/components/registration/StepReview";
import { Container } from "@/components/ui/Container";
import { registerParticipant } from "@/app/actions/registrationActions";
import { createPayment } from "@/app/actions/paymentActions";
import { useRouter } from "next/navigation";
import Script from "next/script";

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

  // Derived state
  const selectedEvent = events.find((e) => e.slug === draft.eventSlug);

  const handleEventSelect = (slug: string) => {
    setDraft((prev) => ({ ...prev, eventSlug: slug }));
  };

  const handleParticipantUpdate = (participantData: ParticipantData) => {
    setDraft((prev) => ({ ...prev, participant: participantData }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const goToStep = (step: number) => setCurrentStep(step);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await registerParticipant(draft);
      
      if (result.success && result.registrationCode && result.registrationId) {
        setSuccessResult({
          code: result.registrationCode,
          id: result.registrationId
        });
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

  const router = useRouter();
  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handleNextStep = async () => {
    if (!successResult || !selectedEvent) return;

    let isFreeEvent = false;
    if (selectedEvent.price) {
      const lowerPrice = selectedEvent.price.toLowerCase().trim();
      if (lowerPrice === "gratis" || lowerPrice === "free" || lowerPrice === "0") {
        isFreeEvent = true;
      }
    }

    if (!isFreeEvent) {
      // Paid event -> go to checkout
      router.push(`/payment/checkout/${successResult.id}`);
      return;
    }

    // Free event -> call createPayment to confirm instantly
    setIsPaying(true);
    setPaymentError(null);
    try {
      const result = await createPayment(successResult.id);
      
      if (result.success && result.redirectUrl) {
        router.push(result.redirectUrl);
      } else {
        setPaymentError(result.error || "Gagal memproses pendaftaran gratis.");
      }
    } catch (err) {
      setPaymentError("Terjadi kesalahan saat memproses pendaftaran.");
    } finally {
      setIsPaying(false);
    }
  };

  // If successfully registered, show confirmation screen and payment button
  if (successResult) {
    return (
      <div className="w-full relative z-10 pt-32 pb-24 min-h-[80svh] flex flex-col justify-center items-center">
        <Container>
          <div className="max-w-xl mx-auto text-center space-y-6 glass-medium p-10 rounded-[2rem] border border-brand-accent/20">
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
              Data Anda telah dicatat di sistem kami. Langkah selanjutnya adalah menyelesaikan pembayaran.
            </p>

            {paymentError && (
              <div className="w-full bg-status-warning/10 border border-status-warning/20 text-status-warning p-4 rounded-xl mb-6 text-sm">
                {paymentError}
              </div>
            )}
            
            <button
              onClick={handleNextStep}
              disabled={isPaying}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                isPaying
                  ? "bg-white/10 text-white/50 cursor-not-allowed"
                  : "bg-brand-primary text-brand-secondary hover:bg-brand-accent hover:shadow-[0_0_20px_rgba(245,183,22,0.4)]"
              }`}
            >
              {isPaying ? "Memproses..." : "Lanjutkan"}
            </button>
          </div>
        </Container>
      </div>
    );
  }

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
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 text-glow">
              DAFTAR SI FEST 2026
            </h1>
            <p className="text-white/70 max-w-xl mx-auto">
              Lengkapi data di bawah ini untuk mengikuti kegiatan festival teknologi terbesar tahun ini.
            </p>
          </div>

          <StepIndicator currentStep={currentStep} />

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

              {currentStep === 2 && (
                <StepParticipantData
                  data={draft.participant}
                  onUpdate={handleParticipantUpdate}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}

              {currentStep === 3 && selectedEvent && (
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

              {/* Edge case fallback */}
              {currentStep === 3 && !selectedEvent && (
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
