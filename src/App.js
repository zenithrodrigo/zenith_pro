import { Outlet } from "react-router-dom";
import Header from "./layout/header/Header";
import Footer from "./layout/footer/Footer";
import { useEffect } from "react";
import { useUser } from "./contexts/UserContext";

import "./app.css";
import "./output.css";

function App() {
  const { updateUser } = useUser();
  // useEffect(() => {
  //   updateUser();
  // }, [updateUser]);
  return (
    <>
      <Header />
      <div className="content">
        {/* <div className="background-image" /> */}

        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
