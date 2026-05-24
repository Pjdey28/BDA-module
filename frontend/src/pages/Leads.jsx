import { useEffect, useState } from 'react';

import API from '../api/axios';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import EditLeadModal from '../components/EditLeadModal';

import { Link } from 'react-router-dom';

const Leads = () => {

  const [leads, setLeads] = useState([]);

  const [search, setSearch] = useState('');

  const [statusFilter, setStatusFilter] = useState('All');

  const [selectedLead, setSelectedLead] = useState(null);

  const fetchLeads = async () => {

    try {

      const res = await API.get('/leads');

      setLeads(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const deleteLeadHandler = async (id) => {

    try {

      await API.delete(`/leads/${id}`);

      fetchLeads();

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter((lead) => {

    const matchesSearch =
      lead.companyName
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === 'All'
      || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-gray-100 min-h-screen">

      <Sidebar />
      <Navbar />

      <div className="ml-64 p-6">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            Leads
          </h1>

          <Link
            to="/add-lead"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg"
          >
            Add Lead
          </Link>

        </div>

        <div className="flex gap-4 mb-6">

          <input
            type="text"
            placeholder="Search company..."
            className="border p-3 rounded-lg w-80"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border p-3 rounded-lg"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >

            <option>All</option>
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Negotiation</option>
            <option>Converted</option>
            <option>Lost</option>

          </select>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {filteredLeads.map((lead) => (

            <div
              key={lead._id}
              className="bg-white rounded-xl shadow p-5"
            >

              <h2 className="text-2xl font-bold mb-2">
                {lead.companyName}
              </h2>

              <p>{lead.contactPerson}</p>

              <p className="text-gray-600">
                {lead.email}
              </p>

              <p className="mt-3 font-semibold">
                ₹{lead.expectedRevenue}
              </p>

              <div className="mt-4">

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {lead.status}
                </span>

              </div>
              <Link
                to={`/lead-details/${lead._id}`}
               className="
                bg-blue-600
                text-white
                px-4
                py-2
                rounded-lg
                inline-block
                mt-4
            "
            >
            View Details
            </Link>

              <div className="flex gap-3 mt-5">

                <button
                  onClick={() => setSelectedLead(lead)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteLeadHandler(lead._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

      {
        selectedLead && (

          <EditLeadModal
            lead={selectedLead}
            closeModal={() => setSelectedLead(null)}
            refreshData={fetchLeads}
          />

        )
      }

    </div>
  );
};

export default Leads;