import jwtHandler from "../common/utility/jwtHandler";
import authUtility from "../common/utility/authUtility";

function authMiddleware(req, res, next) {
    let authInfo = authUtility.getAuthInfo(req);
    if(!authInfo[0]) {
        res.status(401).send(authInfo[1]);
        return;
    }
    let authToken = authInfo[1];
    let authId = authInfo[2];
    let jwt = new jwtHandler({token:authToken, userId:authId});
    if(!jwt.isValid()) {
        res.status(401).send({
            msg: 'Auth token is not valid or expired!'
        });
        return;
    }
    next();
}

exports.authMiddleware = authMiddleware;
