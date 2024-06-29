import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.status === 200) {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="w-full bg-blue-500 text-white p-2 text-xl h-12 top-0 fixed">
      <nav className="flex justify-between items-center">
        {user.role === "admin" ? (
          <h1>ADMIN PORTAL</h1>
        ) : user.role === "examiner" ? (
          <h1>USER PORTAL</h1>
        ) : (
          <h1>INVI PORTAL</h1>
        )}
        <ul className="flex justify-around gap-4 items-center">
          <li>
            <Link to="/examiner" className="hover:text-gray-300">
              Examiners
            </Link>
          </li>
          <li>
            <Link to="/invigilator" className="hover:text-gray-300">
              Invigilator
            </Link>
          </li>
          <li>
            <button
              onClick={logout}
              className="bg-transparent hover:bg-blue-700 text-white font-semibold p-1 border border-white hover:border-transparent rounded"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
