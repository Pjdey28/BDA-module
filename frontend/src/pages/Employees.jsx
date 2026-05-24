import { useEffect, useState } from 'react';
import API from '../api/axios';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Employees = () => {

  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {

    try {

      const res = await API.get('/users');

      setEmployees(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">

      <Sidebar />
      <Navbar />

      <div className="ml-64 p-6">

        <h1 className="text-3xl font-bold mb-6">
          Employees
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {employees.map((employee) => (

            <div
              key={employee._id}
              className="bg-white rounded-xl shadow p-5"
            >

              <h2 className="text-2xl font-bold mb-2">
                {employee.name}
              </h2>

              <p className="text-gray-600 mb-3">
                {employee.email}
              </p>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                {employee.role}
              </span>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default Employees;