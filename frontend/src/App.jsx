import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Navcomp from "./components/navbar/navbar";
import "./App.css";
import Footermain from "./components/footer/footer";
import Fav from "./pages/fav";
import Work from "./pages/work";
import Personal from "./pages/personal";
import Learning from "./pages/learning";
import { useEffect, useState } from "react";
import Profile from "./pages/profile";
import NotFound from "./components/notfound/notfound";
import ToastAlert from "./components/toastalert/toast";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { removelogin } from "./reduxslices/loginslice";
import { settitle } from "./reduxslices/titleslice";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [category, setcategory] = useState([]);
  const [error, seterror] = useState(null);
  const [users, setUsers] = useState([]);

  let BEurl = import.meta.env.VITE_BackendURI;
  const loginArr = useSelector((state) => state.login.token);
  const currentUser =
    loginArr.length > 0 ? loginArr[loginArr.length - 1] : null;

  const token = currentUser ? currentUser.token : null;
  const userid = currentUser ? currentUser.user_id : null;

  const [maintoast, setmaintoast] = useState({ show: false });

  const titledispatch = useDispatch();
  const titles = useSelector((state) => state.title.value);

  async function FetchTasks() {
    try {
      const errormesg = "Cant run get request of Tasks";

      setisLoading(true);
      const res = await fetch(`${BEurl}/tasks`, {
        headers: {
          "X-Auth-Token": token,
        },
      });
      const data = await res.json();

      if (res) {
        if (data.length > 0) {
          setTasks(data);
        }
      }

      if (data.message === errormesg) {
        return seterror(data.message);
      }
    } catch (error) {
      console.log("Error fetching data:");
      seterror(error.message || "Failed to Fetch Data");
    } finally {
      setTimeout(() => {
        setisLoading(false);
      }, 1000);
    }
  }

  async function FetchonUpdate() {
    try {
      // setisLoading(true);
      const res = await fetch(`${BEurl}/tasks`, {
        headers: {
          "X-Auth-Token": token,
        },
      });

      if (res) {
        const data = await res.json();
        if (data.length > 0) {
          setTasks(data);
        }
      }
    } catch (error) {
      console.log("Error fetching data:");
      seterror(error.message || "Failed to Fetch Data");
    }
  }

  async function FetchUser() {
    try {
      const res = await fetch(`${BEurl}/users`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      if (data.length > 0) {
        setUsers(data);
      }
      // console.log(`data: ${data[0].Image}`);
      // console.log(`users: ${users[0].Image}`);
    } catch (error) {
      console.log("Error fetching data:");
      seterror(error.message || "Failed to Fetch Data");
    }
  }

  async function FetchCategory() {
    try {
      const res = await fetch(`${BEurl}/task_category`);
      if (res) {
        const data = await res.json();
        if (data.length > 0) {
          setcategory(data);
        }
      } else {
        alert("Failed to Fetch Category");
      }
    } catch (error) {
      seterror(error.message || "Failed to Fetch Data");
    }
  }

  async function deltask(task) {
    try {
      const req = await fetch(`${BEurl}/tasks/${task._id}`, {
        method: "DELETE",
        headers: {
          "X-Auth-Token": token,
        },
      });

      console.log("show alert of success");
      setmaintoast({
        show: true,
        header_toast: "Successfully Deleted Task",
        text: `${task.Title}`,
        bg: "success",
        status: "circle-check",
      });
      FetchTasks();
    } catch (error) {
      console.log(`show alert of error: ${error.message}`);
    }
  }

  const logindispatch = useDispatch();

  useEffect(() => {
    if (token) {
      const decodetoken = jwtDecode(token);
      const timenow = Date.now() / 1000;

      if (decodetoken.exp < timenow) {
        logindispatch(removelogin());
      } else {
        document.title = "Tasker App | Dashboard";
        FetchTasks();
        FetchUser();
      }
    } else {
      setTasks([]);
    }
  }, [token]);

  return (
    <>
      <div className="bg-light app-container">
        <Navcomp
          FetchTasks={FetchTasks}
          srcimg="/images/logo.png"
          users={users}
          FetchCategory={FetchCategory}
          category={category}
          BEurl={BEurl}
          FetchUser={FetchUser}
        />

        <main style={{ flex: 1 }}>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  BEurl={BEurl}
                  tasks={tasks}
                  FetchCategory={FetchCategory}
                  category={category}
                  FetchTasks={FetchTasks}
                  users={users}
                  isLoading={isLoading}
                  error={error}
                  setmaintoast={setmaintoast}
                  FetchonUpdate={FetchonUpdate}
                  deltask={deltask}
                />
              }
            />
            <Route
              path="/fav"
              element={
                <Fav
                  BEurl={BEurl}
                  tasks={tasks}
                  FetchCategory={FetchCategory}
                  category={category}
                  FetchTasks={FetchTasks}
                  users={users}
                  setmaintoast={setmaintoast}
                  isLoading={isLoading}
                  error={error}
                  FetchonUpdate={FetchonUpdate}
                  deltask={deltask}
                />
              }
            />
            <Route
              path="/work"
              element={
                <Work
                  BEurl={BEurl}
                  tasks={tasks}
                  FetchCategory={FetchCategory}
                  category={category}
                  FetchTasks={FetchTasks}
                  users={users}
                  isLoading={isLoading}
                  error={error}
                  setmaintoast={setmaintoast}
                  FetchonUpdate={FetchonUpdate}
                  deltask={deltask}
                />
              }
            />
            <Route
              path="/personal"
              element={
                <Personal
                  BEurl={BEurl}
                  tasks={tasks}
                  FetchCategory={FetchCategory}
                  category={category}
                  FetchTasks={FetchTasks}
                  users={users}
                  isLoading={isLoading}
                  error={error}
                  setmaintoast={setmaintoast}
                  FetchonUpdate={FetchonUpdate}
                  deltask={deltask}
                />
              }
            />
            <Route
              path="/learning"
              element={
                <Learning
                  BEurl={BEurl}
                  tasks={tasks}
                  FetchCategory={FetchCategory}
                  category={category}
                  FetchTasks={FetchTasks}
                  users={users}
                  isLoading={isLoading}
                  error={error}
                  setmaintoast={setmaintoast}
                  FetchonUpdate={FetchonUpdate}
                  deltask={deltask}
                />
              }
            />
            {/* <Route path="/login" element={<Login BEurl={BEurl} users={users} />} />*/}

            <Route
              path="/profile"
              element={
                <Profile users={users} FetchUser={FetchUser} BEurl={BEurl} />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footermain />
        <ToastAlert
          show={maintoast.show}
          onClose={() => setmaintoast({ ...maintoast, show: false })}
          header_toast={maintoast.header_toast}
          bg={maintoast.bg}
          status={maintoast.status}
          text={maintoast.text}
        />
      </div>
    </>
  );
}

export default App;
