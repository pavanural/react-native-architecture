import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
//import styles from "../../styles";
import { ScaledSheet, verticalScale } from "react-native-size-matters";
import { BackArrow } from '../../../../components/backArrow'
import { DummyView } from '../../../../components/headerComponent'

const styles = ScaledSheet.create({
  header: {
    backgroundColor: "#F9F9F9",
    flexDirection: 'row'
  },
  selectField: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "50@vs",
    flexDirection: "row"
  },
  selectFieldText: {
    textAlign: "center",
    color: "#666666",
    fontSize: "16@vs",
    lineHeight: "19@vs",
    fontFamily: "Roboto",
  },
  imageStyle: {
    width: "18@s",
    height: "12@s",
    marginLeft: "4@s"
  },
  backArrowHolder: {
    height: '50@vs'
  }
});

const Header = props => {
  return (
    <View style={[styles.header, { elevation: props.elevation ? 3 : 0 }]}>
      {props.backButton ? <View style={styles.backArrowHolder}><BackArrow onPress={() => props.backButtonHandler()} /></View> : null}
      <View style={{ flex: 1, backgroundColor: '#F9F9F9' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            activeOpacity={props.activeOpacity || 0.7}
            style={styles.selectField}
            onPress={props.callback}
          >
            <Text style={styles.selectFieldText}>{props.title}</Text>
            {props.image ? (
              <Image
                style={styles.imageStyle}
                source={require("../../../../assets/dropdown_arrow.png")}
              />
            ) : null}
          </TouchableOpacity>

        </View>
      </View>
      {props.backButton ? <DummyView /> : null}
    </View >
  );
};
export default Header;
