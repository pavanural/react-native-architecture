import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  ScrollView
} from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Loader } from "../../../../components";
import { onSignInAction, onClearErrorAction } from "../../actions";
import { validations } from "../../../../utils";
const { checkEmptyField, checkMobileNumber } = validations;
import styles from "./styles";
class Login extends Component {
  constructor(props) {
    super(props);
    this.touchableInactive = false
  }
  state = {
    mobileNumber: "",
    password: "",
    userType: "Merchant",
    mobileNumberFieldError: null,
    passwordFieldError: null
  };

  validateForm = ({ mobileNumber, password }) => {
    if (!checkEmptyField(mobileNumber) || !checkMobileNumber(mobileNumber)) {
      this.setState({ mobileNumberFieldError: "Invalid Phone Number" });
    } else if (!checkEmptyField(password)) {
      this.setState({ passwordFieldError: "Password cannot be empty." });
    } else {
      return true;
    }
  };
  onPressHandler = () => {
    let { mobileNumberFieldError, passwordFieldError, ...params } = this.state;
    if (this.validateForm(this.state)) {
      this.props.onSignInAction(params);
    }
  };
  clearUIErrors = () => {
    let tempState = this.state;
    tempState.mobileNumberFieldError = null;
    this.props.onClearErrorAction();
    this.setState({ ...tempState });
  };

  componentDidMount() {

  }

  onButtonClick = () => {
    if (!this.touchableInactive) {
      this.touchableInactive = true;
      this.props.navigation.navigate("forgotPasswordRoute");
      setTimeout(() => {
        this.touchableInactive = false;
      }, 600)
    }
  }

  render() {
    let { error, loading } = this.props;
    let { mobileNumberFieldError, passwordFieldError } = this.state;
    return (
      <ScrollView
        style={styles.wrapper}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <AppForegroundCheck />
        <Loader loading={loading} />
        <View style={styles.logoWrapper}>
          <Image
            style={styles.logo}
            source={require("../../../../assets/innoviti_big_logo.png")}
            resizeMode="contain"
          />
        </View>
        <View style={styles.inputFieldWrapper}>
          <TextInput
            style={styles.inputField}
            placeholder="10 digit Mobile number"
            placeholderTextColor="#AAAAAA"
            onChangeText={mobileNumber => this.setState({ mobileNumber })}
            value={this.state.mobileNumber}
            onFocus={this.clearUIErrors}
            keyboardType="numeric"
            maxLength={10}
          />
          <View style={styles.internalError}>
            {mobileNumberFieldError ? (
              <Text style={styles.internalErrorText}>
                {mobileNumberFieldError}
              </Text>
            ) : (
                <Text />
              )}
          </View>
          <TextInput
            style={[styles.inputField, { marginTop: 20 }]}
            placeholder="Password"
            placeholderTextColor="#AAAAAA"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            onFocus={this.clearUIErrors}
            keyboardType="default"
            secureTextEntry={true}
          />
          <View style={styles.internalError}>
            {passwordFieldError ? (
              <Text style={styles.internalErrorText}>
                {passwordFieldError}
              </Text>
            ) : (
                <Text />
              )}
          </View>
          <View style={[styles.forgotPasswordWrapper]}>
            <TouchableOpacity
              style={{alignSelf: 'flex-end'}}
              onPress={this.onButtonClick}
            >
              <Text style={styles.forgotPasswordTextStyle}>Forgot Password</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.tcLink}>
          {/* <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              this.props.navigation.navigate("termsNCondition");
            }}
          >
            <Text style={styles.tcLinkText}>
              By continuing you agree to our {"\n"}
              <Text style={styles.tcLinkTag}>Terms & conditions</Text>
            </Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btn}
            onPress={this.onPressHandler}>
            <Text style={styles.btnText}>Sign In</Text>
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
  return bindActionCreators({ onSignInAction, onClearErrorAction }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
