import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";

import {
  getFormButtonStyle,
  getFormButtonTextStyle,
} from "../../helpers/FormHelper";

import Colors from "../../config/Colors";

export default class FormButtonComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    let {
      onPress = (_) => {},
      btnTitle = "Submit",
      btnStyle,
      btnTitleStyle,
      isLoading = false,
      color = Colors.white,
    } = this.props;

    return (
      <TouchableOpacity onPress={(_) => !isLoading && onPress()}>
        <View style={getFormButtonStyle(btnStyle)}>
          {isLoading ? (
            <ActivityIndicator color={color} />
          ) : (
            <Text style={getFormButtonTextStyle(btnTitleStyle)}>
              {btnTitle}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({});
