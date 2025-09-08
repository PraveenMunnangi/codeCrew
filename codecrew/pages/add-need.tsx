// import { useState } from 'react';

// export default function AddNeed() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [location, setLocation] = useState('');
//   const [status, setStatus] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setLoading(true);
//     setStatus(null);

//     const res = await fetch('/api/community-needs-post', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ title, description, location }),
//     });

//     if (res.ok) {
//       setStatus('Community need added successfully!');
//       setTitle('');
//       setDescription('');
//       setLocation('');
//     } else {
//       const data = await res.json();
//       setStatus(`Error: ${data.error || 'Failed to add need'}`);
//     }
//     setLoading(false);
//   }

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Add a Community Need</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//           className="w-full p-2 border rounded"
//           disabled={loading}
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//           className="w-full p-2 border rounded"
//           rows={4}
//           disabled={loading}
//         />
//         <input
//           type="text"
//           placeholder="Location"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           required
//           className="w-full p-2 border rounded"
//           disabled={loading}
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           {loading ? 'Submitting...' : 'Submit'}
//         </button>
//         {status && <p className="mt-2">{status}</p>}
//       </form>
//     </div>
//   );
// }
