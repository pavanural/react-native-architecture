import {
  createStackNavigator
} from "react-navigation";
import TabOne from "./index";
// import Transaction from "../../transaction/screens";


const TabOneStack = createStackNavigator({
  TabOneHomeRoute: {
    screen: TabOne,
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
export default TabOneStack;
