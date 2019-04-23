import React, { Component } from "react";
import { View, TouchableOpacity, Text, Image, ScrollView } from "react-native";

import styles from "./styles";
import {
  set,
  kIntroShouldShow
} from "../../../../utils/preferences";
import { booleanTypeEnum } from '../../../../enum/booleanTypeEnum'

class Intro extends Component {
  render() {
    return (
      <ScrollView
        style={styles.wrapper}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.iconWrapper}>
            <Image
              style={styles.icon}
              source={require("../../../../assets/congratulations_graphics.png")}
              resizeMode="contain"
            />
          </View>
          <View style={styles.title}>
            <Text style={styles.titleText}>
              Congratulations on joining Innoviti POS Digital Payments
            </Text>
          </View>
          <View style={styles.desc}>
            <Text style={styles.descText}>
              With Innoviti POS Tracker, you can review your transactions, analyse business trends, calculate EMIs and contact Help Desk, all with a single touch!
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btn}
            onPress={async () => { await set(kIntroShouldShow, booleanTypeEnum.NO); this.props.navigation.navigate("homeRoute") }}
          >
            <Text style={styles.btnText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default Intro;
