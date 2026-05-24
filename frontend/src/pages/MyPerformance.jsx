import {
  useEffect,
  useState
} from 'react';

import API from '../api/axios';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const MyPerformance = () => {

  const [stats, setStats] =
    useState({
      total: 0,
      converted: 0,
      pending: 0,
      revenue: 0
    });

  const user = JSON.parse(
    localStorage.getItem('user')
  );

  const fetchData = async () => {

    try {

      const res =
        await API.get('/leads');

      const myLeads =
        res.data.filter(
          (lead) =>
            lead.assignedTo?._id === user.id
        );

      const converted =
        myLeads.filter(
          (lead) =>
            lead.status === 'Converted'
        );

      const pending =
        myLeads.filter(
          (lead) =>
            lead.status !== 'Converted'
        );

      const revenue =
        converted.reduce(
          (acc, curr) =>
            acc +
            Number(
              curr.expectedRevenue || 0
            ),
          0
        );

      setStats({
        total: myLeads.length,
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

        <h1 className="text-3xl font-bold mb-8">
          My Performance
        </h1>

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        ">

          <div className="
            bg-white
            p-6
            rounded-xl
            shadow
          ">

            <h2 className="text-gray-500">
              Total Leads
            </h2>

            <p className="text-4xl font-bold mt-3">
              {stats.total}
            </p>

          </div>

          <div className="
            bg-white
            p-6
            rounded-xl
            shadow
          ">

            <h2 className="text-gray-500">
              Converted
            </h2>

            <p className="text-4xl font-bold mt-3">
              {stats.converted}
            </p>

          </div>

          <div className="
            bg-white
            p-6
            rounded-xl
            shadow
          ">

            <h2 className="text-gray-500">
              Pending
            </h2>

            <p className="text-4xl font-bold mt-3">
              {stats.pending}
            </p>

          </div>

          <div className="
            bg-white
            p-6
            rounded-xl
            shadow
          ">

            <h2 className="text-gray-500">
              Revenue
            </h2>

            <p className="text-4xl font-bold mt-3">
              ₹{stats.revenue}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default MyPerformance;