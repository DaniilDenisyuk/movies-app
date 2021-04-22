import "Dashboard.scss";
import { connect } from "react-redux";

const Dashboard = ({
  usersCount,
  profilesCount,
  profilesOver18,
}) => {
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

const mapState = (state) => {
  const { usersCount, profilesCount, profilesOver18 } = state.dashboard;
  return { usersCount, profilesCount, profilesOver18 };
};
const mapDispatch = {};

export default connect(mapState)(Dashboard);
