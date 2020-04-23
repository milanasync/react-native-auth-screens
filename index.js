import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

import {
    doLogin,
    alertError,
    saveUserToken,
    getUserToken
} from './src/controller/Login.controller';

import {
    doRegisterCall,
} from './src/controller/Register.controller';

const AuthFunctions = {
    doLogin,
    alertError,
    saveUserToken,
    getUserToken,
    doRegisterCall
};

export { LoginScreen, RegisterScreen, AuthFunctions };
