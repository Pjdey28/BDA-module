import { useState } from 'react';

import API from '../api/axios';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const CreateEmployee = () => {

  const [formData, setFormData] =
    useState({
      name: '',
      email: '',
      password: ''
    });

  const changeHandler = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      await API.post('/auth/register', {
        ...formData,
        role: 'employee'
      });

      alert('Employee created');

      setFormData({
        name: '',
        email: '',
        password: ''
      });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      <Sidebar />
      <Navbar />

      <div className="ml-64 p-6">

        <div className="bg-white p-6 rounded-xl shadow max-w-xl">

          <h1 className="text-3xl font-bold mb-6">
            Create Employee
          </h1>

          <form
            onSubmit={submitHandler}
            className="grid gap-4"
          >

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={changeHandler}
              className="border p-3 rounded-lg"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={changeHandler}
              className="border p-3 rounded-lg"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={changeHandler}
              className="border p-3 rounded-lg"
            />

            <button className="bg-blue-600 text-white py-3 rounded-lg">
              Create Employee
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default CreateEmployee;