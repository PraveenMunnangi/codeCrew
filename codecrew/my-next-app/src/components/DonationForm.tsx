// src/components/DonationForm.tsx
"use client";

import { useState } from "react";

interface DonationFormProps {
  needId: number;
  needTitle: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function DonationForm({ needId, needTitle, onSuccess, onCancel }: DonationFormProps) {
  const [sponsorId, setSponsorId] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("money");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          sponsor_id: parseInt(sponsorId), 
          need_id: needId, 
          amount: parseFloat(amount), 
          type 
        }),
      });

      if (!response.ok) throw new Error('Donation failed');

      alert('Thank you for your donation!');
      setSponsorId("");
      setAmount("");
      setType("money");
      onSuccess();
    } catch (err) {
      alert(`Error: ${err instanceof Error ? err.message : 'An error occurred'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Donate to: {needTitle}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Sponsor ID *</label>
            <input
              type="number"
              value={sponsorId}
              onChange={(e) => setSponsorId(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your sponsor ID"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Amount/Quantity *</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter amount or quantity"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Type of Donation *</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="money">Money</option>
              <option value="food">Food</option>
              <option value="clothes">Clothes</option>
              <option value="shelter">Shelter</option>
              <option value="medicines">Medicines</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : 'Donate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}