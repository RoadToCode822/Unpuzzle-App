import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles/';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
// Components
import Navbar from './components/layout/Navbar';
import AuthRoute from './util/AuthRoute';
// Pages
// import home from './pages/home';
import login from './pages/Login';
import signup from './pages/Signup';
import Home from './pages/Home';
import user from './pages/User';
import tutoring from './pages/Tutoring';
import gradeschool from './pages/GradeSchool';
import computerprogramming from './pages/ComputerProgramming';
import digitalskills from './pages/DigitalSkills';
import PuzzleWorld from './pages/PuzzleWorld';
import PuzzleTweet from './pages/PuzzleTweet';
import innovationineducation from './pages/InnovationInEducation';
import bookasession from './pages/BookASession';
import Footer from './components/layout/Footer';

import axios from 'axios';

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL = 
  'https://us-east1-unpuzzle-ad500.cloudfunctions.net/api';

const token = localStorage.FirebaseIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  const [value, setValue] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  

  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar value={value} setValue={setValue} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/tutoring" component={tutoring} />
            <Route exact path="/gradeschool" component={gradeschool} />
            <Route exact path="/computerprogramming" component={computerprogramming} />
            <Route exact path="/digitalskills" component={digitalskills} />
            <Route exact path="/puzzleworld" component={PuzzleWorld} />
            <Route exact path="/puzzletweet" component={PuzzleTweet} />
            <Route exact path="/innovationineducation" component={innovationineducation} />
            <Route exact path="/bookasession" component={bookasession} />
            <AuthRoute exact path="/login" component={login} />
            <AuthRoute exact path="/signup" component={signup} />
            <Route exact path="/users/:handle" component={user} />
            <Route exact path="/users/:handle/puzzlepiece/:puzzlepieceId" component={user} />
          </Switch>
          <Footer value={value} setValue={setValue} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
