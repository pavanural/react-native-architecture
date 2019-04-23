import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from "./screens/login";
import ForgotPassword from "./screens/forgotPassword";
import ResetPassword from "./screens/resetPassword";
import Verify from "./screens/verify";
import Intro from "./screens/intro";
import { BackArrow } from "../../components/backArrow";
import Terms from "./screens/terms_and_condition";
import { verticalScale } from "react-native-size-matters"

const routeConfig = {
  loginRoute: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  forgotPasswordRoute: {
    screen: ForgotPassword,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <BackArrow
            onPress={() => {
              navigation.goBack();
            }}
          />
        ),
        headerStyle: { backgroundColor: '#F9F9F9', height: verticalScale(50) }
      };
    }
  },
  resetPasswordRoute: {
    screen: ResetPassword,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <BackArrow
            onPress={() => {
              navigation.goBack();
            }}
          />
        ),
        headerStyle: { backgroundColor: '#F9F9F9', height: verticalScale(50) }
      };
    }
  },
  otpRoute: {
    screen: Verify,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <BackArrow
            onPress={() => {
              navigation.goBack();
            }}
          />
        ),
        headerStyle: { backgroundColor: '#F9F9F9', height: verticalScale(50) }
      };
    }
  },
  introRoute: {
    screen: Intro,
    navigationOptions: {
      header: null
    }
  },
  termsNCondition: {
    screen: Terms,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <BackArrow
            onPress={() => {
              navigation.goBack();
            }}
          />
        ),
        headerStyle: { backgroundColor: '#F9F9F9', height: verticalScale(50) }

      };
    }
  }
};

export default createStackNavigator(routeConfig);
