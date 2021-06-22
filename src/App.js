import { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';

import { auth, createUserProfileDocument } from './firebase/Firebase';
import Header from './components/Header/Header';

import HomePage from './pages/HomePage/HomePage';
import ShopPage from './pages/ShopPage/ShopPage';
import VerificationPage from './pages/VerificationPage/VerificationPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';

import CurrentUserContext from './contexts/current-user/current-user.context';


class App extends Component {
  state = {
    currentUser: null
  };

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({ currentUser: {
            id: snapShot.id,
            ...snapShot.data()
          }})
        });
      } else {
        this.setState({ currentUser: userAuth });
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return(
      <div>
        <CurrentUserContext.Provider value={ this.state.currentUser }>
          <Header />
        </CurrentUserContext.Provider>
        <Switch>
          <Route exact path='/' component={ HomePage } />
          <Route path='/shop' component={ ShopPage } />
          <Route exact path='/checkout' component={ CheckoutPage } />
          <Route exact path='/signin' render={() => this.state.currentUser ? (<Redirect to='/' />) : (<VerificationPage />)} 
        />
        </Switch>
      </div>
    );
  }
}

export default App;
