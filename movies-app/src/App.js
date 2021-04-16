import "./App.scss";
import PagesSwitch from "./pages";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./redux/store";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <PagesSwitch />
      </Router>
    </Provider>
  );
}

export default App;
