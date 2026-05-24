import {
  useEffect,
  useState
} from 'react';

import API from '../api/axios';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Performance = () => {

  const [employees, setEmployees] =
    useState([]);

  const [leads, setLeads] = useState([]);

  const fetchData = async () => {

    try {

      const employeeRes =
        await API.get('/users');

      const leadRes =
        await API.get('/leads');

      setEmployees(employeeRes.data);

      setLeads(leadRes.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getEmployeeStats = (employeeId) => {

    const employeeLeads = leads.filter(
      (lead) =>
        lead.assignedTo === employeeId
        || lead.assignedTo?._id === employeeId
    );

    const converted = employeeLeads.filter(
      (lead) => lead.status === 'Converted'
    );

    const revenue = converted.reduce(
      (acc, curr) =>
        acc + Number(curr.expectedRevenue || 0),
      0
    );

    return {
      totalLeads: employeeLeads.length,
      converted: converted.length,
      revenue
    };
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      <Sidebar />
      <Navbar />

      <div className="ml-64 p-6">

        <h1 className="text-3xl font-bold mb-8">
          Team Performance
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {
            employees.map((employee) => {

              const stats =
                getEmployeeStats(employee._id);

              return (

                <div
                  key={employee._id}
                  className="
                    bg-white
                    rounded-xl
                    shadow
                    p-6
                  "
                >

                  <h2 className="text-2xl font-bold mb-2">
                    {employee.name}
                  </h2>

                  <p className="text-gray-600 mb-6">
                    {employee.email}
                  </p>

                  <div className="space-y-3">

                    <div className="
                      flex
                      justify-between
                    ">

                      <span>Total Leads</span>

                      <span className="font-bold">
                        {stats.totalLeads}
                      </span>

                    </div>

                    <div className="
                      flex
                      justify-between
                    ">

                      <span>Converted</span>

                      <span className="font-bold">
                        {stats.converted}
                      </span>

                    </div>

                    <div className="
                      flex
                      justify-between
                    ">

                      <span>Revenue</span>

                      <span className="font-bold">
                        ₹{stats.revenue}
                      </span>

                    </div>

                  </div>

                </div>

              );
            })
          }

        </div>

      </div>

    </div>
  );
};

export default Performance;