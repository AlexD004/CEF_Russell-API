const jwt = require('jsonwebtoken');

exports.checkJWT = async (req, res, next) => {

    /*let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!!token && token.startsWith('Bearer')) {
        token = token.slice(7, token.lenght);
    }

    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json('token not valid');
            } else {
                req.decoded = decoded;

                const expireIn = 24 * 60 * 60;
                const newToken = jwt.sign({
                    user: decoded.user
                },
                SECRET_KEY,
                {
                    expiresIn: expireIn
                });

                res.header('Authorization', 'Bearer ' + newToken);
                next();
            }
        });
    } else {
        return res.status(401).json('token required');
    }*/

    const authCookie = req.cookies['jwt'];

    if(authCookie == null) return res.sendStatus(401);

    jwt.verify(authCookie, process.env.SECRET_KEY, (err, user) => {
        if(err) return res.sendStatus(403);

        req.user = user;
        next();
    })
}