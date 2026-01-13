const resSukess = (res, code, status, message, data) => {
  res.status(code).json({ status, message, data });
};

const resGagal = (res, code, status, message) => {
  res.status(code).json({ status, message });
};

export { resSukess, resGagal };
