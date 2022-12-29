import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "src/context/Auth";
import { Link, useHistory } from "react-router-dom";

export default function AuthGuard(props) {
  const { children } = props;
  const history = useHistory();

  const auth = useContext(AuthContext);
  useEffect(() => {
    if (!auth.userLoggedIn) {
      history.push("/");

    }

  }, [auth.userLoggedIn])




  return <>{children}</>;
}
