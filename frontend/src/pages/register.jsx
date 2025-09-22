import { useEffect, useState } from "react";
import SecHeader from "../components/secondaryheader/secheader";
import SignupForm from "../components/signup/signupform";

export default function Register({ BEurl, users }) {
    const [keyforut, setkeyforut] = useState(null);

    useEffect(() => {
        if (users) {
            setkeyforut("u");
        }
    }, []);
    return (
        <>
            <SecHeader heading={"Sign Up Page"} icon_nav="fa fa-user-plus" total={users.length} keyforut={keyforut} />
            <SignupForm BEurl={BEurl} />
        </>
    )
}