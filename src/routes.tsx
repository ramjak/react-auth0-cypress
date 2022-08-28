import { useCallback } from "react";
import * as React from "react";
import {
  useHistory,
  Link as RouterLink,
  useRouteMatch,
  RouteComponentProps,
} from "react-router-dom";
import HomePage from "./modules/home/HomePage";
import IndexPage from "./modules/index/IndexPage";

export type routeType = "PUBLIC" | "PRIVATE" | "GUEST";

export interface IRoute {
  path: string;
  exact?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.FC<RouteComponentProps & any>;
  type: routeType;
}

export interface IRouteParams {
  home: undefined;
  homeUser: undefined;
}

const ROUTES: Record<keyof IRouteParams, IRoute> = {
  home: {
    path: "/",
    exact: true,
    component: IndexPage,
    type: "GUEST",
  },
  homeUser: {
    path: "/",
    exact: true,
    component: HomePage,
    type: "PRIVATE",
  },
};

const getPath = (route: IRoute, ...params: string[] | number[]) => {
  const wildCards = route.path.match(/(:[^\n/]+)/g) || [];
  if (wildCards.length < params.length) {
    throw new Error(
      `You have too many params for ${
        route.path
      }. Current params: ${params.join(",")}`
    );
  } else if (wildCards.length > params.length) {
    throw new Error(
      `You need to include enough param for ${
        route.path
      }. Current params: ${params.join(",")}`
    );
  }
  return wildCards.reduce(
    (acc, curr, i) => acc.replace(curr, params[i].toString()),
    route.path
  );
};

export const useNavigateTo = () => {
  const history = useHistory();
  return useCallback(
    (route: IRoute, ...params: string[] | number[]) => {
      const finalPath = getPath(route, ...params);
      return history.push(finalPath);
    },
    [history]
  );
};

export const useParams = <T,>() => {
  const { params } = useRouteMatch<T>();
  return params;
};

interface ILink {
  route: IRoute;
  params?: string[] | number[];
  children: React.ReactNode;
}

export const Link = (props: ILink) => {
  return (
    <RouterLink to={getPath(props.route, ...(props.params || []))}>
      {props.children}
    </RouterLink>
  );
};

export default ROUTES;
