const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token;
    if (req.body.headers) {
        token = req.body.headers.Authorization.split(" ")[1];
    } else {
        token = req.get("Authorization").split(" ")[1];
    }
    
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, "jamifymuzik")
    }
    catch (err) {
        console.log(err)
    }
    if (!decodedToken) {
        throw new Error("Not authenticated");
    }
    req.userId = decodedToken.email;
    next();
}
