import { Navigate } from 'react-router-dom';

const EmployeeRoute = ({ children }) => {

  const user = JSON.parse(
    localStorage.getItem('user')
  );

  if (!user || user.role !== 'employee') {
    return <Navigate to="/" />;
  }

  return children;
};

export default EmployeeRoute;