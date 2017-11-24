import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Message } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';

class LoginForm extends React.Component {
    state = {
        data: {
            email: "",
            password: ""
        },
        loading: false,
        errors: {}
    };

    onChange = e => this.setState({
        data: { ...this.state.data, [e.target.name]: e.target.value}
    });

    onSubmit = () => {
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
        if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
        if (!data.password) errors.password = "Can't be blank";
        return errors;
    };

    render() {
        const { data, errors, loading } = this.state;

        return (
            <div>
            {/*
              Heads up! The styles below are necessary for the correct render of this example.
              You can do same with CSS, the main idea is that all the elements up to the `Grid`
              below must have a height of 100%.
            */}
            <style>{`
              .login-frm button { text-align: left; }
              .login-frm label { text-align: left; }
            `}</style>
            <Form onSubmit={this.onSubmit} loading={loading} className="login-frm">
                {errors.global && (
                    <Message negative>
                        <Message.Header>Something went wrong!</Message.Header>
                        <p>{errors.global}</p>
                    </Message>
                )}
                <Form.Field error={!!errors.email}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@example.com"
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
                        placeholder="Make it secure"
                        value={data.password}
                        onChange={this.onChange}
                    />
                    {errors.password && <InlineError text={errors.password} />}
                </Form.Field>
                <Button primary>Login</Button>
            </Form>
            </div>
        );
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default LoginForm;