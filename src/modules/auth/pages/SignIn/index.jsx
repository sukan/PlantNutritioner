// @flow
import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import {
  type AsyncStatusType,
  type NotificationType,
} from "shared/types/General";

import Input from "components/Input";
import Icon from "components/icon";
import Button from "components/button";
import Alert from "components/Alert";

import { ASYNC_STATUS } from "constants/async";
import { AUTH_TYPE } from "constants/auth";
import { hasWhiteSpace } from "shared/utils";

type SignInPageProps = {
  status: AsyncStatusType,
  notification: NotificationType,
  isLoading: Boolean,
  isCapsLockActive: boolean,
  toggleAuthType: Function,
  onSignInSubmit: Function,
};

type SignInPageState = {
  values: {
    username: string,
    password: string,
  },
  errors: {
    username: null | String,
    password: null | string,
  },
  isResetPasswordClicked: boolean,
};

class SignInPage extends Component<SignInPageProps, SignInPageState> {
  constructor(props) {
    super(props);

    this.state = {
      values: {
        username: "",
        password: "",
      },
      errors: {
        username: null,
        password: null,
      },
      isResetPasswordClicked: false,
    };
    // $FlowFixMe
    this.onSubmit = this.onSubmit.bind(this);
    // $FlowFixMe
    this.resetForm = this.resetForm.bind(this);
    // $FlowFixMe
    this.validateForm = this.validateForm.bind(this);
    // $FlowFixMe
    this.setFormErrors = this.setFormErrors.bind(this);
    // $FlowFixMe
    this.handleInputChange = this.handleInputChange.bind(this);
    // $FlowFixMe
    this.toggleAuthType = this.toggleAuthType.bind(this);
    // $FlowFixMe
    this.onEnterKeyPress = this.onEnterKeyPress.bind(this);
    // $FlowFixMe
    this.handleResetPasswordClicked = this.handleResetPasswordClicked.bind(
      this
    );
  }

  componentDidMount() {
    this.resetForm();
  }

  resetForm() {
    this.setState({
      errors: {
        username: null,
        password: null,
      },
    });
  }

  validateForm() {
    const {
      values: { username, password },
    } = this.state;

    let hasError = false;

    this.resetForm();

    if (username === "") {
      this.setFormErrors("username", "Username is required.");
      hasError = true;
    } else if (hasWhiteSpace(username)) {
      this.setFormErrors("username", "Username cannot contain spaces.");
      hasError = true;
    }
    if (password === "") {
      this.setFormErrors("password", "Password is required.");
      hasError = true;
    }

    return hasError;
  }

  setFormErrors(field: string, message: string) {
    this.setState(({ errors }) => ({
      errors: {
        ...errors,
        [field]: message,
      },
    }));
  }

  handleResetPasswordClicked() {
    this.setState({
      ...this.state,
      isResetPasswordClicked: !this.state.isResetPasswordClicked,
    });
  }

  handleInputChange(value) {
    this.setState(({ values }) => ({
      values: {
        ...values,
        ...value,
      },
    }));
  }

  toggleAuthType(authType: string) {
    const { toggleAuthType } = this.props;

    this.resetForm();
    toggleAuthType(authType);
  }

  onEnterKeyPress(event) {
    if (event.key === "Enter") {
      this.onSubmit();
    }
  }

  onSubmit() {
    const {
      values: { username, password },
    } = this.state;

    this.props.onSignInSubmit({ username, password });
  }

  render() {
    const { values, errors, isResetPasswordClicked } = this.state;
    const { isCapsLockActive, status, notification } = this.props;

    if (isResetPasswordClicked) {
      return <Redirect to="/forgetPassword" />;
    }

    return (
      <Fragment>
        {notification && (
          <Alert type={notification.type}>{notification.message}</Alert>
        )}
        <form autoComplete="off">
          <div className="form-group">
            <label>Username</label>
            <Input
              placeholder="user name"
              id="username"
              text={values.username}
              onChange={(username) => this.handleInputChange({ username })}
              error={errors.username}
              autoComplete={false}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <Input
              placeholder="at least 6 characters including a number, a special character, lower case and upper case letters."
              id="password"
              text={values.password}
              onChange={(password) => this.handleInputChange({ password })}
              type="password"
              error={errors.password}
              autoComplete={false}
              onKeyPress={this.onEnterKeyPress}
            />
            {isCapsLockActive && (
              <span className="warning">
                <Icon icon="exclamation-circle" />
                &nbsp; Warning: Caps lock enabled.
              </span>
            )}
          </div>
        </form>
        <div className="button-container">
          <Button
            htmlType={Button.HTML_TYPE.BUTTON}
            onClick={this.onSubmit}
            loading={status === ASYNC_STATUS.LOADING}
          >
            SignIn
          </Button>
        </div>
        <Fragment>
          <div className="secondary-link">
            Need a Account? &nbsp;
            <span
              onClick={() => this.toggleAuthType(AUTH_TYPE.SIGN_UP)}
              className="link"
            >
              SignUp
            </span>
          </div>
        </Fragment>
      </Fragment>
    );
  }
}

export default SignInPage;
