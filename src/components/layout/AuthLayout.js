import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  View,
  StatusBar,
  Image,
  Dimensions,
} from "react-native";
import * as Animatable from "react-native-animatable";

import {
  getLayoutBackground,
  getLayoutStyle,
  getStatuBarProps,
  getAppLogo,
  getAppLogoStyle,
} from "../../helpers/FormHelper";

export default class LayoutAuthLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    let {
      layoutStyle,
      imgSrc,
      children,
      statusBarProps,
      scroll = false,
    } = this.props;

    let BaseComponent = imgSrc != undefined ? ImageBackground : View;
    let BaseComponentStyle =
      imgSrc != undefined
        ? getLayoutBackground(layoutStyle)
        : getLayoutStyle(layoutStyle);
    return (
      <>
        <StatusBar {...getStatuBarProps(statusBarProps, imgSrc)} />

        <BaseComponent
          style={BaseComponentStyle}
          source={imgSrc ? imgSrc : null}
        >
          {scroll && (
            <View style={{ height: Dimensions.get("window").height / 6 }} />
          )}
          <Animatable.Image
            animation="fadeIn"
            resizeMethod="resize"
            resizeMode="contain"
            source={getAppLogo(this.props.appLogo)}
            style={getAppLogoStyle()}
          />

          {scroll ? (
            <ScrollView
              style={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          ) : imgSrc != undefined ? (
            <View style={getLayoutStyle(layoutStyle, imgSrc)}>{children}</View>
          ) : (
            children
          )}
        </BaseComponent>
        {/* </ScrollView> */}
      </>
    );
  }
}

const styles = StyleSheet.create({});
