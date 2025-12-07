import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { AiOutlineCheckSquare, AiOutlineMinusSquare } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

export const Dashboard = () => {
  const [value, setValue] = useState("");
  const [load, setLoad] = useState(false);
  const [reply, setReply] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [sentStatus, setSentStatus] = useState("");

  const handleSubmit = async () => {
    if (value.trim() === "") return;

    setLoad(true);
    const res = await fetch("http://localhost:3000/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ value })
    });

    const data = await res.json();

    setReply(data);
    setVendors(data.vendors?.vendors || []);
    setLoad(false);
    setValue("");
  };

  const toggleVendor = (index) => {
    const updated = [...vendors];
    updated[index].selected = !updated[index].selected;
    setVendors(updated);
  };

  const toggleSelectAll = () => {
    const updated = vendors.map(v => ({ ...v, selected: !allSelected }));
    setVendors(updated);
    setAllSelected(!allSelected);
  };

  const sendRFP = async () => {
    const selectedVendors = vendors.filter(v => v.selected);

    if (selectedVendors.length === 0) {
      alert("Please select at least one vendor.");
      return;
    }

    const uniqueId = uuidv4();

    const payload = {
      rfpId: uniqueId,
      mail: reply.mail,
      vendors: selectedVendors,
      clientText: reply.text
    };

    await fetch("http://localhost:3000/send-rfp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    
    setReply(null);
    setVendors([]);
    setSentStatus("You will get the analysis after client reply");
  };

  return (
    <div className="dashboard-container w-full p-4">

      
      <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-md">
        <input
          type="text"
          className="flex-1 outline-none text-gray-800 p-2"
          placeholder="Type something…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl flex items-center justify-center transition"
        >
          <FiSend className="text-xl" />
        </button>
      </div>

   
      <div className="input-reply mt-5 bg-white p-4 rounded-xl shadow">
        {load ? (
          <p className="text-gray-500">AI is replying...</p>
        ) : reply ? (
          <>
            <h2 className="font-bold text-lg mb-2">Generated Mail:</h2>
            <p className="text-gray-700">{reply.mail}</p>

            <h2 className="font-bold text-lg mt-5">Selected Vendors:</h2>

            <button
              onClick={toggleSelectAll}
              className="mb-3 flex items-center gap-2 text-blue-600"
            >
              {allSelected ? <AiOutlineMinusSquare /> : <AiOutlineCheckSquare />}
              {allSelected ? "Unselect All" : "Select All"}
            </button>

            {/* Vendor List */}
            <div className="max-h-60 overflow-y-auto border p-3 rounded-lg">
              {vendors.map((vendor, idx) => (
                <div key={idx} className="flex items-center gap-3 mb-2">
                  <input
                    type="checkbox"
                    checked={vendor.selected || false}
                    onChange={() => toggleVendor(idx)}
                    className="w-4 h-4"
                  />
                  <p>{vendor.name} ({vendor.email})</p>
                </div>
              ))}
            </div>

            
            <button
              onClick={sendRFP}
              className="mt-5 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
            >
              Send RFP
            </button>
          </>
        ) : (
          <p className="text-gray-500">{sentStatus}</p>
        )}
      </div>
    </div>
  );
};
