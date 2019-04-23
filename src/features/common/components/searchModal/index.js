import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  SafeAreaView
} from "react-native";
import {
  ScaledSheet,
  moderateScale,
  verticalScale,
  scale
} from "react-native-size-matters";
import { Header } from "../../../common/components";
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  btn: {
    borderWidth: 1,
    padding: 10
  }
});

const ListItem = props => (
  <TouchableOpacity
    activeOpacity={0.7}
    style={{
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#E1E3E2",
      padding: scale(12),
      marginHorizontal: scale(15)
    }}
    onPress={() => {
      props.Callback(props.utid);
    }}
  >
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View style={{ flex: 8, flexWrap: "wrap" }}>
        <Text style={{ color: "#4A4A4A", fontSize: moderateScale(14) }}>
          {props.title}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default class SearchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }

  onSelect = selectedterminal => {
    this.props.onDone(selectedterminal);
    this.props.onClose();
  };
  renderHeader = () => {
    return <Text>Select Terminals</Text>;
  };

  render() {
    let { visible, title } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={() => {}}
      >
        <SafeAreaView>
          <View style={{ height: verticalScale(50), flexDirection: "row" }}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Header
                backButton={true}
                backButtonHandler={this.props.backButtonHandler}
                image={false}
                elevation={true}
                title={title}
                activeOpacity={1}
                callback={() => {}}
              />
            </View>
          </View>

        </SafeAreaView>
      </Modal>
    );
  }
}
