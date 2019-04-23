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
import { Timer } from "../../../../components";
import {
  onVerifyAction,
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
class Verify extends Component {
  static navigationOptions = {
    headerTitle: <ScreenHeader name="Verify Mobile" />,
    headerRight: <DummyView />
  };
  state = {
    otpNumber: "",
    resendBtn: false,
    otpNumberFieldError: null
  };

  validateForm = ({ otpNumber }) => {
    if (!checkEmptyField(otpNumber) || !checkOTPNumber(otpNumber)) {
      this.setState({ otpNumberFieldError: "Invalid OTP Number" });
    } else {
      return true;
    }
  };

  onPressHandler = () => {
    let { otpNumber } = this.state;
    if (this.validateForm(this.state)) {
      let { mobileNumber, userType } = this.props.data;
      let params = { mobileNumber, userType, otpNumber };
      this.props.onClearErrorAction();
      this.props.onVerifyAction(params);
    }
  };

  onResendOtp = () => {
    let { mobileNumber, userType } = this.props.data;
    let params = { mobileNumber, userType };
    this.props.onClearErrorAction();
    this.props.onResendOTPAction(params);
    this.setState({ resendBtn: false, otpNumberFieldError: null });
  };

  timeOutHandler = () => {
    this.setState({ resendBtn: true });
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

  render() {
    let { loading, data, error } = this.props;
    let { otpNumberFieldError } = this.state;
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
            A 6 digit OTP sent to {"\n"}
            <Text style={styles.mobileNumber}>+91 {mobileNumber}</Text>{" "}
          </Text>
        </View>
        <View style={styles.inputFieldWrapper}>
        </View>
        <View style={styles.internalError}>
          {otpNumberFieldError ? (
            <Text style={styles.internalErrorText}>{otpNumberFieldError}</Text>
          ) : (
              <Text />
            )}
        </View>
        <View style={styles.middleWrapper}>{this.showMiddleSection()}</View>
        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btn}
            onPress={this.onPressHandler}>
            <Text style={styles.btnText}>Verify</Text>
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
    { onVerifyAction, onResendOTPAction, onClearErrorAction },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Verify);
