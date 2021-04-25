import "Dashboard.scss";
import { useSelector } from "react-redux";
import { getDashboard } from "../../redux/selectors";

const Dashboard = () => {
  const { usersCount, profilesCount, profilesOver18 } = useSelector(
    getDashboard
  );
  return (
    <div className="dashboard">
      <section className="dashboard__section">
        <h3 className="dashboard__section--name">Всего пользователей:</h3>
        <p className="dashboard__section--value">{usersCount}</p>
      </section>
      <section className="dashboard__section">
        <h3 className="dashboard__section--name">Всего профилей:</h3>
        <p className="dashboard__section--value">{profilesCount}</p>
      </section>
      <section className="dashboard__section">
        <h3 className="dashboard__section--name">Профилей старше 18 лет:</h3>
        <p className="dashboard__section--value">{profilesOver18}</p>
      </section>
    </div>
  );
};

export default Dashboard;
