const User = require("../models/user.model");
const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt");

class LoginController {
    constructor() {
    }

    async login(req, res) {
        const { Email, Password } = req.body;
        if (Email || Password) {
            const user = await User.findOne({ Email });
            if (!user) {
                res.status(404).json({ message: "User not found" });
                console.log("not found");
                return;
            }
            if (!Password) {
                res.status(404).json({ message: "Password required" });
                console.log("no password entered");
            }
            else {
                const checkpass = await bcrypt.compare(Password, user.Password);
                if (!checkpass) {
                    res.status(401).json({ message: "Password is incorrect" });
                    console.log("password incorrect");
                    return;
                }
                const key = process.env.JWT_SECRETKEY;
                const expiry = process.env.JWT_EXPIRE;
                const Tokenhead = process.env.JWT_TOKENHEADER;

                const options = {
                    expiresIn: Number(expiry)
                };

                const payload = {
                    _id: user._id,
                    Name: user.Name,
                    Email: user.Email,
                    // Role: checkrole.Name
                };

                const token = await jwt.sign(
                    payload,
                    key,
                    options
                );

                res.header(
                    Tokenhead,
                    token
                );


                // if (checkrole.Name === "Admin") {
                //     return res.status(200).json({
                //         token: token,
                //         user: user,
                //         message: "Admin Logged In Successful",
                //         redirect: "/public/admin_main/",
                //         role: checkrole.Name
                //     });
                // }

                // if (checkrole.Name === "Super Admin") {
                //     return res.status(200).json({
                //         token: token,
                //         user: user,
                //         message: "Super Admin Logged In Successful",
                //         redirect: "/public/admin_main/",
                //         role: checkrole.Name
                //     });
                // }

                console.log(`${user.Email} found \n token: ${token} \n user: ${user} \n message: User ${user.Name} Logged In Successful`);
                console.log("------------------------------------")
                return res.status(200).json({
                    token: token,
                    user: user,
                    message: `User ${user.Name} Logged In Successful`,
                });
            }
            // const checkrole = await Role.findById(user.Role);



        }
        else {
            res.status(401).json({ message: "Credentials wrong" });
        }

    }
}

const loginController = new LoginController;

module.exports = loginController;