import { ScaledSheet } from "react-native-size-matters";
const styles = ScaledSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 0.8,
    paddingLeft: "40@ms",
    paddingRight: "40@ms",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch"
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    width: "160@s",
    height: "140@vs"
  },
  title: {},
  titleText: {
    color: "#F47626",
    fontSize: "20@ms",
    textAlign: "center"
  },
  desc: {},
  descText: {
    color: "#777777",
    fontSize: "16@ms",
    lineHeight: "22@ms",
    textAlign: "center"
  },
  footer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center"
  },
  btn: {
    width: "320@s",
    height: "50@vs",
    borderRadius: "2@ms",
    backgroundColor: "#F47626",
    justifyContent: "center",
    alignItems: "center"
  },
  btnText: {
    fontSize: "16@ms",
    color: "#ffffff",
    textAlign: "center"
  }
});

export default styles;
