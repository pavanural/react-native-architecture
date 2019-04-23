import { ScaledSheet } from "react-native-size-matters";
const styles = ScaledSheet.create({
  wrapper: {
    flex: 1
  },
  info: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center"
  },
  ackText: {
    fontSize: "16@ms",
    color: "#AAAAAA",
    textAlign: "center"
  },
  mobileNumber: {
    fontFamily: 'Roboto-Bold',
    color: "#000000"
  },

  inputFieldWrapper: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center"
  },
  fieldContainer: {
    width: "300@s",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  inputField: {
    width: "46@s",
    height: "46@vs",
    justifyContent: "center",
    borderColor: "#979797",
    borderRadius: 3,
    color: "#000000",
    fontSize: '18@ms'
  },
  inputFieldFullWidth: {
    width: "320@s",
    height: "50@ms",
    borderWidth: 1,
    paddingLeft: "12@ms",
    fontSize: "18@ms",
    borderColor: "#9B9B9B",
    marginTop: "10@ms"
  },
  middleWrapper: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center"
  },
  mdwrap: {
    height: "101@vs"
  },
  resendBtnWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  resendBtnTitle: {
    textDecorationLine: "underline",
    color: "#1155cc"
  },
  tcLinkText: {
    fontSize: "16@ms",
    color: "#AAAAAA",
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
  },
  internalError: {
    width: "320@s",
    justifyContent: "center",
    textAlign: "right",
    color: "red"
  },
  internalErrorText: {
    textAlign: "right",
    color: "red"
  }
});

export default styles;
