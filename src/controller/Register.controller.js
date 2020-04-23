import React, { Component } from "react";
import { Text, StyleSheet, Image, Alert } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

export const doRegisterCall = async (params, authRegisterURL) => {
  try {
    console.warn(params);
    let response = await fetch(authRegisterURL, {
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

export const validateRegsiterForm = (state, requiredFields) => {
  let stateKeys = Object.keys(state);
  let errorFound = false;
  let errorKey = "";

  if (Array.isArray(requiredFields)) {
    for (let i in requiredFields) {
      let key = requiredFields[i];
      if (!stateKeys.includes(key)) {
        errorKey = key;
        errorFound = true;
        break;
      } else {
        if (state[key] === "") {
          errorKey = key;
          errorFound = true;
          break;
        }
      }
    }
  }

  if (errorFound) {
    alertError("Register", `Field ${errorKey} is required.`);
    return !errorFound;
  }

  if (state["password"] !== state["confirmPassword"]) {
    alertError("Register", `Password and Confirm Password should match`);
    return !errorFound;
  }

  return !errorFound;
};
