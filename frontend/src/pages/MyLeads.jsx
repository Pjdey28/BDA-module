import {
  useEffect,
  useState
} from 'react';

import API from '../api/axios';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const MyLeads = () => {

  const [leads, setLeads] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem('user')
  );

  const fetchLeads = async () => {

    try {

      const res =
        await API.get('/leads');

      const myLeads = res.data.filter(
        (lead) =>
          lead.assignedTo?._id === user.id
      );

      setLeads(myLeads);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">

      <Sidebar />
      <Navbar />

      <div className="ml-64 p-6">

        <h1 className="text-3xl font-bold mb-8">
          My Leads
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {
            leads.map((lead) => (

              <div
                key={lead._id}
                className="
                  bg-white
                  rounded-xl
                  shadow
                  p-5
                "
              >

                <h2 className="text-2xl font-bold mb-2">
                  {lead.companyName}
                </h2>

                <p>{lead.contactPerson}</p>

                <p className="mt-3">
                  ₹{lead.expectedRevenue}
                </p>

                <span className="
                  bg-blue-100
                  text-blue-700
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  mt-4
                  inline-block
                ">
                  {lead.status}
                </span>

              </div>

            ))
          }

        </div>

      </div>

    </div>
  );
};

export default MyLeads;