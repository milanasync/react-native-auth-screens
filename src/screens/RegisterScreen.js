import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import AuthLayout from "../components/layout/AuthLayout";
import InputComponent from "../components/form/InputComponent";
import ButtonComponent from "../components/form/ButtonComponent";

import {
  getUserNameLabel,
  getPasswordLabel,
  getConfirmPasswordLabel,
  getEmailLabel,
  getMobileLabel,
  getRegisterBtnTitle,
  getErrors,
} from "../helpers/FormHelper";

import {
  validateRegsiterForm,
  doRegisterCall,
  alertError,
} from "../controller/Register.controller";

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      requireFields: [
        "userName",
        "email",
        "mobile",
        "password",
        "confirmPassword",
      ],
    };
  }

  componentDidMount() {
    let { requireFields } = this.state;

    let { extraFields, showEmail = true, showMobile = true } = this.props;

    if (Array.isArray(extraFields)) {
      extraFields.map((field) => {
        if (field.required) {
          requireFields.push(field.key);
        }
      });
    }

    if (showEmail === false) {
      delete requireFields["email"];
    }

    if (showMobile === false) {
      delete requireFields["mobile"];
    }
    this.setState({ requireFields });
  }

  componentWillUnmount() {}

  updateResult = (key, val) => {
    this.setState({
      [key]: val,
    });
  };

  doRegister = async () => {
    try {
      let {
        userNameKey = "username",
        passwordKey = "password",
        emailKey = "email",
        mobileKey = "mobileKey",
        extraFields,
        afterSuccess = (_) => {},
        afterFailed = (_) => {},
        errors,
        authRegisterURL,
      } = this.props;
      errors = getErrors(errors);

      if (typeof this.props.validateRegsiterForm === "function") {
        if (!this.props.validateRegsiterForm(this.state)) return false;
      } else {
        if (!validateRegsiterForm(this.state, this.state.requireFields))
          return false;
      }
      this.setState({
        isLoading: true,
      });

      let params = {};
      params[userNameKey] = this.state.userName;
      params[passwordKey] = this.state.password;
      if (this.state.email != undefined) {
        params[emailKey] = this.state.email;
      }

      if (this.state.mobile != undefined) {
        params[mobileKey] = this.state.mobile;
      }
      if (Array.isArray(extraFields)) {
        extraFields.map((field) => {
          params[field.key] = this.state[field.key];
        });
      }

      let registerUser = await doRegisterCall(params, authRegisterURL);
      this.setState({
        isLoading: false,
      });

      console.warn({ registerUser });
      if (registerUser instanceof Error) {
        alertError("Register", errors[registerUser.message]);
        afterFailed(registerUser);
        return false;
      }

      afterSuccess(registerUser);
    } catch (error) {
      console.error(error);
      this.setState({
        isLoading: false,
      });
    }
  };

  renderExtraFields = (extraFields) => {
    return extraFields.map((field) => (
      <InputComponent
        updateResult={(text) => this.updateResult(field.key, text)}
        {...this.props}
        lable={field.label}
        secureTextEntry={field.secureText}
        value={this.state[field.key]}
      />
    ));
  };
  render() {
    let { extraFields, showEmail = true, showMobile = true } = this.props;

    return (
      <AuthLayout {...this.props} scroll>
        <InputComponent
          updateResult={(text) => this.updateResult("userName", text)}
          {...this.props}
          lable={getUserNameLabel(this.props.userNameLabel)}
          value={this.state.userName}
        />
        {showEmail && (
          <InputComponent
            updateResult={(text) => this.updateResult("email", text)}
            {...this.props}
            lable={getEmailLabel(this.props.emailLabel)}
            value={this.state.email}
          />
        )}
        {showMobile && (
          <InputComponent
            updateResult={(text) => this.updateResult("mobile", text)}
            {...this.props}
            lable={getMobileLabel(this.props.mobileLabel)}
            value={this.state.mobile}
            keyboardType="phone-pad"
          />
        )}
        {Array.isArray(extraFields) && this.renderExtraFields(extraFields)}
        <InputComponent
          updateResult={(text) => this.updateResult("password", text)}
          {...this.props}
          lable={getPasswordLabel(this.props.passwordLabel)}
          secureTextEntry
          value={this.state.password}
        />
        <InputComponent
          updateResult={(text) => this.updateResult("confirmPassword", text)}
          {...this.props}
          lable={getConfirmPasswordLabel(this.props.confirmPasswordLabel)}
          secureTextEntry
          value={this.state.confirmPassword}
        />
        <ButtonComponent
          isLoading={this.state.isLoading}
          onPress={this.doRegister}
          {...this.props}
          btnTitle={getRegisterBtnTitle(this.props.btnTitle)}
        />
      </AuthLayout>
    );
  }
}

const styles = StyleSheet.create({});
