import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Image, Grid } from 'semantic-ui-react';

import SignupForm from '../forms/SignupForm';
import { signup } from '../../actions/auth';

class SignupPage extends React.Component {
    submit = data => this.props.signup(data).then(() => this.props.history.push("/dashboard"));

    render() {
        return (
            <div className='signup-form'>
            {/*
              Heads up! The styles below are necessary for the correct render of this example.
              You can do same with CSS, the main idea is that all the elements up to the `Grid`
              below must have a height of 100%.
            */}
            <style>{`
              body > div,
              body > div > div,
              body > div > div > div.signup-form {
                height: 100%;
              }
            `}</style>
            <Grid
                textAlign='center'
                style={{ height: '100%' }}
                verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' textAlign='center'>
                        <Image src='/assets/images/logo.png' />
                        {' '}Create new account
                    </Header>
                    <SignupForm submit={this.submit} />
                </Grid.Column>
            </Grid>
            </div>
        );
    }
}

SignupPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    signup: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token
    };
}

export default connect(mapStateToProps, { signup })(SignupPage);