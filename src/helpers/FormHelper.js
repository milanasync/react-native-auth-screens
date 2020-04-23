import DefaultStyle from "../config/DefaultStyle";
import Constants from "../config/Constants";
import Colors from "../config/Colors";

export const getFormInputStyle = (style) => {
  return style != undefined
    ? { ...DefaultStyle.formInput, ...style }
    : DefaultStyle.formInput;
};

export const getActiveFormInputStyle = (style) => {
  return style != undefined
    ? { ...DefaultStyle.formInputActive, ...style }
    : DefaultStyle.formInputActive;
};

export const getFormButtonStyle = (style) => {
  return style != undefined
    ? { ...DefaultStyle.formButton, ...style }
    : DefaultStyle.formButton;
};

export const getFormButtonTextStyle = (style) => {
  return style != undefined
    ? { ...DefaultStyle.formButtonText, ...style }
    : DefaultStyle.formButtonText;
};

export const getLayoutBackground = (style) => {
  return style != undefined
    ? { ...DefaultStyle.layoutBackground, ...style }
    : DefaultStyle.layoutBackground;
};

export const getLayoutStyle = (style, imgSrc = undefined) => {
  let layout =
    style != undefined
      ? { ...DefaultStyle.layoutStyle, ...style }
      : DefaultStyle.layoutStyle;
  layout =
    imgSrc != undefined
      ? { ...layout, ...{ backgroundColor: Colors.transparent } }
      : layout;
  return layout;
};

export const getFormLabelStyle = (
  style,
  inputActiveStyle,
  inputStyle,
  isFocused,
  imgSrc = false
) => {
  let color =
    inputActiveStyle != undefined
      ? inputActiveStyle.borderColor
      : Colors.primaryColor;
  if (!isFocused) {
    color =
      inputStyle != undefined ? inputStyle.borderColor : Colors.secondaryColor;
  }

  return style != undefined
    ? { ...DefaultStyle.formLabel, ...style, ...{ color } }
    : DefaultStyle.formLabel;
};

export const getUserNameLabel = (label) =>
  label != undefined ? label : Constants.userNameLabel;
export const getPasswordLabel = (label) =>
  label != undefined ? label : Constants.passwordLabel;
export const getBtntTitle = (title) =>
  title != undefined ? title : Constants.Login;
export const getAppLogo = (logo) =>
  logo != undefined ? logo : Constants.defaultLogo;
export const getAppLogoStyle = (_) => DefaultStyle.appLogo;

export const getConfirmPasswordLabel = (label) =>
  label != undefined ? label : Constants.confirmPasswordLabel;
export const getEmailLabel = (label) =>
  label != undefined ? label : Constants.email;
export const getMobileLabel = (label) =>
  label != undefined ? label : Constants.mobile;
export const getRegisterBtnTitle = (label) =>
  label != undefined ? label : Constants.Register;

export const getStatuBarProps = (props, imgSrc) => {
  let propsDerived =
    props != undefined
      ? { ...DefaultStyle.statuBarProps, ...props }
      : DefaultStyle.statuBarProps;
  if (imgSrc != undefined) {
    propsDerived.translucent = true;
    propsDerived.backgroundColor = Colors.transparent;
  }
  return propsDerived;
};

const errors = {
  "401": "Invalid credentials",
  "400": "Missing some fields",
  "500": "Server Error.",
};
export const getErrors = (errorsGiven) => {
  errorsGiven = errorsGiven == undefined ? {} : errorsGiven;
  return { ...errors, ...errorsGiven };
};
