const successGET = (resource, data) => {
  return {
    status: "success",
    data: {
      [resource]: data
    }
  };
};

const successDELETE = () => {
  return {
    status: "success",
    data: null
  };
};

const failDELETE = resource => {
  return {
    status: "fail",
    data: { [resource]: "Specified resource not found." }
  };
};

/**
 *
 * @param {string} postParam post param which is causing a problem
 * @param {string} message Message explaining the problem caused by param in detail
 * @return {object} jSend type response object with status and data, data is object which has a key of postParam and message explaining it
 */
const failPOST = (postParam, message) => {
  return {
    status: "fail",
    data: {
      [postParam]: message
    }
  };
};

const serverError = (message = "Server error") => {
  return {
    status: "error",
    message
  };
};

module.exports = {
  successGET,
  successDELETE,
  failDELETE,
  failPOST,
  serverError
};
