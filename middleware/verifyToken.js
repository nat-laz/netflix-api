import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    //console.log("TOKEN --------", token)
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) res.status(403).json({ error: "Token is not valid!" });
      req.user = user;

      next();
    });
  } else {
    return res.status(401).json({ error: "You are not authenticated!" });
  }
};

export default verifyToken;
