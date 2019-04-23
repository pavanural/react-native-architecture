import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  onForgotPasswordAction,
  onVerifyAndResetPasswordAction,
  onResendOTPAction,
  onClearErrorAction
} from "../../actions";
import { validations } from "../../../../utils";
const { checkEmptyField, checkOTPNumber } = validations;
import styles from "./styles";
import {
  ScreenHeader,
  DummyView
} from "../../../../components/headerComponent";
import { Loader } from "../../../../components";
import { Timer } from "../../../../components";
class ResetPassword extends Component {
  static navigationOptions = {
    headerTitle: <ScreenHeader name="Reset Password" />,
    headerRight: <DummyView />
  };
  state = {
    otpNumber: "",
    resendBtn: false,
    otpNumberFieldError: null,
    password: "",
    passwordFieldError: null,
    confirmPassword: "",
    confirmPasswordFieldError: null,
    userType: "Merchant",
    email: "",
    mobileNumber: ""
  };
  timeInterval = null
  componentDidMount() {
    let { navigation } = this.props;
    let email = navigation.getParam('emailId', undefined)
    if (!email) {
      let mobileNumber = navigation.getParam('mobileNumber', undefined)
      this.setState({
        mobileNumber
      })
    } else {
      this.setState({
        email
      })
    }
    // this.setTimeInterval()

  }

  setTimeInterval = () => {
    this.setState({
      resendBtn: false
    })
    this.timeInterval = setInterval(() => {
      this.timeOutHandler()
    }, 60000);
  } 

  validateForm = ({ otpNumber, password, confirmPassword }) => {
    if (!checkEmptyField(otpNumber) || !checkOTPNumber(otpNumber)) {
      this.setState({ otpNumberFieldError: "Invalid OTP Number" });
    } else if (!checkEmptyField(password)) {
      this.setState({ otpNumberFieldError: null, passwordFieldError: 'Please enter new password' });
    } else if (!checkEmptyField(confirmPassword)) {
      this.setState({ otpNumberFieldError: null, passwordFieldError: null, confirmPasswordFieldError: 'Please confirm password' });
    } else if (password != confirmPassword) {
      this.setState({ otpNumberFieldError: null, passwordFieldError: null, confirmPasswordFieldError: 'Password not matching' });
    } else {
      return true;
    }
  };


  clearUIErrors = () => {
    let tempState = this.state;
    tempState.otpNumberFieldError = null;
    tempState.passwordFieldError = null;
    tempState.confirmPasswordFieldError = null;
    this.props.onClearErrorAction();
    this.setState({ ...tempState });
  };

  onPressHandler = () => {
    let { otpNumber, password, userType, email, mobileNumber } = this.state;
    if (this.validateForm(this.state)) {
      clearInterval(this.timeInterval)
      let params = email ? { email, userType, otpNumber, password } : { mobileNumber, userType, otpNumber, password };
      this.props.onClearErrorAction();
      this.props.onVerifyAndResetPasswordAction(params);
    }
  };


  showMiddleSection = () => {
    let { resendBtn } = this.state;
    if (!resendBtn) {
      return (
        <View style={styles.mdwrap}>
          <Timer
            count={60}
            onComplete={() => {
              this.setState({ resendBtn: true });
            }}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.mdwrap}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.resendBtnWrapper}
            onPress={this.onResendOtp}
          >
            <Text style={styles.resendBtnTitle}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  onResendOtp = () => {
    let { userType, email, mobileNumber } = this.state;
    let params = email ? { email, userType } : { mobileNumber, userType };
    this.props.onClearErrorAction();
    this.props.onForgotPasswordAction(params);
    this.setState({ resendBtn: false });
    // this.setTimeInterval()
  };

  timeOutHandler = () => {
    clearInterval(this.timeInterval)
    this.setState({ resendBtn: true });
  };

  componentWillUnmount() {
    clearInterval(this.timeInterval)
  }

  render() {
    let { loading, data, error } = this.props;
    let { otpNumberFieldError, passwordFieldError, confirmPasswordFieldError, resendBtn } = this.state;
    let { mobileNumber } = data;
    return (
      <ScrollView
        style={styles.wrapper}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Loader loading={loading} />
        <View style={styles.info}>
          <Text style={styles.ackText}>
            A 6 digit OTP sent to your number.
          </Text>
        </View>
        <View style={styles.inputFieldWrapper}>

          <View style={styles.internalError}>
            {otpNumberFieldError ? (
              <Text style={styles.internalErrorText}>{otpNumberFieldError}</Text>
            ) : (
                <Text />
              )}
          </View>
          {this.showMiddleSection()}
        </View>
        <View style={styles.inputFieldWrapper}>
          <TextInput
            style={styles.inputFieldFullWidth}
            placeholder="New Password"
            placeholderTextColor="#AAAAAA"
            onChangeText={password => this.setState({ password })}
            value={this.state.forgotPasswordFieldValue}
            onFocus={this.clearUIErrors}
            keyboardType="default"
            secureTextEntry={true}
          />

          <View style={styles.internalError}>
            {passwordFieldError ? (
              <Text style={styles.internalErrorText}>{passwordFieldError}</Text>
            ) : (
                <Text />
              )}
          </View>
        </View>
        <View style={styles.inputFieldWrapper}>
          <TextInput
            style={styles.inputFieldFullWidth}
            placeholder="Confirm Password"
            placeholderTextColor="#AAAAAA"
            onChangeText={confirmPassword => this.setState({ confirmPassword })}
            value={this.state.forgotPasswordFieldValue}
            onFocus={this.clearUIErrors}
            keyboardType="default"
            secureTextEntry={true}
          />

          <View style={styles.internalError}>
            {confirmPasswordFieldError ? (
              <Text style={styles.internalErrorText}>{confirmPasswordFieldError}</Text>
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
            <Text style={styles.btnText}>Reset</Text>
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
    { onForgotPasswordAction, onVerifyAndResetPasswordAction, onResendOTPAction, onClearErrorAction },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);
