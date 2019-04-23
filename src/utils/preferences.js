import { AsyncStorage } from "react-native";

export const kLoginTokenKey = "kLoginTokenKey";
export const kLoggedInUserMobileNumberKey = "kLoggedInUserMobileNumberKey";
export const kProfileInfoKey = "kProfileInfoKey";
export const kOnboardMerchantSessionTimeKey = "kOnboardMerchantSessionTimeKey";
export const kUpdateInfoKey = "kUpdateInfoKey";
export const kIntroShouldShow = "kIntroShouldShow";

export const set = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    throw error;
  }
};

export const get = async key => {
  try {
    let value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    throw error;
  }
};

export const remove = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    throw error;
  }
};

export const removeAll = async () => {
  try {
    await remove(kLoginTokenKey);
    await remove(kLoggedInUserMobileNumberKey);
    await remove(kProfileInfoKey);
  } catch (error) {
    throw error;
  }
};
