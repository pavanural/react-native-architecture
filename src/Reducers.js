//All Reducers of the APP
import { combineReducers } from "redux";
import { NavigationActions } from "react-navigation";
import { createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";
import { tabOne } from "./features/tabOne/reducers";
import { tabTwo } from "./features/tabTwo/reducers";
import RootNavigator from "./Navigator";

const initialAction = { type: NavigationActions.Init };
const initialState = RootNavigator().router.getStateForAction(initialAction);

const navReducer = (state = initialState, action) => {
  return RootNavigator().router.getStateForAction(action, state);
};

export const navMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.navigation
);

export default combineReducers({
  navigation: navReducer,
  tabOne,
  tabTwo
});
