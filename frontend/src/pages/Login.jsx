import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    const res = await API.post('/auth/login', formData);

    localStorage.setItem('token', res.data.token);

        localStorage.setItem(
        'user',
        JSON.stringify(res.data.user)
        );

        if (res.data.user.role === 'admin') {

        navigate('/dashboard');

        } else {

        navigate('/my-leads');

        };
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={submitHandler}
        className="bg-white p-8 rounded-xl shadow w-96"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setFormData({
            ...formData,
            email: e.target.value
          })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setFormData({
            ...formData,
            password: e.target.value
          })}
        />

        <button className="bg-blue-600 text-white w-full py-3 rounded">
          Login
        </button>

      </form>
        <p className="text-center text-gray-600 mt-4">
          Use email: admin@gmail.com and password: 123456 for admin access
          Use email: amit@gmail.com and password: 123456 for employee access
        </p>
    </div>
  );
};

export default Login;