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
// import RequestForm from "@/components/RequestForm";

// export default function HomePage() {
//   return (
//     <div className="min-h-screen bg-gray-100 py-8">
//       <div className="container mx-auto px-4 max-w-3xl">
//         <h1 className="text-3xl font-bold text-center mb-8">Community Support Portal</h1>

//         {/* Render the RequestForm component */}
//         <RequestForm />
//       </div>
//     </div>
//   );
// }


// src/app/page.tsx
// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import RequestForm from "@/components/RequestForm";
import CommunityNeedsList from "@/components/CommunityNeedsList";
import VolunteerRegistration from "@/components/VolunteerRegistration";
import SponsorRegistration from "@/components/SponsorRegistration";
import DonationForm from "@/components/DonationForm";

export default function HomePage() {
  const [stats, setStats] = useState({
    activeRequests: 0,
    volunteers: 0,
    sponsors: 0,
    fulfilled: 0
  });
  const [activeTab, setActiveTab] = useState("needs");

  useEffect(() => {
    fetchStats();
  }, []);

  // const fetchStats = async () => {
  //   try {
  //     const [needsRes, volunteersRes, sponsorsRes, donationsRes] = await Promise.all([
  //       fetch('/api/community-needs'),
  //       fetch('/api/volunteers'),
  //       fetch('/api/sponsors'),
  //       fetch('/api/donations')
  //     ]);

  //     const needs = await needsRes.json();
  //     const volunteers = await volunteersRes.json();
  //     const sponsors = await sponsorsRes.json();
  //     const donations = await donationsRes.json();

  //     // Count fulfilled needs (needs with at least one donation)
  //     const fulfilledNeeds = new Set(donations.map(d => d.need_id)).size;

  //     setStats({
  //       activeRequests: needs.length,
  //       volunteers: volunteers.length,
  //       sponsors: sponsors.length,
  //       fulfilled: fulfilledNeeds
  //     });
  //   } catch (error) {
  //     console.error("Error fetching stats:", error);
  //   }
  // };

  // In your page.tsx, update the fetchStats function:

const fetchStats = async () => {
  try {
    const [needsRes, volunteersRes, sponsorsRes, donationsRes] = await Promise.all([
      fetch('/api/community-needs'),
      fetch('/api/volunteers'),
      fetch('/api/sponsors'),
      fetch('/api/donations')
    ]);

    const needs = await needsRes.json();
    const volunteers = await volunteersRes.json();
    const sponsors = await sponsorsRes.json();
    const donations = await donationsRes.json();

    // Count fulfilled needs (needs with at least one donation)
    // Add proper error handling for donations
    const fulfilledNeeds = donations && Array.isArray(donations) 
      ? new Set(donations.map(d => d.need_id)).size 
      : 0;

    setStats({
      activeRequests: needs.length || 0,
      volunteers: volunteers.length || 0,
      sponsors: sponsors.length || 0,
      fulfilled: fulfilledNeeds
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    // Set default values if there's an error
    setStats({
      activeRequests: 0,
      volunteers: 0,
      sponsors: 0,
      fulfilled: 0
    });
  }
};


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Community Support Portal
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connecting those in need with volunteers and sponsors.
            Submit a request for help or browse existing needs to offer support.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex border-b border-gray-200">
            <button
              className={`py-2 px-4 font-medium ${activeTab === "needs" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("needs")}
            >
              Community Needs
            </button>
            <button
              className={`py-2 px-4 font-medium ${activeTab === "volunteer" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("volunteer")}
            >
              Become a Volunteer
            </button>
            <button
              className={`py-2 px-4 font-medium ${activeTab === "sponsor" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("sponsor")}
            >
              Become a Sponsor
            </button>
          </div>
        </div>

        {/* Main Content Based on Active Tab */}
        {activeTab === "needs" && (
          <>
            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Request Form Section */}
              <div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
                  <div className="bg-blue-50 rounded-t-lg px-6 py-4 border-b border-blue-100">
                    <h2 className="text-xl font-semibold text-blue-900 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Request Help
                    </h2>
                    <p className="text-blue-700 text-sm mt-1">
                      Need assistance? Fill out the form to connect with volunteers and sponsors.
                    </p>
                  </div>
                  <div className="p-6">
                    <RequestForm onSuccess={fetchStats} />
                  </div>
                </div>
              </div>

              {/* Community Needs List Section */}
              <div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
                  <div className="bg-green-50 rounded-t-lg px-6 py-4 border-b border-green-100">
                    <h2 className="text-xl font-semibold text-green-900 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Help Others
                    </h2>
                    <p className="text-green-700 text-sm mt-1">
                      Browse current needs and volunteer to make a difference in your community.
                    </p>
                  </div>
                  <div className="p-6">
                    <CommunityNeedsList onDonate={() => setActiveTab("sponsor")} />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "volunteer" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <VolunteerRegistration onSuccess={fetchStats} />
          </div>
        )}

        {activeTab === "sponsor" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <SponsorRegistration onSuccess={fetchStats} />
          </div>
        )}

        {/* Statistics Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{stats.activeRequests}</div>
              <div className="text-sm text-gray-600">Active Requests</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{stats.volunteers}</div>
              <div className="text-sm text-gray-600">Volunteers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">{stats.sponsors}</div>
              <div className="text-sm text-gray-600">Sponsors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">{stats.fulfilled}</div>
              <div className="text-sm text-gray-600">Fulfilled</div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">1. Submit Request</h4>
              <p className="text-gray-600">Fill out the form with your needs - food, clothing, shelter, or medical assistance.</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">2. Community Finds You</h4>
              <p className="text-gray-600">Volunteers and sponsors search and find requests they can help with in their area.</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">3. Get Help</h4>
              <p className="text-gray-600">Connect directly with helpers to receive the support you need from your community.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}