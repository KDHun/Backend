const jwt = require("jsonwebtoken");
module.exports = (role) => (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader) {
    req.sendStatus(401);
    return;
  }
  const token = authHeader.split(' ')[1];
  try {
    const userData = jwt.verify(token, process.env.SECRET);
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
