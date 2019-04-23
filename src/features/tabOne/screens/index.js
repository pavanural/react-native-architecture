import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl
} from "react-native";
import { getTabOneDataAction } from "../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "../styles";

class TabOne extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        params.onTabFocus();
        defaultHandler();
      }
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({
      onTabFocus: this.getData
    });
    this.getData();
  }

  getData = () => {
    let params = {  };
    this.props.getTabOneDataAction(params);
  };


  render() {
    return (<View></View>)
  }
}

const mapStateToProps = ({ tabOne, auth }) => {
  return { ...tabOne };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getTabOneDataAction }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabOne);
