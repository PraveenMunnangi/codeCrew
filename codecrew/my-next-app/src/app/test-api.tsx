// Create a test file at src/app/test-api.tsx
"use client";

import { useEffect } from "react";

export default function TestAPI() {
  useEffect(() => {
    const testAPI = async () => {
      try {
        console.log("Testing API endpoints...");
        
        // Test community-needs endpoint
        const response = await fetch('/api/community-needs');
        const contentType = response.headers.get('content-type');
        console.log("Content-Type:", contentType);
        
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log("API Response:", data);
        } else {
          const text = await response.text();
          console.log("Non-JSON Response (first 200 chars):", text.substring(0, 200));
        }
      } catch (error) {
        console.error("API Test Error:", error);
      }
    };

    testAPI();
  }, []);

  return <div>Testing API... Check browser console for results.</div>;
}