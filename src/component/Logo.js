import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "src/context/Auth";

const Logo = (props) => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  return (
    <>
      {auth?.userData?.userType === "Admin" ||
      auth?.userData?.userType === "Subadmin" ? (
        <img
          onClick={() => history.push("/dashboard")}
          src="/images/logo.png"
          alt="Logo"
          style={{ cursor: "pointer" }}
          {...props}
        />
      ) : (
        <img
          onClick={() => history.push("/explore")}
          src="/images/logo.png"
          alt="Logo"
          style={{ cursor: "pointer" }}
          {...props}
        />
      )}
    </>
  );
};

export default Logo;
