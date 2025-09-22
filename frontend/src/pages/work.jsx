import { useEffect, useState } from "react";
import CardList from "../components/cardlist/cardlist";
import SecHeader from "../components/secondaryheader/secheader";
import "./home.css";
import Loader from "../components/loader/loader";
import { Container } from "react-bootstrap";
import ToastAlert from "../components/toastalert/toast";
import NotFound2 from "../components/notfound/notfound2";
import ErrorComp from "../components/error/error";
import { settitle } from "../reduxslices/titleslice";
import { useDispatch } from "react-redux";

function Work({
  tasks,
  FetchTasks,
  error,
  setmaintoast,
  FetchonUpdate,
  BEurl,
  users,
  deltask,
}) {
  const [worktasks, setworkTasks] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [toast, settoast] = useState({ show: false });

  const titledispatch = useDispatch();

  useEffect(() => {
    setisLoading(true);
    FetchTasks();
  }, []);

  useEffect(() => {
    setisLoading(true);
    let WorkTasks = [];

    tasks.forEach((t) => {
      if (t.Category.Name === "Work") WorkTasks.push(t);
    });

    setworkTasks(WorkTasks);

    document.title = "Tasker App | Work";

    setTimeout(() => {
      setisLoading(false);
    }, 700);
  }, [tasks]);

  return (
    <>
      <Container fluid>
        <SecHeader
          heading={"Work"}
          total={worktasks.length}
          icon_nav="fa fa-briefcase"
        />
        {isLoading ? (
          <Loader />
        ) : error ? (
          <ErrorComp BEurl={BEurl} error={error} />
        ) : worktasks.length == 0 ? (
          <NotFound2 FetchTasks={FetchTasks} BEurl={BEurl} />
        ) : (
          <CardList
            tasks={worktasks}
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

export default Work;
