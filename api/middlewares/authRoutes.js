const jwt = require("jsonwebtoken");
module.exports = (role) => (req, res, next) => {
  try {
    const userData = jwt.verify(req.body.token, process.env.SECRET);
    if (role === userData.role) {
      req.user = userData;
      next();
    } else {
        res.status(401).json({
            message: "Not Authorized for this route"
        })
    }
  } catch (error) {
    res.status(401).json({
      message: "Not Authorized",
    });
  }
};
