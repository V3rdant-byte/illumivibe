import { MainPage } from './views/MainPage/MainPage';
import { DashboardPage } from './views/DashboardPage/DashboardPage';
import { CanvasPage } from './views/CanvasPage/CanvasPage';
import { DevicePage } from './views/DevicePage/DevicePage';
import { MusicPage } from './views/MusicPage/MusicPage';
import { Navbar } from './components/Navbar/Navbar';
import { useSelector } from 'react-redux';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  const state = useSelector((state) => state);
  const loggedIn = state.account === undefined ? false : state.account.loggedIn;

  return (
    <Router>
      <div className='App'>
        {loggedIn ? <Navbar /> : null}
        <Routes>
          <Route exact path="/" element = {<MainPage />} />
          <Route exact path="/dashboard" element = { loggedIn ? <DashboardPage /> : <MainPage /> } />
          <Route exact path="/canvas" element = { loggedIn ? <CanvasPage /> : <MainPage /> } />
          <Route exact path="/device" element = { loggedIn ? <DevicePage /> : <MainPage /> } />
          <Route exact path="/music" element = { loggedIn ? <MusicPage /> : <MainPage /> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
