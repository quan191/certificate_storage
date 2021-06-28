import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Web3 from 'web3';
import Certificate from './contracts/contracts/Certificate.json';
import Navbar1 from './layouts/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

// import Home from './containers/Home';
// import IssuerPage from './containers/IssuerPage';
// import RecipientPage from './containers/RecipientPage';
// import EventPage from './containers/EventPage';
import { Suspense, lazy } from 'react';

const Home = lazy(() => import('./containers/Home'));
const SignUpPage = lazy(() => import('./containers/SignUpPage'));
const IssuePage = lazy(() => import('./containers/IssuePage'));
const RecipientCert = lazy(() => import('./containers/RecipientCert'));


const web3 = new Web3(Web3.givenProvider);

function App() {

  return (
    <Router>
      <Navbar1 />
      <div className="container">

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/signup">
              <SignUpPage/>
            </Route>
            <Route path="/issuepage">
              <IssuePage/>
            </Route>
            <Route path="/RecipientCert">
              <RecipientCert />
            </Route>

          </Switch>
        </Suspense>

      </div>
    </Router>
  );
}

export default App;