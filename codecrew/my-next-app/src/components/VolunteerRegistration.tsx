// src/components/VolunteerRegistration.tsx
"use client";

import { useState } from "react";

interface VolunteerRegistrationProps {
  onSuccess: () => void;
}

export default function VolunteerRegistration({ onSuccess }: VolunteerRegistrationProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, skills }),
      });

      if (!response.ok) throw new Error('Registration failed');

      alert('Thank you for registering as a volunteer!');
      setName("");
      setEmail("");
      setSkills("");
      onSuccess();
    } catch (err) {
      alert(`Error: ${err instanceof Error ? err.message : 'An error occurred'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Become a Volunteer</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Skills *</label>
          <textarea
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="What skills can you offer? (e.g., cooking, driving, medical knowledge)"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Registering...' : 'Register as Volunteer'}
          </button>
        </div>
      </form>
    </div>
  );
}