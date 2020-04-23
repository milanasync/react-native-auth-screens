import React, { Component } from "react";
import { Text, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";

import AuthLayout from "../components/layout/AuthLayout";
import InputComponent from "../components/form/InputComponent";
import ButtonComponent from "../components/form/ButtonComponent";

import {
  getUserNameLabel,
  getPasswordLabel,
  getBtntTitle,
  getErrors,
} from "../helpers/FormHelper";

// import controller
import {
  doLogin,
  saveUserToken,
  alertError,
  validateLoginForm,
} from "../controller/Login.controller";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      isLoading: false,
    };
  }

  updateResult = (key, val) => {
    this.setState({
      [key]: val,
    });
  };

  doLogin = async (_) => {
    try {
      let { userName, password } = this.state;
      if (typeof this.props.validateLoginForm === "function") {
        if (!this.props.validateLoginForm(this.state)) return false;
      } else {
        if (!validateLoginForm(userName, password)) return false;
      }

      this.setState({
        isLoading: true,
      });

      let {
        userNameKey = "username",
        passwordKey = "password",
        authCheckURL,
        afterSuccess = (_) => {},
        afterFailed = (_) => {},
        errors,
        authTokenKey = "token",
      } = this.props;
      errors = getErrors(errors);

      // userName = 'eve.holt@reqres.in';
      // password = 'cityslicaka';

      let loggedInUser = await doLogin(
        userName,
        password,
        authCheckURL,
        userNameKey,
        passwordKey,
        errors
      );
      this.setState({
        isLoading: false,
      });
      if (loggedInUser instanceof Error) {
        alertError("Login", errors[loggedInUser.message]);
        afterFailed(loggedInUser);
        return false;
      }

      if (loggedInUser[authTokenKey] != undefined) {
        await saveUserToken(loggedInUser[authTokenKey]);
        afterSuccess(loggedInUser[authTokenKey]);
      } else {
        console.error(
          "API returned status 200, but not got token in the response, please check the key passed in props authTokenKey."
        );
      }
    } catch (error) {
      console.error(error);
      this.setState({
        isLoading: false,
      });
    }
  };

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <AuthLayout {...this.props}>
        <InputComponent
          updateResult={(text) => this.updateResult("userName", text)}
          {...this.props}
          lable={getUserNameLabel(this.props.userNameLabel)}
          value={this.state.userName}
        />
        <InputComponent
          updateResult={(text) => this.updateResult("password", text)}
          {...this.props}
          lable={getPasswordLabel(this.props.passwordLabel)}
          secureTextEntry
          value={this.state.password}
        />
        <ButtonComponent
          isLoading={this.state.isLoading}
          onPress={this.doLogin}
          {...this.props}
          btnTitle={getBtntTitle(this.props.btnTitle)}
        />
      </AuthLayout>
    );
  }
}

const styles = StyleSheet.create({});

LoginScreen.propTypes = {
  userNameKey: PropTypes.string,
  passwordKey: PropTypes.string,
  authCheckURL: PropTypes.string.isRequired,
  afterSuccess: PropTypes.func.isRequired,
};
