import { Home } from "../pages/Home";
import { Users } from "../pages/Users";
export const routes = [
  {
    path: "/",
    name: "בית",
    public: true,
    component: <Users />,
  },
  {
    path: "/users",
    name: "משתמשים",
    public: true,
    component: <Users />,
  },
];
