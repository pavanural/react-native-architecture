import { ScaledSheet, moderateScale } from "react-native-size-matters";
const styles = ScaledSheet.create({
  wrapper: {
    flex: 1
    //backgroundColor: "skyblue"
    //padding: "20@ms"
  },
  logoWrapper: {
    flex: 0.2,
    //backgroundColor: "steelblue",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: "183@s",
    height: "24@vs"
  },
  inputFieldWrapper: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center"
  },
  inputField: {
    width: "320@s",
    height: "50@ms",
    borderWidth: 1,
    paddingLeft: "12@ms",
    fontSize: "18@ms",
    borderColor: "#9B9B9B"
  },
  tcLink: {
    flex: 0.4,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  tcLinkText: {
    fontSize: "16@ms",
    color: "#AAAAAA",
    textAlign: "center"
  },
  tcLinkTag: {
    textDecorationLine: "underline",
    color: "#1155cc"
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
    alignItems: "flex-end",
    textAlign: "right",
    color: "red"
  },
  internalErrorText: {
    textAlign: "right",
    color: "red"
  },
  forgotPasswordWrapper: {
    width: "320@s",
  },
  forgotPasswordTextStyle: {
    textAlign: 'right',
    color: 'rgb(170,170,170)',
    alignSelf: 'flex-end',
    textDecorationLine: "underline",
    color: "#1155cc"
  }
});

export default styles;
