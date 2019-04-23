import HttpApiCallError from "./HttpApiCallError";

const asyncFetch = async (url, requestConfig = {}) => {
  try {
    let error = null,
      message = null;
    const response = await fetch(url, requestConfig);
    const isSuccess = response.status >= 200 && response.status < 300;
    if (isSuccess) {
      return response.json();
    }
    if (!response.statusText) {
      let { error } = JSON.parse(response._bodyText);
      message = error;
    } else {
      message = response.statusText;
    }

    error = new HttpApiCallError(message, response.status);
    error.response = response.json();

    throw error;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    } else {
      throw new Error(error.message);
    }
  }
};

export default asyncFetch;

