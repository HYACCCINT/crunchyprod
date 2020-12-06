import React from 'react';
import { Route, BrowserRouter as Router, useHistory } from 'react-router-dom';
import { Provider as UrqlProvider } from 'urql';
import { urqlClient } from './query';
import { UserContextProvider } from './common/user-context';
import {FormManage, FormDisplay, FormUpload, FormFill, DashBoard, ErrorBoundary, Login} from './routes';
import {Header, HeaderName, HeaderMenuItem, HeaderNavigation} from 'carbon-components-react'
import { ProtectedRoute } from './common/protected-route';
import {HeaderMenuItemLink} from './common/header-menu-item-link'

import './App.css';

export const App = () => {
  const history = useHistory();
  return (
  <Router>
    <ErrorBoundary>
      <UserContextProvider>
        <div className='App'>
          <Route path='/after-login' component={() => {
          const redirectUrl = window.localStorage.getItem('redirectUrl');
          window.localStorage.removeItem('redirectUrl');
          window.location.href = redirectUrl || '/';
          return null;
        }} />
          <UrqlProvider value={urqlClient}>
            <Header aria-label="Crunchy coders">
              <HeaderName href="#" prefix="SDC">
                [Forms]
              </HeaderName>
              <HeaderNavigation aria-label="Crunchy">
              <HeaderMenuItemLink history={history} to='/manage'>Manage</HeaderMenuItemLink>
              <HeaderMenuItemLink history={history} to='/fill'>Fill</HeaderMenuItemLink>
              </HeaderNavigation>
            </Header>
            <Route path={'/'} component={Login} exact/>
            <ProtectedRoute path={'/manage'} component={FormManage} exact/>
            <ProtectedRoute path='/upload-form/:action' component={FormUpload} exact/>
            <ProtectedRoute path='/formdisplay/:procedureId' component={FormDisplay} exact/>
            <ProtectedRoute path='/formfill/:formID' component={FormFill}/>
            <ProtectedRoute path='/fill' component={DashBoard} exact/>
          </UrqlProvider>
        </div>
      </UserContextProvider>
    </ErrorBoundary>
  </Router>);
}
export default App;
