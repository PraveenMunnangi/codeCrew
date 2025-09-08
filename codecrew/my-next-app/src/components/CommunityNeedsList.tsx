// src/components/CommunityNeedsList.tsx (updated)
"use client";

import { useState, useEffect } from "react";
import DonationForm from "./DonationForm";

type CommunityNeed = {
  id: number;
  title: string;
  description: string;
  location: string;
  created_at: string;
};

interface CommunityNeedsListProps {
  onDonate: () => void;
}

export default function CommunityNeedsList({ onDonate }: CommunityNeedsListProps) {
  const [needs, setNeeds] = useState<CommunityNeed[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState<CommunityNeed | null>(null);

  // Fetch community needs from API
  const fetchNeeds = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/community-needs');
      
      // Check if response is HTML instead of JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Server returned HTML instead of JSON. Status: ${response.status}`);
      }
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server returned ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setNeeds(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(`Failed to fetch community needs: ${message}`);
      setNeeds([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchNeeds();
  }, []);

  // Filter needs based on search term and type
  const filteredNeeds = needs.filter((need) => {
    const matchesSearch =
      need.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      need.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      need.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "" || need.title.toLowerCase() === filterType.toLowerCase();
    
    return matchesSearch && matchesType;
  });

  const handleDonateClick = (need: CommunityNeed) => {
    setSelectedNeed(need);
    setShowDonationForm(true);
  };

  const handleDonationSuccess = () => {
    setShowDonationForm(false);
    setSelectedNeed(null);
    fetchNeeds(); // Refresh the list
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {showDonationForm && selectedNeed && (
        <DonationForm 
          needId={selectedNeed.id} 
          needTitle={selectedNeed.title}
          onSuccess={handleDonationSuccess}
          onCancel={() => setShowDonationForm(false)}
        />
      )}
      
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
          Community Needs ({filteredNeeds.length})
        </h2>
        <button
          onClick={fetchNeeds}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 space-y-4 sm:space-y-0 sm:flex sm:gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by title, description, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Type Filter */}
        <div className="sm:w-48">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Types</option>
            <option value="food">Food</option>
            <option value="clothes">Clothes</option>
            <option value="shelter">Shelter</option>
            <option value="medicines">Medicines</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-semibold">Error Loading Data</p>
          <p className="text-sm">{error}</p>
          <button 
            onClick={fetchNeeds}
            className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Community Needs List */}
      {filteredNeeds.length === 0 && !error ? (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No requests found</h3>
          <p className="text-gray-500">
            {searchTerm || filterType ? 'Try adjusting your search or filter.' : 'No community needs have been submitted yet.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNeeds.map((need) => (
            <div
              key={need.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                      {need.title}
                    </span>
                    <span className="text-sm text-gray-500">
                      #{need.id}
                    </span>
                  </div>
                  
                  <p className="text-gray-800 mb-2 leading-relaxed">
                    {need.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {need.location}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Posted: {new Date(need.created_at).toLocaleString()}
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4 sm:mt-0 sm:ml-4">
                  <button 
                    onClick={() => handleDonateClick(need)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Donate
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition-colors">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}