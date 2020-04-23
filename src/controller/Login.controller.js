import React, { Component } from "react";
import { Text, StyleSheet, Image, Alert } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

export const doLogin = async (
  userName,
  password,
  authCheckURL,
  userNameKey = "username",
  passwordKey = "password"
) => {
  try {
    let params = {};
    params[userNameKey] = userName;
    params[passwordKey] = password;
    console.warn(params);
    let response = await fetch(authCheckURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    let jsonResponse = await response.json();

    if (response.status !== 200) {
      return new Error(response.status);
    }

    return jsonResponse;
  } catch (error) {
    console.error(error);
  }
};

export const saveUserToken = async (token) => {
  try {
    return await AsyncStorage.setItem("token", token);
  } catch (error) {
    console.error(error);
  }
};

export const getUserToken = async (token) => {
  try {
    return await AsyncStorage.getItem("token");
  } catch (error) {
    console.error(error);
  }
};

export const alertError = (title, message) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: "Ok",
      },
    ],
    {
      cancelable: true,
    }
  );
};

export const validateLoginForm = (username, password) => {
  if (username === undefined || username === "") {
    alertError("Login", "Please enter username");
    return false;
  }
  if (password === undefined || password === "") {
    alertError("Login", "Please enter password");
    return false;
  }
  return true;
};
