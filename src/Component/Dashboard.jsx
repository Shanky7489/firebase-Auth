import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-[20%] bg-blue-600 p-4 text-white">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">
          Dashboard
        </h1>
        <nav className="space-y-4">
          <Link
            className="block text-lg font-medium text-white hover:bg-blue-500 px-4 py-2 rounded transition duration-200"
            to={"/dashboard/addstudent"}
          >
            Add Student
          </Link>
          <Link
            className="block text-lg font-medium text-white hover:bg-blue-500 px-4 py-2 rounded transition duration-200"
            to={"/dashboard/studentlist"}
          >
            Student List
          </Link>
          <Link
            className="block text-lg font-medium text-white hover:bg-blue-500 px-4 py-2 rounded transition duration-200"
            to={"/dashboard/addfaculty"}
          >
            Add Faculty
          </Link>
          <Link
            className="block text-lg font-medium text-white hover:bg-blue-500 px-4 py-2 rounded transition duration-200"
            to={"/dashboard/facultylist"}
          >
            Faculty List
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
