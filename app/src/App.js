import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import PageLoginSubscribe from './PageLoginSubscribe';
import Home from './Home';
import Profile from './PageProfile';
import NotFound from './NotFound';
import { grey } from '@mui/material/colors';
import FindingFriends from './PageFindingFriends';


import {Auth} from "./util/isAuthApollo"




const bg_grey = grey[50]; // really light grey




const App=() => {


  const user=Auth();
  console.log(user.id);
  
  return ( 
     
    <Router>
      <div className="App" styles={{ backgroundColor: bg_grey }}>
        <Switch>
          <Route exact path="/">
            <PageLoginSubscribe />
          </Route>
          <div className="Only_when_logged" sx={{mb: 1,  display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}} >
            <Header />
            <Switch>
              <Route path="/home">
                < Home />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/finding">
                <FindingFriends />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
              <Footer sx={{ alignSelf: 'flex-end' }} />
          </div>
        </Switch>
      </div>
    </Router>
  
  );
}

export default App;
