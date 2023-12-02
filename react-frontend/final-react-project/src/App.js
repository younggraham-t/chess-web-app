// import logo from './logo.svg';
import './App.css';
import UserPage from './components/pages/user-page/UserPage';
import HomePage from './components/pages/home-page/HomePage';
import './styles/styles.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';


function App() {
  return (
    <>
        <Router>
          {/* should be home page but that isn't implented */}
          <UserPage/>
          <Routes>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/user" component={UserPage} />
            {/* <Route exact path="/chess" component={ChessPage} /> */}
            
            
            </Routes>
        </Router>
  

    </>
  );
}

export default App;
