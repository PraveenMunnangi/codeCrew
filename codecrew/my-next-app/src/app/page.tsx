// // src/app/page.tsx
// import RequestForm from "@/components/RequestForm";

// export default function HomePage() {
//   return (
//     <div className="min-h-screen bg-gray-100 py-8">
//       <div className="container mx-auto px-4">
//         <h1 className="text-3xl font-bold text-center mb-8">Community Support Portal</h1>
        
//         {/* Request Form */}
//         <RequestForm />
//       </div>
//     </div>
//   );
// }


// src/app/page.tsx
import RequestForm from "@/components/RequestForm";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-8">Community Support Portal</h1>

        {/* Render the RequestForm component */}
        <RequestForm />
      </div>
    </div>
  );
}
