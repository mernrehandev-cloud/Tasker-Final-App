const jwt = require("jsonwebtoken");
require("dotenv").config();

let tokenverify;

function iptrack(req, res, next) {
    const allowedHostname = 'localhost';
    console.log(`\nrequested by IP Address: ${req.ip}`);
    console.log(`requested from Host: ${req.host}`);
    console.log(`requested from Hostname: ${req.hostname}`);

    if (req.hostname !== allowedHostname) {
        return res.status(403).json({ message: 'Forbidden: Hostname not allowed' });
    }

    next();
}

async function jwtauthenticate(req, res, next) {
    try {
        // console.log('Test')
        // console.log(req.headers.tokenverify)
        const token = req.header(process.env.JWT_TOKENHEADER);

        // const token = localStorage.getItem('token');
        // const tokenlocal = res.header(token);
        const secretkey = process.env.JWT_SECRETKEY;
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        tokenverify = await jwt.verify(token, secretkey);
        console.log(token);
        console.log("verification working");

        if (tokenverify) {
            req.user = tokenverify;
            console.log("Token Verified Successfully");
            console.log("-----------------------------------");
            // res.status(200).json({ message: "Token Verified Successfully" });
            return next();

        }
    }
    catch (e) {
        if (e.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Authentication Failed" });
        }
    }
}


function adminOnly(req, res, next) {
    if (tokenverify && (tokenverify.Role === "Admin" || tokenverify.Role === "Super Admin")) {
        return next();
    }
    // console.log(req.user);
    // console.log(req.user.Role);
    // console.log(tokenverify);
    return res.status(403).json({ message: "Forbidden: Admins only" });
}

module.exports = { iptrack, jwtauthenticate, adminOnly };