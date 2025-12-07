import React, { useState, useEffect } from "react";
import { Search, ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";

export const RFPAnalysisPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [data, setData] = useState([]); // Start with empty array
  const [loading, setLoading] = useState(true);

  
  const GetRfpRequests = async () => {
    try {
      const res = await fetch('http://localhost:3000/getrfprequests');
      const result = await res.json();

    
      const rfpData = Array.isArray(result) ? result : result.data || [];

     
      const formattedData = rfpData.map(item => ({
        rfpId: item.rfpId,
        clientText: item.clientText || "No client message",
        mailSubject: item.mail?.split("\n")[0].replace("Subject: ", "") || "No Subject",
        date: new Date(item.createdAt || Date.now()).toLocaleDateString("en-GB"), // adjust field if needed
        status: item.status || "Waiting for Reply", // you can update this field in DB later
        vendorCount: item.vendors?.length || 0
      }));

      setData(formattedData);
    } catch (error) {
      console.error("Error fetching RFP requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetRfpRequests();
  }, []);

  
  const filteredData = data.filter((item) =>
    (item.rfpId.toLowerCase().includes(search.toLowerCase()) ||
     item.clientText.toLowerCase().includes(search.toLowerCase()) ||
     item.mailSubject.toLowerCase().includes(search.toLowerCase())) &&
    (filter === "All" || item.status === filter)
  );

  
  const statuses = ["All", ...Array.from(new Set(data.map(item => item.status)))];

  return (
    <div className="min-h-screen bg-gray-100 p-6 w-full">
     
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        RFP Analysis Dashboard
      </h1>

     
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        
        <div className="flex items-center bg-white shadow-md rounded-xl px-4 py-2 w-full md:w-1/2">
          <Search className="text-gray-500 mr-2" size={20} />
          <input
            type="text"
            placeholder="Search by RFP ID, Client Message or Subject..."
            className="w-full outline-none text-gray-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        
        <select
          className="bg-white shadow-md rounded-xl px-6 py-3 text-gray-700 outline-none cursor-pointer appearance-none"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {statuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="text-center py-10">
          <p className="text-gray-600 text-lg">Loading RFP requests...</p>
        </div>
      )}

    
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item.rfpId}
                className="bg-white p-6 shadow-lg rounded-2xl border border-gray-200 hover:shadow-xl transition duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-bold text-blue-700">{item.rfpId}</h2>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === "Waiting for Reply"
                        ? "bg-yellow-100 text-yellow-800"
                        : item.status === "Replied"
                        ? "bg-blue-100 text-blue-800"
                        : item.status === "Analyzed"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <p className="text-gray-700 text-sm mt-3 line-clamp-2">
                  <span className="font-semibold">Client:</span> {item.clientText}
                </p>

                <p className="text-gray-600 text-xs mt-2">
                  <span className="font-medium">Subject:</span> {item.mailSubject}
                </p>

                <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                  <span>{item.date}</span>
                  <span className="font-medium">{item.vendorCount} Vendors</span>
                </div>

                <NavLink to={`/analysis/${item.rfpId}`}>
                  <button className="mt-5 w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium transition">
                    View Analysis <ArrowRight className="ml-2" size={18} />
                  </button>
                </NavLink>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No RFP requests found matching your criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};