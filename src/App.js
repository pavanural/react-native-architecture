import React, { Component, PureComponent } from "react";
import { Provider, connect } from "react-redux";
import { reduxifyNavigator } from "react-navigation-redux-helpers";
import { NavigationActions } from "react-navigation";
import RootNavigator from "./Navigator";
import Store from "./Store";
import { BackHandler } from "react-native";
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler
} from "./utils";


const ReduxAppNavigator = reduxifyNavigator(RootNavigator(), "root");
const getCurrentRoute = state =>
  state.index !== undefined
    ? getCurrentRoute(state.routes[state.index])
    : state.routeName;
class ReduxNavigation extends PureComponent {
  componentDidMount() {
    handleAndroidBackButton(() => {
      const { dispatch, state: nav } = this.props;
      let routeName = getCurrentRoute(nav);
      if (routeName === "loginRoute") {
        BackHandler.exitApp();
      } else {
        dispatch(NavigationActions.back());
      }
    });
  }

  componentWillUnmount() {
    removeAndroidBackButtonHandler();
  }

  render() {
    const { dispatch, state: nav } = this.props;
    return <ReduxAppNavigator dispatch={dispatch} state={nav} />;
  }
}

const mapNavStateProps = state => ({
  state: state.navigation
});

const Layout = connect(mapNavStateProps)(ReduxNavigation);
export default class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Layout />
      </Provider>
    );
  }
}
