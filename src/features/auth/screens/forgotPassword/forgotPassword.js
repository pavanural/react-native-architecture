import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  Image
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  onResendOTPAction,
  onClearErrorAction,
  onForgotPasswordAction
} from "../../actions";
import { validations } from "../../../../utils";
const { checkEmptyField, checkEmailId, checkMobileNumber } = validations;
import styles from "./styles";
import {
  ScreenHeader,
  DummyView
} from "../../../../components/headerComponent";
import { Loader } from "../../../../components";
class ForgotPassword extends Component {
  static navigationOptions = {
    headerTitle: <ScreenHeader name="Forgot Password" />,
    headerRight: <DummyView />
  };
  shouldSendAsEmail = true
  state = {
    forgotPasswordFieldValue: "",
    forgotPasswordFieldError: null,
    userType: "Merchant",
  };

  validateForm = ({ forgotPasswordFieldValue }) => {
    if (!checkEmailId(forgotPasswordFieldValue)) {
      console.log('checkemailid')
      this.shouldSendAsEmail = false;
      console.log(this.state)
    }
    if (!checkEmptyField(forgotPasswordFieldValue) || !checkEmailId(forgotPasswordFieldValue) && !checkMobileNumber(forgotPasswordFieldValue)) {
      this.setState({ forgotPasswordFieldError: "Please enter proper Email Id or Phone Number" });
    } else {
      return true;
    }
  };

  onPressHandler = () => {
    let { forgotPasswordFieldValue, userType } = this.state;
    if (this.validateForm(this.state)) {
      let params = this.shouldSendAsEmail ? { email: forgotPasswordFieldValue, userType } : { mobileNumber: forgotPasswordFieldValue, userType };
      this.props.onClearErrorAction();
      this.props.onForgotPasswordAction(params);
    }
  };

  clearUIErrors = () => {
    let tempState = this.state;
    tempState.forgotPasswordFieldError = null;
    this.props.onClearErrorAction();
    this.setState({ ...tempState });
  };

  render() {
    let { loading, error } = this.props;
    let { forgotPasswordFieldError } = this.state;
    return (
      <ScrollView
        style={styles.wrapper}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Loader loading={loading} />
        <View style={styles.logoWrapper}>
          <Image
            style={styles.logo}
            source={require("../../../../assets/innoviti_big_logo.png")}
            resizeMode="contain"
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.forgotPasswordTitle}>
            Forgot Your Password?
          </Text>
          <Text style={styles.forgotPasswordSubTitle}>
            Enter your email id or mobile number below to receive your otp to your mobile number
          </Text>
          <Text style={styles.forgotPasswordTextFieldTitle}>
            Email Id or Mobile Number
          </Text>
          <TextInput
            style={styles.inputField}
            placeholder="Email id/Mobile number"
            placeholderTextColor="#AAAAAA"
            onChangeText={forgotPasswordFieldValue => this.setState({ forgotPasswordFieldValue })}
            value={this.state.forgotPasswordFieldValue}
            onFocus={this.clearUIErrors}
            keyboardType="default"
          />

          <View style={styles.internalError}>
            {forgotPasswordFieldError ? (
              <Text style={styles.internalErrorText}>
                {forgotPasswordFieldError}
              </Text>
            ) : (
                <Text />
              )}
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btn}
            onPress={this.onPressHandler}>
            <Text style={styles.btnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { ...auth };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { onResendOTPAction, onClearErrorAction, onForgotPasswordAction },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);
