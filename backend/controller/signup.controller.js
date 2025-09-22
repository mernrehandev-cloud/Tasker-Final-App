const User = require("../models/user.model");
const bcrypt = require("bcrypt");

class SignupController {
    constructor() {
    }

    async signup(req, res) {
        try {
            const { Name, BirthDate, ContactNumber, Email, SecurityAnswer, SecurityQuestion } = req.body;
            let { Password, Image } = req.body
            console.log(req.body);

            if (!Image) {
                Image = "default-user.png";
            }

            if (Email) {
                const check = await User.findOne({ Email });
                if (check) {
                    return res.status(401).json({ message: "User already exist" });
                }
                else {
                    const encryptedpass = await bcrypt.hash(Password, 10);
                    Password = encryptedpass;

                    const newUser = await User.create({ Name, BirthDate, ContactNumber, Email, Password, Image, SecurityAnswer, SecurityQuestion });

                    console.log("new", newUser);

                    return res.status(201).json(newUser);
                }
            }



        } catch (error) {
            res.status(400).json({ message: error.message });
            console.log(error.message);
        }

    }

    // async signup(req, res) {
    //     const { Email, Name, BirthDate, ApiKey, ContactNumber, Image, LoginID, SecurityAnswer, SecurityQuestion, Role } = req.body;
    //     let { Password } = req.body;

    //     const HashPass = await bcrypt.hash(Password, 10);

    //     const newUser = await new User({
    //         Email,
    //         Name,
    //         Password: HashPass,
    //         BirthDate,
    //         ApiKey,
    //         ContactNumber,
    //         Image,
    //         LoginID,
    //         SecurityAnswer,
    //         SecurityQuestion,
    //         Role
    //     });

    //     await newUser.save();

    //     res.status(200).json({
    //         message: `user is created login now`
    //     });
    //     console.log(`${newUser} is created login now`);


    //     if (Email == "" || Name == "" || Password == "" || BirthDate == "") {
    //         res.status(200).json({ message2: "Error" });
    //     }
    // }
}

const signupController = new SignupController;

module.exports = signupController;