import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import Welcome from "./features/auth/Welcome";
import RequireAuth from "./features/auth/RequireAuth";
import UserList from "./features/users/UserList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="userlist" element={<UserList />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
