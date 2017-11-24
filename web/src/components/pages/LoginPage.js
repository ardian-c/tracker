import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Header, Image } from "semantic-ui-react";

import LoginForm from '../forms/LoginForm';
import { login } from '../../actions/auth';

class LoginPage extends React.Component {
    submit = data => this.props.login(data).then(() => this.props.history.push("/dashboard"));

    render() {
        return (
            <div className='login-form'>
                {/*
                */}
                <style>{`
                  body > div,
                  body > div > div,
                  body > div > div > div.login-form {
                    height: 100%;
                  }
                `}</style>
                <Grid
                    textAlign='center'
                    style={{ height: '100%' }}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' textAlign='center'>
                            <Image src='/assets/images/logo.png' />
                            {' '}Log-in to your account
                        </Header>
                        <LoginForm submit={this.submit} />
                        <Link to="/forgot_password">Forgot Password</Link>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

LoginPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    login: PropTypes.func.isRequired
};

export default connect(null, { login })(LoginPage);