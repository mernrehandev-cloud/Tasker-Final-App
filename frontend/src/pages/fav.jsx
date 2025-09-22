import { useEffect, useState } from "react";
import CardList from "../components/cardlist/cardlist";
import Loader from "../components/loader/loader";
import SecHeader from "../components/secondaryheader/secheader";
import "./home.css";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorComp from "../components/error/error";
import NotFound2 from "../components/notfound/notfound2";
import ToastAlert from "../components/toastalert/toast";
import { settitle } from "../reduxslices/titleslice";

function Fav({
  tasks,
  FetchTasks,
  error,
  setmaintoast,
  FetchonUpdate,
  BEurl,
  users,
  deltask,
}) {
  const [favtasks, setfavTasks] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const titledispatch = useDispatch();

  useEffect(() => {
    setisLoading(true);
    let FavTasks = [];
    tasks.forEach((t) => {
      if (t.Category.Name === "Work") FavTasks.push(t);
    });

    setfavTasks(FavTasks);

    document.title = "Tasker App | Favourite";

    setTimeout(() => {
      setisLoading(false);
    }, 700);
  }, [tasks]);

  return (
    <>
      <Container fluid>
        <SecHeader
          heading={"Favourite"}
          total={favtasks.length}
          icon_nav="fa fa-bookmark"
        />
        {isLoading ? (
          <Loader />
        ) : error ? (
          <ErrorComp BEurl={BEurl} error={error} />
        ) : favtasks.length == 0 ? (
          <NotFound2 FetchTasks={FetchTasks} BEurl={BEurl} />
        ) : (
          <CardList
            tasks={favtasks}
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

export default Fav;
