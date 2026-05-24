import { useEffect, useState } from 'react';

import API from '../api/axios';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
const AddLead = () => {

  const navigate = useNavigate();
  const user = JSON.parse(
  localStorage.getItem('user')
);
const [successMessage, setSuccessMessage] =
  useState('');
  const [employees, setEmployees] =
    useState([]);

  const [formData, setFormData] =
    useState({
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      expectedRevenue: '',
      assignedTo: ''
    });

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

  const changeHandler = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      await API.post('/leads', {
  ...formData,

  assignedTo:
    user.role === 'employee'
      ? user.id
      : formData.assignedTo
});
    setSuccessMessage(
      'Lead added successfully'
    );

    setFormData({
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      expectedRevenue: '',
      assignedTo: ''
    });

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      <Sidebar />
      <Navbar />

      <div className="ml-64 p-6">

        <div className="bg-white rounded-xl shadow p-6 max-w-2xl">

          <h1 className="text-3xl font-bold mb-6">
            Add Lead
          </h1>
        {
        successMessage && (

            <div className="
            bg-green-100
            text-green-700
            p-3
            rounded-lg
            mb-4
            ">
            {successMessage}
            </div>

        )
        }

          <form
            onSubmit={submitHandler}
            className="grid gap-4"
          >

            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              className="border p-3 rounded-lg"
              onChange={changeHandler}
            />

            <input
              type="text"
              name="contactPerson"
              placeholder="Contact Person"
              value={formData.contactPerson}
              className="border p-3 rounded-lg"
              onChange={changeHandler}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              className="border p-3 rounded-lg"
              onChange={changeHandler}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              className="border p-3 rounded-lg"
              onChange={changeHandler}
            />

            <input
              type="number"
              name="expectedRevenue"
              placeholder="Expected Revenue"
              value={formData.expectedRevenue}
              className="border p-3 rounded-lg"
              onChange={changeHandler}
            />
            {user.role==='admin' && (
            <select
              name="assignedTo"
                value={formData.assignedTo}
              className="border p-3 rounded-lg"
              onChange={changeHandler}
            >

              <option value="">
                Assign Employee
              </option>

              {
                employees.map((employee) => (

                  <option
                    key={employee._id}
                    value={employee._id}
                  >
                    {employee.name}
                  </option>

                ))
              }

            </select>
            )}
            <button className="bg-blue-600 text-white py-3 rounded-lg">
              Create Lead
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default AddLead;