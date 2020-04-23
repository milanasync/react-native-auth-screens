import React, { Component } from "react";
import { Text, TextInput, View } from "react-native";
import * as Animatable from "react-native-animatable";

import {
  getFormInputStyle,
  getActiveFormInputStyle,
  getFormLabelStyle,
} from "../../helpers/FormHelper";

export default class FormInputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      onceFocused: false,
      inputStyle: getFormInputStyle(),
      value: "",
    };
  }

  componentDidMount() {
    let { inputStyle, lable } = this.props;
    this.setState({
      inputStyle: getFormInputStyle(inputStyle),
    });
  }

  componentWillUnmount() {}

  onFocus = (_) => {
    let { inputActiveStyle, lable, inputStyle, layoutStyle } = this.props;

    if (!this.state.onceFocused) {
      this.label.animate({
        0: { opacity: 0, top: 12 },
        1: { opacity: 1, top: -2 },
      });
    }

    this.setState({
      onceFocused: true,
      isFocused: true,
      inputStyle: getActiveFormInputStyle(inputActiveStyle),
    });
  };

  labelRef = (ref) => (this.label = ref);

  render() {
    let {
      inputActiveStyle,
      lable,
      inputStyle,
      layoutStyle,
      onChangeText = (_) => {},
      updateResult = (_) => {},
    } = this.props;
    let { isFocused, onceFocused } = this.state;

    return (
      <View>
        <Animatable.Text
          ref={this.labelRef}
          style={getFormLabelStyle(
            layoutStyle,
            inputActiveStyle,
            inputStyle,
            isFocused
          )}
        >
          {lable}
        </Animatable.Text>
        <TextInput
          {...this.props}
          style={this.state.inputStyle}
          placeholder={isFocused || onceFocused ? "" : lable}
          onFocus={(_) => this.onFocus()}
          onBlur={(_) =>
            this.setState({
              isFocused: false,
              inputStyle: getFormInputStyle(inputStyle),
            })
          }
          onChangeText={(text) =>
            this.setState({ value: text }, (_) => {
              updateResult(text);
              onChangeText(text, lable);
            })
          }
        />
      </View>
    );
  }
}
