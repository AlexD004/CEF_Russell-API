const jwt = require('jsonwebtoken');

exports.checkJWT = async (req, res, next) => {

    const authCookie = req.cookies['jwt'];

    if(authCookie == null) return res.sendStatus(401);

    jwt.verify(authCookie, process.env.SECRET_KEY, (err, user) => {
        if(err) return res.sendStatus(403);

        req.user = user;
        const expireIn = 24 * 60 * 60;
        const newToken = jwt.sign({
            user: user.user
        },
        process.env.SECRET_KEY,
        {
            expiresIn: expireIn
        });

        res.header('Authorization', 'Bearer ' + newToken);
        next();
    })
}