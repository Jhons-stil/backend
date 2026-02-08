const jwt = require("jsonwebtoken");
const { resGagal } = require("../../payloads/paylad");

const verifyToken =
  (roles = []) =>
  (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return resGagal(res, 401, "error", "Token tidak ada");
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        return resGagal(res, 401, "error", "Format token salah");
      }

      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;

      if (roles.length && !roles.includes(decode.role)) {
        return resGagal(res, 403, "error", "Akses ditolak");
      }
      next();
    } catch (error) {
      return resGagal(res, 401, "error", error.message);
    }
  };

module.exports = verifyToken;
