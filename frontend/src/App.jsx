import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AddUser, Home, Login } from "./routes";
import { useSelector } from "react-redux";
import { ExaminorHome, Loader } from "./components";
import { useEffect, useContext, useState } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useSelector((state) => state.user);
  const { getUser, getPapers } = useContext(Context);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user) {
      getUser();
      getPapers(setLoading);
    } else {
      setLoading(false);
    }
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Router>
          <Routes>
            {!user ? (
              <>
                {/* <Route path="/" exact element={<Login />} /> */}
                <Route path="/" exact element={<ExaminorHome />} />
              </>
            ) : (
              <>
                <Route path="/" exact element={<Home />} />
              </>
            )}
            <Route path="/login" exact element={<Login />} />
            {user && user.role === "admin" && (
              <>
                <Route path="/adduser" exact element={<AddUser />} />
              </>
            )}
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
