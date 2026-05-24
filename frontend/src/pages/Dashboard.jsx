import { useEffect, useState } from 'react';

import API from '../api/axios';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

import LeadChart from '../components/LeadChart';

const Dashboard = () => {

  const [leads, setLeads] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    converted: 0,
    pending: 0,
    revenue: 0
  });

  const fetchData = async () => {

    try {

      const res = await API.get('/leads');

      const leadsData = res.data;

      setLeads(leadsData);

      const converted = leadsData.filter(
        (lead) => lead.status === 'Converted'
      );

      const pending = leadsData.filter(
        (lead) => lead.status !== 'Converted'
      );

      const revenue = converted.reduce(
        (acc, curr) => acc + Number(curr.expectedRevenue || 0),
        0
      );

      setStats({
        total: leadsData.length,
        converted: converted.length,
        pending: pending.length,
        revenue
      });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">

      <Sidebar />
      <Navbar />

      <div className="ml-64 p-6">

        <h1 className="text-3xl font-bold mb-6">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-gray-500 mb-2">
              Total Leads
            </h2>

            <p className="text-4xl font-bold">
              {stats.total}
            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-gray-500 mb-2">
              Converted
            </h2>

            <p className="text-4xl font-bold">
              {stats.converted}
            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-gray-500 mb-2">
              Pending
            </h2>

            <p className="text-4xl font-bold">
              {stats.pending}
            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-gray-500 mb-2">
              Revenue
            </h2>

            <p className="text-4xl font-bold">
              ₹{stats.revenue}
            </p>

          </div>

        </div>

        <LeadChart leads={leads} />

      </div>

    </div>
  );
};

export default Dashboard;