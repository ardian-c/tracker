import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { Grid, Loader } from 'semantic-ui-react'

import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import DashboardPage from './components/pages/DashboardPage';
import ConfirmationPage from './components/pages/ConfirmationPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';

import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';

import { getCurrentUser } from './actions/auth';


class App extends React.Component {

    componentDidMount = () => {
        this.onInit(this.props);
    };

    onInit = props => props.getCurrentUser();

    render() {
        const { location, user, isAuthenticated } = this.props;

        return(
            <div>
                {!isAuthenticated ? (
                    <div className="main-container">
                        <Route location={location} path="/" exact component={HomePage} />
                        <Route
                            location={location}
                            path="/account/confirmation/:token"
                            exact
                            component={ConfirmationPage}
                        />
                        <GuestRoute location={location} path="/login" exact component={LoginPage} />
                        <GuestRoute
                            location={location}
                            path="/signup"
                            exact
                            component={SignupPage}
                        />
                        <GuestRoute
                            location={location}
                            path="/forgot_password"
                            exact
                            component={ForgotPasswordPage}
                        />
                        <GuestRoute
                            location={location}
                            path="/reset_password/:token"
                            exact
                            component={ResetPasswordPage}
                        />
                    </div>
                ) : (
                    <div>
                    {Object.getOwnPropertyNames(user).length === 0 ? (
                        <div className='loading-container'>
                            {/*
                            */}
                                        <style>{`
                              body > div,
                              body > div > div,
                              body > div > div > div.loading-container {
                                height: 100%;
                              }
                            `}</style>
                            <Grid
                                textAlign='center'
                                style={{ height: '100%' }}
                                verticalAlign='middle'
                            >
                                <Grid.Column style={{ maxWidth: 450 }}>
                                    <Loader />
                                </Grid.Column>
                            </Grid>
                        </div>
                    ) : (
                        <div className="main-container">
                            <Route location={location} path="/" exact component={HomePage} />
                            <Route
                                location={location}
                                path="/account/confirmation/:token"
                                exact
                                component={ConfirmationPage}
                            />
                            <GuestRoute location={location} path="/login" exact component={LoginPage} />
                            <GuestRoute
                                location={location}
                                path="/signup"
                                exact
                                component={SignupPage}
                            />
                            <GuestRoute
                                location={location}
                                path="/forgot_password"
                                exact
                                component={ForgotPasswordPage}
                            />
                            <GuestRoute
                                location={location}
                                path="/reset_password/:token"
                                exact
                                component={ResetPasswordPage}
                            />
                            <UserRoute
                                location={location}
                                path="/dashboard"
                                exact
                                component={DashboardPage}
                            />
                        </div>
                    )}
                    </div>
                )}
            </div>
        );
    }
}

// const App = ({ location, isAuthenticated }) => (
//     <div className="main-container">
//         {isAuthenticated && <TopNavigation />}
//         <Route location={location} path="/" exact component={HomePage} />
//         <Route
//             location={location}
//             path="/account/confirmation/:token"
//             exact
//             component={ConfirmationPage}
//         />
//         <GuestRoute location={location} path="/login" exact component={LoginPage} />
//         <GuestRoute
//             location={location}
//             path="/signup"
//             exact
//             component={SignupPage}
//         />
//         <GuestRoute
//             location={location}
//             path="/forgot_password"
//             exact
//             component={ForgotPasswordPage}
//         />
//         <GuestRoute
//             location={location}
//             path="/reset_password/:token"
//             exact
//             component={ResetPasswordPage}
//         />
//         <UserRoute
//             location={location}
//             path="/dashboard"
//             exact
//             component={DashboardPage}
//         />
//     </div>
// );

App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.shape({}).isRequired
};

function mapStateToProps(state) {
    return {
        isAuthenticated: state.user.isAuthenticated,
        user: state.user.currentUser
    }
}

export default connect(mapStateToProps, { getCurrentUser })(App);