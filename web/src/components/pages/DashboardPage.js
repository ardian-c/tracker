/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TopNavigation from '../../components/navigation/TopNavigation';

class DashboardPage extends React.Component {
    // componentDidMount = () => this.onInit(this.props);
    //
    // onInit = props => props.fetchLocations();

    render() {
        const { isAuthenticated } = this.props;
        return (
            <div>
                {isAuthenticated && <TopNavigation/>}
            </div>
        );
    }
}
DashboardPage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.currentUser.confirmed
    };
}

export default connect(mapStateToProps, { /** fetchLocations */ })(DashboardPage);
