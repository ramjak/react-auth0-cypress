import { FC } from "react";
import classes from "./IndexPage.module.scss";
import { useAuth0 } from "@auth0/auth0-react";
import IUser from "../../domains/user";

const IndexPage: FC = () => {
  const { loginWithRedirect } = useAuth0<IUser>();

  return (
    <div className={classes.root}>
      <button
        type="button"
        className={classes.loginButton}
        onClick={loginWithRedirect}
      >
        Login
      </button>
    </div>
  );
};

export default IndexPage;
