import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import { Image } from "react-native";
import TabOneStack from "../tabOne/screens/TabOneStack";
import TabTwoStack from "../tabTwo/screens/TabTwoStack";
import { verticalScale, moderateScale, scale } from "react-native-size-matters";

const icons = {
  dashboard: {
    inactive: require("../../assets/nav_dashboard.png"),
    active: require("../../assets/nav_dashboard_selected.png")
  },
  trends: {
    inactive: require("../../assets/nav_trends.png"),
    active: require("../../assets/nav_trends_selected.png")
  },
  tools: {
    inactive: require("../../assets/nav_tools.png"),
    active: require("../../assets/nav_tools_selected.png")
  },
  transaction: {
    inactive: require("../../assets/nav_transactions.png"),
    active: require("../../assets/nav_transactions_selected.png")
  },
  help: {
    inactive: require("../../assets/nav_help.png"),
    active: require("../../assets/nav_help_selected.png")
  },
  profile: {
    inactive: require("../../assets/nav_profile.png"),
    active: require("../../assets/nav_profile_selected.png")
  }
};


const routesConfig = {
  tabRouteOne: {
    screen: TabOneStack,
    navigationOptions: {
      tabBarLabel: "Tab 1",
      tabBarIcon: ({ focused }) =>
        focused ? (
          <Image
            resizeMode="contain"
            source={icons.dashboard.active}
            style={{
              height: verticalScale(30),
              width: scale(30)
            }}
          />
        ) : (
            <Image
              resizeMode="contain"
              source={icons.dashboard.inactive}
              style={{
                height: verticalScale(30),
                width: scale(30)
              }}
            />
          )
    }
  },
  tabRouteTwo: {
    screen: TabTwoStack,
    navigationOptions: {
      tabBarLabel: "Tab 2",
      tabBarIcon: ({ focused }) =>
        focused ? (
          <Image
            resizeMode="contain"
            source={icons.trends.active}
            style={{
              height: verticalScale(30),
              width: scale(30)
            }}
          />
        ) : (
            <Image
              resizeMode="contain"
              source={icons.trends.inactive}
              style={{
                height: verticalScale(30),
                width: scale(30)
              }}
            />
          )
    }
  },
  // tabRouteThree: {
  //   screen: TabThreeStack,
  //   navigationOptions: {
  //     tabBarLabel: "Tab 3",
  //     tabBarIcon: ({ focused }) =>
  //       focused ? (
  //         <Image
  //           resizeMode="contain"
  //           source={icons.tools.active}
  //           style={{
  //             height: verticalScale(30),
  //             width: scale(30)
  //           }}
  //         />
  //       ) : (
  //           <Image
  //             resizeMode="contain"
  //             source={icons.tools.inactive}
  //             style={{
  //               height: verticalScale(30),
  //               width: scale(30)
  //             }}
  //           />
  //         )
  //   }
  // }
};

const navigationConfig = {
  tabBarOptions: {
    activeTintColor: "#F47626",
    inactiveTintColor: "gray",
    labelStyle: {
      fontSize: moderateScale(11)
    },
    style: {
      height: verticalScale(60)
    }
  }
};

const HomeTabs = createAppContainer(
  createBottomTabNavigator(routesConfig, navigationConfig)
);

const Stack = createStackNavigator({
  home: {
    screen: ({ navigation }) => {
      return <HomeTabs
        onNavigationStateChange={(prevState, newState) => {
        }}
        screenProps={navigation}
      />
    },
    navigationOptions: {
      header: null,
      headerStyle: { elevation: 0, shadowOpacity: 0 }
    }
  },
  // terminals: {
  //   screen: Terminals,
  //   navigationOptions: ({ navigation }) => {
  //     return {
  //       headerTitle: <ScreenHeader name="Terminals" />,
  //       headerLeft: (
  //         <BackArrow
  //           onPress={() => {
  //             navigation.goBack();
  //           }}
  //         />
  //       ),
  //       headerStyle: { backgroundColor: "#F9F9F9", height: verticalScale(50) }
  //     };
  //   }
  // },
  
});
export default Stack;
