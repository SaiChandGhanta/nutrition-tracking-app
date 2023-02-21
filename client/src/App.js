import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar/Navbar.js';
import Auth from './components/Auth/Auth.js';

import Profile from './components/Profile/Profile.js';
import SearchBar from './components/SearchFood/SearchBars';
import RegisterIntake from './components/RegisterIntakes/RegisterIntakes';
import EnhancedTable from './components/IntakeHistorys/IntakeHistorys';
import ActivityEnhancedTable from './components/ActivityHistory/ActivityHistory.js';
import Activity from './components/Activity/Activity'
import Charts from './components/Dashboard/Charts.js';

class App extends React.Component {

  render() {
    return (
      <Container maxWidth="false">
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/auth" element={<Auth />} />
            <Route exact path='/diet' element={<><SearchBar /><EnhancedTable /></>} />
            <Route exact path="/activities" element={<><Activity /><ActivityEnhancedTable /></>} />
            <Route exact path="/add-intake/:id" element={<RegisterIntake />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path='/dashboard' element={<Charts />} />
          </Routes>
        </Router>
      </Container>
    )
  }
}

export default App;
