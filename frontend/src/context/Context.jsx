import axios from "axios";
import { createContext } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../features/userSlice";
import { addPaper } from "../features/paperSlice";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/get", {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(addUser(res.data.user));
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getPapers = async (setLoading) => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/examiner/paper",
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        dispatch(addPaper(res.data.papers));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Context.Provider value={{ getUser, getPapers }}>
      {children}
    </Context.Provider>
  );
};