const { mongoose } = require('mongoose');
const User = require('../models/user.model');
const bcrypt = require("bcrypt");

class User_Controller {
    constructor() {
    }
    async getUsers(req, res) {
        const users = await User.find();
        // .populate('Role', 'Name');
        res.json(users);
    }

    async createUser(req, res) {
        const { Name, BirthDate, ContactNumber, Email, Image, SecurityAnswer, SecurityQuestion } = req.body;
        let { Password } = req.body

        const encryptedpass = await bcrypt.hash(Password, 10);

        Password = encryptedpass;

        const newUser = await new User({ Name, BirthDate, ContactNumber, Email, Password, Image, SecurityAnswer, SecurityQuestion });
        await newUser.save();
        res.status(201).json(newUser);
    }

    async getUserById(req, res) {
        const { id } = req.params;

        const user = await User.findById(id);

        console.log(`User with ID: ${id} fetched successfully`);
        return res.status(200).json(user);
    }

    async updateUser(req, res) {
        const { id } = req.params;
        const {
            Name, BirthDate, ContactNumber, Email, Image, SecurityAnswer, SecurityQuestion, Password
        } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let updateFields = {
            Name, BirthDate, ContactNumber, Email, Image, SecurityAnswer, SecurityQuestion, Password
        };

        if (Password && Password !== "") {
            updateFields.Password = await bcrypt.hash(Password, 10);
        }

        const result = await User.findByIdAndUpdate(id, updateFields, { new: true });
        console.log("update success");
        return res.status(200).json(result);
    }

    async deleteUser(req, res) {
        const { id } = req.params;
        let user = await User.findById(id);
        // const checkrole = await RoleMain.findById(user.Role._id);
        if (!user) {
            console.log("tried to delete unavailable user and failed");
            return res.status(404).json({ message: 'User not found' });
        }
        // else if (checkrole.Name === "Super Admin") {
        //     console.log("tried to delete admin and blocked");
        //     return res.status(404).json({ message: 'Not Allowed' });
        // }
        else {
            user = await User.findByIdAndDelete(id);
            console.log("tried to delete user and successful");
            res.status(200).json({ message: 'User deleted successfully' });
        }
    }

    // async getSuperAdminId(req, res) {
    //     // Find all users with populated Role
    //     const users = await User.find().populate('Role', 'Name');
    //     // Find the first user whose role name is "Super Admin"
    //     const superAdmin = users.find(u => u.Role && u.Role.Name === "Super Admin");
    //     // console.log(superAdmin);
    //     if (superAdmin) {
    //         return res.status(200).json({ SuperAdminID: superAdmin._id, Email: superAdmin.Email });
    //     } else {
    //         return res.status(404).json({ message: "Super Admin not found" });
    //     }
    // }

    async getUserByEmail(req, res) {
        const { Email } = req.params;
        const user = await User.findOne({ Email });
        if (!user) {
            return res.json({ message: 'User not found' });
        }

        res.status(200).json({
            Email: user.Email,
        });
        console.log(`User with email: ${Email} fetched successfully`);
    }
}

const user_controller = new User_Controller();

module.exports = user_controller;