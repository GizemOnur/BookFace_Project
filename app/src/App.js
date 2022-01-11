import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import PageLoginSubscribe from './PageLoginSubscribe';
import Home from './Home';
import Profile from './PageProfile';
import NotFound from './NotFound';
import { grey } from '@mui/material/colors';
import FindingFriends from './PageFindingFriends';
import {ApolloProvider} from '@apollo/client';
import {client} from './util/createApolloClient'


const bg_grey = grey[50]; // really light grey


function App() {
  return (
    <ApolloProvider client={client}> 
    <Router>
      <div className="App" styles={{ backgroundColor: bg_grey }}>
        <Switch>
          <Route exact path="/">
            <PageLoginSubscribe />
          </Route>
          <div className="Only_when_logged" sx={{ minHeigth: "100%", mb: 1,  position: 'relative'}} >
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
                <Footer />
            </div>
        </Switch>
      </div>
    </Router>
    </ApolloProvider>
  );
}

export default App;
