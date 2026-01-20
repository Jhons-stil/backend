const responSukses = (res, code, status, message, data) => {
  res.status(code).json({ status, message, data });
};

const responError = (res, code, status, message, data) => {
  res.status(code).json({ status, message, data });
};

export { responSukses, responError };
