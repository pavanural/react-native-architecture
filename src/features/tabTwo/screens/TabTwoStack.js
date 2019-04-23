import {
  createStackNavigator
} from "react-navigation";
import TabTwo from "./index";
// import Transaction from "../../transaction/screens";


const TabTwoStack = createStackNavigator({
  TabOneHomeRoute: {
    screen: TabTwo,
    navigationOptions: {
      header: null
    }
  },
  // transactionRoute: {
  //   screen: ({ navigation, screenProps }) => (
  //     <Transaction screenProps={{ rootNavigation1: navigation, homeNavigation: screenProps }} />
  //   ),
  //   navigationOptions: {
  //     header: null
  //   }
  // }
});
export default TabTwoStack;
