import { useCallback, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BasePage from "./components/BasePage";
import ROUTES from "./routes";
import { UserContextProvider, useUserContext } from "./contexts/UserContext";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import IUser from "./domains/user";

const providerConfig = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN || "",
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || "",
  redirectUri: window.location.origin,
};

function RouteList() {
  const { user, isLoading } = useAuth0<IUser>();
  const { setUserData, userData } = useUserContext();

  useEffect(() => {
    user && setUserData(user);
  }, [setUserData, user]);

  return (
    <>
      {isLoading ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          loading...
        </div>
      ) : (
        Object.values(ROUTES)
          .filter(
            (r) =>
              (r.type === "GUEST" && !userData) ||
              (r.type === "PRIVATE" && userData) ||
              r.type === "PUBLIC"
          )
          .map((route) => (
            <Route
              key={route.path}
              exact={route.exact}
              path={route.path}
              // eslint-disable-next-line react/jsx-no-bind
              render={(props) => {
                const Page = route.component;
                return <Page {...props} />;
              }}
            />
          ))
      )}
    </>
  );
}
function App() {
  const renderNotFound = useCallback(() => <h1>Not Found!</h1>, []);

  return (
    <BrowserRouter>
      <Auth0Provider {...providerConfig}>
        <UserContextProvider>
          <BasePage>
            <Switch>
              <RouteList />
              <Route component={renderNotFound} />
            </Switch>
          </BasePage>
        </UserContextProvider>
      </Auth0Provider>
    </BrowserRouter>
  );
}

export default App;
