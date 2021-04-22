import { connect } from "react-redux";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { PagesSwitch } from "./switches";
import {} from "../redux/actionCreators";

const Main = ({ fetchDashboardInfo, refreshToken }) => {
  useEffect(() => {
    fetchDashboardInfo();
    let fetchInterval = setInterval(fetchDashboardInfo, 1000 * 60 * 3);
    return () => {
      clearInterval(fetchInterval);
    };
  }, [fetchDashboardInfo]);

  return (
    <div className="app">
      <Header />
      <div className="body">
        <PagesSwitch />
      </div>
      <Footer />
    </div>
  );
};

const mapState = (state) => {
  const { sorting, order, list, isLoading, message } = state.films;
  const films = sorting ? sorting(list, order) : list;
  return { films, order, sorting, isLoading, message };
};

const mapDispatch = {
  fetchFilms,
  postFilm,
  postFilmsFile: postFile,
  setOrder,
  setSorting,
};

export default Main;
