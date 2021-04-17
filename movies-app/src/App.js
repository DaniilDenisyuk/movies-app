import "./App.scss";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import PagesSwitch from "./switches/PagesSwitch";
import Header from "./components/Header";
import Footer from "./components/Footer";
import store from "./redux/store";

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="app">
        <Header />
        <div className="body">
          <PagesSwitch />
        </div>
        <Footer />
      </div>
    </Router>
  </Provider>
);

export default App;
