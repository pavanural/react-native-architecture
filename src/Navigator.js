import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { AutoLogin, Auth, Home } from "./features";

export default (RootNavigator = () => {
  return createSwitchNavigator(
    {
      autoLoginRoute: {
        screen: AutoLogin
      },
      authRoute: {
        screen: Auth
      },
      homeRoute: {
        screen: Home,
        navigationOptions: {
          header: null
        }
      }
    },
    {
      initialRouteName: "homeRoute"
    }
  );
});
