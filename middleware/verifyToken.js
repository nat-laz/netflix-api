import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    //console.log("Auth header exist")
    const token = authHeader.split(" ")[1];
    //console.log("TOKEN --------", token)
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json({ error: "Token is not valid!" });
      req.user = user;

      next();
    });
  } else {
    //console.log("Auth header does not exist")
    return res.status(401).json({ error: "You are not authenticated!" });
  }
};

export default verifyToken;
