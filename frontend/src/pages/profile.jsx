import { useEffect, useState } from "react";
import Loader from "../components/loader/loader";
import ProfileData from "../components/profile/profiledata";
import SecHeader from "../components/secondaryheader/secheader";
import { Container } from "react-bootstrap";
import SecHeader2 from "../components/secondaryheader/secheader2";

export default function Profile({ users, FetchUser, BEurl }) {
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true);

    setTimeout(() => {
      setisLoading(false);
    }, 700);
  }, []);

  return (
    <>
      <Container fluid>
        <SecHeader2 heading={"Profile"} icon_nav="fa fa-user" />
        {isLoading ? (
          <Loader />
        ) : (
          <ProfileData users={users} FetchUser={FetchUser} BEurl={BEurl} />
        )}
      </Container>
    </>
  );
}
