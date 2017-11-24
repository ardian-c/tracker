import React from "react";
import { Message } from "semantic-ui-react";

const ConfirmEmailMessage = () => (
    <Message info>
        <Message.Header>
            Please, verify your email in order to access your dashboard.
        </Message.Header>
    </Message>
);

export default ConfirmEmailMessage;