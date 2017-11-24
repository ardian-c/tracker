import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';
import InlineError from '../messages/InlineError';

class SignupForm extends React.Component {
    state = {
        data: {
            name: "",
            email: "",
            password: "",
            confirm_password: ""
        },
        loading: false,
        errors: {}
    };

    onChange = e => this.setState({
        ...this.state,
        data: { ...this.state.data, [e.target.name]: e.target.value }
    });

    onSubmit = e => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });

        if(Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this.props
                .submit(this.state.data)
                .catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
        }
    };

    validate = data => {
        const errors = {};

        if (!isEmail(data.email)) errors.email = "Invalid email";
        if (!data.password) errors.password = "Can't be blank";
        if (!data.name) errors.name = "Please fill the name field";
        if(data.password !== data.confirm_password) errors.confirm_password = "Password and confirmation should match";

        return errors;
    };

    render() {
        const { data, errors, loading } = this.state;

        return (
            <div>
            {/*
            */}
            <style>{`
            .signup-form input { margin-bottom: 1.5em; }
            .signup-form button { text-align: left; }
            .signup-form label { text-align: left; }
             .signup-form span { float: left; }
            `}</style>
            <Form onSubmit={this.onSubmit} loading={loading}>
                <Form.Field error={!! errors.name }>
                    <label htmlFor="name">Name / Company Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="your personal or company name"
                        value={data.name}
                        onChange={this.onChange}
                    />
                    {errors.name && <InlineError text={errors.name} />}
                </Form.Field>

                <Form.Field error={!!errors.email}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="email@email.com"
                        value={data.email}
                        onChange={this.onChange}
                    />
                    {errors.email && <InlineError text={errors.email} />}
                </Form.Field>

                <Form.Field error={!!errors.password}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={data.password}
                        onChange={this.onChange}
                    />
                    {errors.password && <InlineError text={errors.password} />}
                </Form.Field>

                <Form.Field error={!!errors.confirm_password}>
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm_password"
                        name="confirm_password"
                        value={data.confirm_password}
                        onChange={this.onChange}
                        />
                    {errors.confirm_password && <InlineError text={errors.confirm_password} />}
                </Form.Field>

                <Button primary>Sign Up</Button>
            </Form>
            </div>
        );
    }
}

SignupForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default SignupForm;