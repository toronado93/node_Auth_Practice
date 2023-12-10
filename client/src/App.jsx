import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import "./App.css";
import Public from "./components/Public";
import Login from "./components/Login";
import PrivateRoute from "./middleware/PrivateRoute";
import Welcome from "./components/Welcome";
import UserDataFetcherComponent from "./components/UserDataFetcherComponent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout></Layout>}>
        <Route index element={<Public></Public>}></Route>
        <Route path="login" element={<Login></Login>}></Route>

        {/* Protected routes */}
        <Route element={<PrivateRoute></PrivateRoute>}>
          <Route path="welcome" element={<Welcome></Welcome>}></Route>
          <Route
            path="userinfo"
            element={<UserDataFetcherComponent></UserDataFetcherComponent>}
          ></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
