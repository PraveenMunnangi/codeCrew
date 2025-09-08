// src/components/RequestForm.tsx
"use client"; // Required for client-side interactivity in Next.js app router

import { useState } from "react";

export default function RequestForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [typeOfHelp, setTypeOfHelp] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Handle form submission logic here
  //   console.log({
  //     name,
  //     contact,
  //     address,
  //     typeOfHelp,
  //     quantity,
  //     description,
  //     photo,
  //   });
  //   alert("Request submitted!");
  // };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const requestData = {
    title: typeOfHelp,
    description: description,
    location: address,
  };

  try {
    const response = await fetch('/api/community-needs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) throw new Error('Submission failed');

    alert('Request submitted successfully!');
    // Optionally reset form fields here
  } catch (err) {
  const message = err instanceof Error ? err.message : String(err);
  alert(`Error: ${message}`);
}

};

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Request Help</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name (optional)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Contact */}
        <div>
          <label className="block text-sm font-medium mb-1">Contact (phone/email)</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
          <small className="text-xs text-gray-500">Location verification will be added later.</small>
        </div>

        {/* Type of Help */}
        <div>
          <label className="block text-sm font-medium mb-1">Type of Help</label>
          <select
            value={typeOfHelp}
            onChange={(e) => setTypeOfHelp(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select</option>
            <option value="food">Food</option>
            <option value="clothes">Clothes</option>
            <option value="shelter">Shelter</option>
            <option value="medicines">Medicines</option>
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium mb-1">Quantity Needed</label>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Additional Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={3}
          ></textarea>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">Upload Photo (optional)</label>
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
            accept="image/*"
            className="w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
}
