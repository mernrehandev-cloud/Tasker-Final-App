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

function Personal({
  tasks,
  FetchTasks,
  error,
  setmaintoast,
  FetchonUpdate,
  BEurl,
  users,
  deltask,
}) {
  const [perstasks, setpersTasks] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [toast, settoast] = useState({ show: false });

  const titledispatch = useDispatch();

  useEffect(() => {
    setisLoading(true);
    FetchTasks();
  }, []);

  useEffect(() => {
    setisLoading(true);
    let PerTasks = [];

    tasks.forEach((t) => {
      if (t.Category.Name === "Personal") PerTasks.push(t);
    });

    setpersTasks(PerTasks);

    document.title = "Tasker App | Personal";

    setTimeout(() => {
      setisLoading(false);
    }, 700);
  }, [tasks]);

  return (
    <>
      <Container fluid>
        <SecHeader
          heading={"Personal"}
          total={perstasks.length}
          icon_nav="fa fa-user"
        />
        {isLoading ? (
          <Loader />
        ) : error ? (
          <ErrorComp BEurl={BEurl} error={error} />
        ) : perstasks.length == 0 ? (
          <NotFound2 FetchTasks={FetchTasks} BEurl={BEurl} />
        ) : (
          <CardList
            tasks={perstasks}
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

export default Personal;
