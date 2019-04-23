import React, { Component } from "react";
import { Loader } from "../components";
import { bindActionCreators } from "redux";
import { onSessionExtension } from "../features/auth/actions";
import { connect } from "react-redux";
import {
  set,
  kUpdateInfoKey
} from "../utils/preferences";

class AutoLogin extends Component {
  componentWillMount() {
    set(kUpdateInfoKey, '')
    this.props.onSessionExtension();
  }

  render() {
    return <Loader />;
  }
}

const mapStateToProps = ({ auth }) => {
  let { loading, error, data } = auth;
  return { loading, error, data };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ onSessionExtension }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AutoLogin);
