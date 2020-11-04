import jwtHandler from "../../common/utility/jwtHandler";
const crypto = require('crypto');
const User = require('../../model/user/userModel');

exports.userPostController = async (req, res) => {
    let data = req.body;
    let username = data['username'];
    let users = await User.find({username: username});
    if(Object.keys(users).length > 0) {
        res.status(400).send({msg: 'Duplicate username!'});
        return;
    }
    data['password'] = crypto.createHash('sha256').update(data['password']).digest('hex');

    let user = new User({
        ...data,
        isAdmin: false,
        isActive: true
    });
    user.save().then(response => {
        res.status(201).send(response);
    }).catch(err => {
        res.status(400).send({msg: err});
    });
};

exports.userGetController = (req, res) => {
    let userId = req.params.id;
    User.findById(userId).then(response => {
        response['password'] = undefined;
        res.status(200).send(response);
    }).catch(reason => {
        res.status(400).send({msg: reason});
    });
};

exports.userLoginController = async (req, res) => {
    let data = req.body;
    let username = data['username'];
    let password = data['password'];

    if((username!==null && username!==undefined) && (password!==null && password!==undefined)) {
        loginByUsername(res, username, password);
        return;
    } else {
        let authToken = data['authToken'];
        let userId = data['authId'];
        if((authToken!==null && authToken!==undefined) && (userId!==null && userId!==undefined)) {
            await loginByToken(res, authToken, userId);
            return;
        }
    }
    res.status(400).send({msg: 'Error occurs while login'});
};

function loginByUsername(res, username, password) {
    password = crypto.createHash('sha256').update(password).digest('hex');
    User.find({username: username}).then(users => {
        if(Object.keys(users).length === 0)
            throw 'User does not exist!';
        let user = users[0];
        if(user['password']!==password)
            throw 'Password does not match!';
        user['password'] = undefined;
        let jwt = new jwtHandler({
            userId: user['_id']
        });
        let token = jwt.generateToken();

        res.status(200).send({
            user: user,
            token: token
        });
    }).catch(err => {
        res.status(400).send({msg: err});
    });
}

async function loginByToken(res, authToken, userId) {
    try {
        let jwt = new jwtHandler({token: authToken, userId: userId});
        if(jwt.isValid()) {
            let user = await User.findById(userId);
            user['password'] = undefined;
            res.status(200).send({
                user: user,
                token: authToken
            });
        }
    } catch (e) {
        res.status(400).send({msg: e});
    }
}
