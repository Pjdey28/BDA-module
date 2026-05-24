import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  const logoutHandler = () => {

    localStorage.removeItem('token');

    navigate('/');
  };

  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6 ml-64">

      <h1 className="text-2xl font-bold">
        BDA CRM
      </h1>

      <button
        onClick={logoutHandler}
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>

    </div>
  );
};

export default Navbar;