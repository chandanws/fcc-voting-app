const getList = (resource, data) => {
  return {
    status: "success",
    data: {
      [resource]: data
    }
  };
};

module.exports = {
  getList
};
