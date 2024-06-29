import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AddUser, Home, Login } from "./routes";
import { useSelector } from "react-redux";
import { Loader, UploadPaper } from "./components";
import { useEffect, useContext, useState } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useSelector((state) => state.user);
  const { getUser, getPapers } = useContext(Context);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUser();
    if (user) {
      getPapers(setLoading);
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Router>
          <Routes>
            {!user ? (
              <>
                <Route path="/" exact element={<Login />} />
              </>
            ) : (
              <>
                <Route path="/" exact element={<Home />} />
                {user && user.role === "admin" && (
                  <>
                    <Route path="/adduser" exact element={<AddUser />} />
                  </>
                )}
                {user && user.role === "examiner" && (
                  <>
                    <Route
                      path="/uploadpaper"
                      exact
                      element={<UploadPaper />}
                    />
                  </>
                )}
              </>
            )}
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
