import { useEffect, useState } from "react";
import CardList from "../components/cardlist/cardlist";
import SecHeader from "../components/secondaryheader/secheader";
import "./home.css";
import { Button, Container } from "react-bootstrap";
import Loader from "../components/loader/loader";
import ErrorComp from "../components/error/error";
import ToastAlert from "../components/toastalert/toast";
import NotFound2 from "../components/notfound/notfound2";
import { useDispatch, useSelector } from "react-redux";
import { addcategory } from "../reduxslices/categoryslice";
import { settitle } from "../reduxslices/titleslice";

function Home({
  tasks,
  FetchTasks,
  isLoading,
  error,
  setmaintoast,
  FetchonUpdate,
  BEurl,
  users,
  deltask,
}) {
  // const [isLoading, setisLoading] = useState(false);
  // const [seltask, setseltask] = useState({});

  const loginArr = useSelector((state) => state.login.token);
  const currentUser =
    loginArr.length > 0 ? loginArr[loginArr.length - 1] : null;

  const token = currentUser ? currentUser.token : null;
  const userid = currentUser ? currentUser.user_id : null;

  const titledispatch = useDispatch();

  useEffect(() => {
    document.title = "Tasker App | Home";
    FetchTasks();
    console.log(tasks.length);
  }, []);

  return (
    <>
      <Container fluid>
        <SecHeader
          FetchTasks={FetchTasks}
          heading={"All Tasks"}
          users={users}
          total={tasks.length}
          icon_nav="fa fa-list-ul"
          BEurl={BEurl}
        />
        {isLoading ? (
          <Loader />
        ) : error ? (
          <ErrorComp BEurl={BEurl} error={error} />
        ) : tasks.length == 0 ? (
          <NotFound2 FetchTasks={FetchTasks} BEurl={BEurl} />
        ) : (
          <CardList
            tasks={tasks}
            BEurl={BEurl}
            onDelete={deltask}
            FetchTasks={FetchTasks}
            FetchonUpdate={FetchonUpdate}
            setmaintoast={setmaintoast}
          />
        )}
      </Container>
    </>
  );
}

export default Home;
