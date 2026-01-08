const responSukses = (res, code, message, data) => {
  res.status(code).json({ message, data });
};

const responGagal = (res, code, message) => {
  res.status(code).json({ message });
};

export { responSukses, responGagal };

