// import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Component/Dashboard";
import AddStudent from "./Component/AddStudent";
import StudentList from "./Component/StudentList";
import UpdateStudent from "./Component/UpdateStudent";
import AddFaculty from "./Component/AddFaculty";
import FacultyList from "./Component/FacultyList";
import UpdateFaculty from "./Component/UpdateFaculty";
import Signup from "./Component/Signup";
import Login from "./Component/Login";

const MyRouter = createBrowserRouter([
  { path: "/signup", Component: Signup },
  { path: "/login", Component: Login },
  {
    path: "dashboard",
    Component: Dashboard,
    children: [
      { path: "", Component: StudentList },
      { path: "addstudent", Component: AddStudent },
      { path: "studentlist", Component: StudentList },
      { path: "updatestudent", Component: UpdateStudent },
      { path: "addfaculty", Component: AddFaculty },
      { path: "facultylist", Component: FacultyList },
      { path: "updatefaculty", Component: UpdateFaculty },
    ],
  },
]);
const App = () => {
  return (
    <>
      <RouterProvider router={MyRouter} />
    </>
  );
};

export default App;
