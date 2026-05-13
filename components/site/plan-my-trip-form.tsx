'use client';

import { useState } from 'react';
import { Sparkles, Send } from 'lucide-react';

interface PlanMyTripFormProps {
  variant?: 'compact' | 'full';
  onSubmit?: (data: FormData) => void;
}

interface FormData {
  destination?: string;
  travelers: number;
  season: string;
  pace: string;
  vibe: string;
  email: string;
  notes: string;
}

export function PlanMyTripForm({ variant = 'full', onSubmit }: PlanMyTripFormProps) {
  const [formData, setFormData] = useState<FormData>({
    travelers: 2,
    season: 'spring',
    pace: 'moderate',
    vibe: 'cultural',
    email: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (onSubmit) {
      onSubmit(formData);
    }

    setIsSubmitting(false);
    setFormData({ travelers: 2, season: 'spring', pace: 'moderate', vibe: 'cultural', email: '', notes: '' });
  };

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="season" className="block text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground mb-2">
              Season
            </label>
            <select
              id="season"
              value={formData.season}
              onChange={(e) => setFormData({ ...formData, season: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-green/50"
            >
              <option value="spring">Spring</option>
              <option value="summer">Summer</option>
              <option value="autumn">Autumn</option>
              <option value="winter">Winter</option>
            </select>
          </div>

          <div>
            <label htmlFor="travelers" className="block text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground mb-2">
              Travelers
            </label>
            <input
              type="number"
              id="travelers"
              min="1"
              max="20"
              value={formData.travelers}
              onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) })}
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-green/50"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-green/50"
            placeholder="you@example.com"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary group w-full h-10 justify-center text-sm disabled:opacity-50"
        >
          {isSubmitting ? 'Sending...' : 'Plan my trip'}
          <Send className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </form>
    );
  }

  // Full form variant
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-3 pb-6 border-b border-white/10">
        <div className="w-10 h-10 bg-brand-green/15 border border-brand-green/40 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-brand-green" />
        </div>
        <div>
          <h3 className="font-medium text-white">Plan My Trip</h3>
          <p className="text-xs text-muted-foreground">Let Isaac know what you&apos;re dreaming of</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <label htmlFor="travelers" className="block text-sm font-medium mb-2">
            Number of travelers
          </label>
          <input
            type="number"
            id="travelers"
            min="1"
            max="20"
            value={formData.travelers}
            onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-green/50"
          />
        </div>

        <div>
          <label htmlFor="season" className="block text-sm font-medium mb-2">
            Preferred season
          </label>
          <select
            id="season"
            value={formData.season}
            onChange={(e) => setFormData({ ...formData, season: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-green/50"
          >
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="autumn">Autumn</option>
            <option value="winter">Winter</option>
          </select>
        </div>

        <div>
          <label htmlFor="pace" className="block text-sm font-medium mb-2">
            Pace
          </label>
          <select
            id="pace"
            value={formData.pace}
            onChange={(e) => setFormData({ ...formData, pace: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-green/50"
          >
            <option value="slow">Slow & leisurely</option>
            <option value="moderate">Moderate</option>
            <option value="active">Active & adventure</option>
          </select>
        </div>

        <div>
          <label htmlFor="vibe" className="block text-sm font-medium mb-2">
            Trip vibe
          </label>
          <select
            id="vibe"
            value={formData.vibe}
            onChange={(e) => setFormData({ ...formData, vibe: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-green/50"
          >
            <option value="cultural">Cultural & cities</option>
            <option value="nature">Nature & landscapes</option>
            <option value="relaxation">Relaxation & spa</option>
            <option value="adventure">Adventure & exploration</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email address
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-green/50"
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium mb-2">
          Anything else you'd like to share?
        </label>
        <textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={4}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-green/50 resize-none"
          placeholder="Budget, must-sees, travel style, anything else we should know…"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary group w-full h-14 justify-center disabled:opacity-50"
      >
        {isSubmitting ? 'Sending your brief...' : 'Send trip brief'}
        <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>

      <p className="text-xs text-muted-foreground text-center">
        Isaac reads and responds to all briefs within 24 hours.
      </p>
    </form>
  );
}
