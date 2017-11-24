import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Message, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { confirm } from '../../actions/auth';

class ConfirmationPage extends React.Component {
    state = {
        loading: true,
        success: false
    };

    componentDidMount() {
        this.props
            .confirm(this.props.match.params.token)
            .then(() => {
                this.setState({ loading: false, success: true });
                this.props.history.push('/dashboard')
            })
            .catch(() => this.setState({ loading: false, success: false }));
    }

    render() {
        const { loading, success } = this.state;

        return (
            <div className="confirmation-page">
                {}<style>{`
                    body > div,
                    body > div > div,
                    body > div > div > div.confirmation-page {
                      height: 100%;
                    }
                `}</style>
                <Grid
                    textAlign="center"
                    style={{ height: '100%' }}
                    verticalAlign="middle"
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        {loading && (
                            <Message icon>
                                <Icon name="circle notched" loading />
                                <Message.Header>Validating your email</Message.Header>
                            </Message>
                        )}

                        {!loading &&
                        success && (
                            <Message success icon>
                                <Icon name="checkmark" />
                                <Message.Content>
                                    <Message.Header>
                                        Thank you. Your account has been verified.
                                    </Message.Header>
                                </Message.Content>
                            </Message>
                        )}

                        {!loading &&
                        !success && (
                            <Message negative icon>
                                <Icon name="warning sign" />
                                <Message.Content>
                                    <Message.Header>Ooops. Token is invalid.</Message.Header>
                                </Message.Content>
                            </Message>
                        )}
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

ConfirmationPage.propTypes = {
    confirm: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default connect(null, { confirm })(ConfirmationPage);