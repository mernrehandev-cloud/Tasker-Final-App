import { useSelector } from "react-redux";
import "../profile/profile.css";
import { useEffect, useState } from "react";

function ProfileIcon({ userid }) {
  const loginArr = useSelector((state) => state.login.token);
  const currentUser =
    loginArr.length > 0 ? loginArr[loginArr.length - 1] : null;

  const token = currentUser ? currentUser.token : null;
  // const userid = currentUser ? currentUser.user_id : null;

  // const [userdata, setuserdata] = useState(false);

  // async function FetchUser() {
  //   try {
  //     const res = await fetch(`${BEurl}/users/${currentUser.user_id}`);
  //     if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

  //     const data = await res.json();
  //     setuserdata(data);
  //   } catch (error) {
  //     console.log("Error fetching data:");
  //   }
  // }

  // useEffect(() => {
  // if (token && userid) {
  // console.log(userdata.Image);
  // FetchUser();
  //   }
  // }, [token, userid]);

  return (
    <>
      {userid ? (
        <img className="user-img" src={`/images/${userid.Image}`} alt="user" />
      ) : (
        <div className="user-img">
          <img
            className="w-100 rounded-circle"
            src="/images/default-user.jpg"
            alt="user"
          />
        </div>
      )}
    </>
  );
}

export default ProfileIcon;
