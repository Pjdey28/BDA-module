import { Link } from 'react-router-dom';
const user = JSON.parse(
  localStorage.getItem('user')
);
const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-slate-900 text-white fixed p-5">

      <h1 className="text-3xl font-bold mb-10">
        BDA CRM
      </h1>

      <div className="flex flex-col gap-4">
        {
        user?.role === 'admin' && (
            <>
            <Link to="/dashboard"
            className="hover:bg-slate-800 p-3 rounded">
                Dashboard
            </Link>

            <Link to="/leads"
            className="hover:bg-slate-800 p-3 rounded">
                Leads
            </Link>

            <Link to="/pipeline"
            className="hover:bg-slate-800 p-3 rounded">
                Pipeline
            </Link>
            <Link
          to="/add-lead"
          className="hover:bg-slate-800 p-3 rounded"
        >
          Add Lead
        </Link>

            <Link to="/followups"
            className="hover:bg-slate-800 p-3 rounded">
                Follow Ups
            </Link>

            <Link to="/employees"
            className="hover:bg-slate-800 p-3 rounded">
                Employees
            </Link>

            <Link to="/create-employee"
            className="hover:bg-slate-800 p-3 rounded">
                Create Employee
            </Link>

            <Link to="/performance"
            className="hover:bg-slate-800 p-3 rounded">
                Performance
            </Link>
            </>
        )
        }
                {
        user?.role === 'employee' && (
            <>
            <Link to="/my-leads"
            className="hover:bg-slate-800 p-3 rounded">
                My Leads
            </Link>
            <Link to="/my-performance"
            className="hover:bg-slate-800 p-3 rounded">
                My Performance
            </Link>

            <Link to="/pipeline"
            className="hover:bg-slate-800 p-3 rounded">
                Sales Board
            </Link>

            <Link to="/followups"
            className="hover:bg-slate-800 p-3 rounded">
                Follow Ups
            </Link>
             <Link
          to="/add-lead"
          className="hover:bg-slate-800 p-3 rounded"
        >
          Add Lead
        </Link>
            </>
        )
        }
      </div>

    </div>
  );
};

export default Sidebar;