const resSuccess = (res, code, status, message, data) => {
  res.status(code).json({ status, message, data });
};

const resError = (res, code, status, message) => {
  res.status(code).json({ status, message });
};

export { resSuccess, resError };
