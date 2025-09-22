import { useEffect, useState } from "react";
import CardList from "../components/cardlist/cardlist";
import SecHeader from "../components/secondaryheader/secheader";
import "./home.css";
import Loader from "../components/loader/loader";
import { Container } from "react-bootstrap";
import ToastAlert from "../components/toastalert/toast";
import ErrorComp from "../components/error/error";
import NotFound2 from "../components/notfound/notfound2";
import { useDispatch } from "react-redux";
import { settitle } from "../reduxslices/titleslice";

function Learning({
  tasks,
  FetchTasks,
  error,
  setmaintoast,
  FetchonUpdate,
  BEurl,
  users,
  deltask,
}) {
  const [learntasks, setlearntasks] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [toast, settoast] = useState({ show: false });

  const titledispatch = useDispatch();

  useEffect(() => {
    setisLoading(true);
    FetchTasks();
  }, []);

  useEffect(() => {
    setisLoading(true);
    let Learntasks = [];

    tasks.forEach((t) => {
      if (t.Category.Name === "Learning") Learntasks.push(t);
    });

    setlearntasks(Learntasks);

    document.title = "Tasker App | Learning";

    setTimeout(() => {
      setisLoading(false);
    }, 700);
  }, [tasks]);

  return (
    <>
      <Container fluid>
        <SecHeader
          heading={"Learning"}
          total={learntasks.length}
          icon_nav="fa fa-graduation-cap"
        />
        {isLoading ? (
          <Loader />
        ) : error ? (
          <ErrorComp BEurl={BEurl} error={error} />
        ) : learntasks.length == 0 ? (
          <NotFound2 FetchTasks={FetchTasks} BEurl={BEurl} />
        ) : (
          <CardList
            tasks={learntasks}
            BEurl={BEurl}
            onDelete={deltask}
            FetchTasks={FetchTasks}
            FetchonUpdate={FetchonUpdate}
            setmaintoast={setmaintoast}
          />
        )}

        <ToastAlert
          show={toast.show}
          onClose={() => settoast({ ...toast, show: false })}
          header_toast={toast.header_toast}
          bg={toast.bg}
          status={toast.status}
          text={toast.text}
        />
      </Container>
    </>
  );
}

export default Learning;
