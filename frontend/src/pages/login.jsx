import { useEffect, useState } from "react";
import LoginForm from "../components/login/loginform";
import SecHeader from "../components/secondaryheader/secheader";

export default function Login({ BEurl, users }) {
    const [keyforut, setkeyforut] = useState(null);

    useEffect(() => {
        if (users) {
            setkeyforut("u");
        }
    }, []);

    return (
        <>
            <SecHeader heading={"Login Page"} icon_nav="fa fa-right-to-bracket" total={users.length} keyforut={keyforut} />
            <LoginForm BEurl={BEurl} />
        </>
    )
}