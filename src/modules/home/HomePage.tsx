import { FC, useCallback, useEffect, useState } from "react";
import classes from "./HomePage.module.scss";
import { useUserContext } from "../../contexts/UserContext";
import { useAuth0 } from "@auth0/auth0-react";
import usePopulationRepositories from "../../repositories/PopulationRepository";
import IPopulation from "../../domains/population";

const HomePage: FC = () => {
  const { logout } = useAuth0();
  const { userData, deleteUserData } = useUserContext();
  const { getAll } = usePopulationRepositories();
  const [data, setData] = useState<IPopulation[]>([]);

  const handleLogout = useCallback(() => {
    logout({ returnTo: undefined });
    deleteUserData();
  }, [deleteUserData, logout]);

  const handleCheck = useCallback(async () => {
    const res = await getAll();
    setData(res);
  }, [getAll]);

  return (
    <div className={classes.root}>
      <div className={classes.head}>
        <img src={userData?.picture} alt="" className={classes.picture} />
        <div className={classes.title}>
          <h1>{userData?.name}</h1>
          <button
            type="button"
            className={classes.logoutButton}
            onClick={handleLogout}
          >
            logout
          </button>
        </div>
      </div>
      <div className={classes.desc}>
        <div>
          <span className={classes.descriptor}>Nickname</span>{" "}
          {userData?.nickname}
        </div>
        <div>
          <span className={classes.descriptor}>Email</span> {userData?.email}
        </div>
        <div>
          <span className={classes.descriptor}>Job Title</span>{" "}
          {userData?.job_title}
        </div>
      </div>
      <div className={classes.content}>
        {userData?.job_title === "manager" && !data.length && (
          <button
            type="button"
            className={classes.checkButton}
            onClick={handleCheck}
          >
            Check
          </button>
        )}
        {!!data.length && (
          <table className={classes.table}>
            <thead>
              <tr>
                <th>Id Nation</th>
                <th>Nation</th>
                <th>Year</th>
                <th>Population</th>
              </tr>
            </thead>
            <tbody>
              {data.map((p) => (
                <tr key={`${p.year}-${p.nation}`}>
                  <td>{p.idNation}</td>
                  <td>{p.nation}</td>
                  <td>{p.year}</td>
                  <td>{p.population}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default HomePage;
