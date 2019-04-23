import { BackHandler } from "react-native";

const validations = {
  checkEmptyField: params => {
    if (params) {
      const value = params.replace(/\s/g, "");
      return value.length >= 1;
    } else {
      return false;
    }
  },
  checkMobileNumber: params => {
    const regExp = /^\d{10}$/;
    const value = params.match(regExp);
    return value && value.length >= 1;
  },
  checkOTPNumber: params => {
    const regExp = /^\d{6}$/;
    const value = params.match(regExp);
    return value && value.length >= 1;
  },
  checkEmailId: params => {
    const regX = new RegExp(/^[a-zA-Z0-9_]+(\.[_a-zA-Z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/)
    return regX.test(params)
  }
};

const handleAndroidBackButton = callback => {
  BackHandler.addEventListener("hardwareBackPress", () => {
    callback();
    return true;
  });
};

const removeAndroidBackButtonHandler = () => {
  BackHandler.removeEventListener("hardwareBackPress", () => {});
};

const getLoginSessionId = ({ data }) => {
  let {
    loginSessionDetails: { loginSessionId }
  } = data;
  return loginSessionId;
};

const getLoginUserName = ({data}) => {
  const {
    userDetails: { name }
  } = data;
  return name;
}

const formateDate = dateTime => {
  let d = new Date(dateTime),
    locale = "en-us";
  let date = d.toLocaleString(locale, {
    day: "2-digit",
    month: "short"
  });
  let time = d.toLocaleString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
  return `${date}, ${time}`;
};


export {
  validations,
  handleAndroidBackButton,
  removeAndroidBackButtonHandler,
  getLoginSessionId,
  getLoginUserName,
  formateDate
};
