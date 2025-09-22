const { mongoose } = require('mongoose');
const TaskerTasks = require('../models/tasker_tasks.model');

class TaskerTask_Controller {
    constructor() {
    }
    async getTasks(req, res) {
        try {
            const Tasks = await TaskerTasks.find().populate('Status').populate('Category');
            res.status(200).json(Tasks);
        } catch (error) {
            res.status(400).json({ error: error.message, errortype: error.type, message: "Cant run get request of Tasks" });
        }
    }

    async createTasks(req, res) {
        try {
            const { Title, Desc, DueDate, DueTime, Progress, Category, Status } = req.body;

            const newTask = await TaskerTasks.create({ Title, Desc, DueDate, DueTime, Progress, Category, Status });
            res.status(201).json(newTask);
        } catch (error) {
            res.status(500).json({ error: error.message, message: "Server Error" });
        }
    }

    // async getUserById(req, res) {
    //     // Logic to get a user by ID
    //     const { id } = req.params;
    //     const user = await User.findById(id);
    //     const checkrole = await RoleMain.findById(user.Role._id);

    //     if (!user) {
    //         return res.status(404).json({ message: 'User not found' });
    //     }
    //     if (checkrole.Name === "Super Admin") {

    //     }

    //     console.log(`Fetching User with ID: ${id}`);
    //     // Extract the Role ID from the User
    //     const { Role } = user;
    //     console.log(`Role ID associated with User: ${Role}`);

    //     // Find the Role name using the Role ID
    //     const RoleFind = await RoleMain.findById(Role);
    //     if (!RoleFind) {
    //         return res.status(404).json({ message: 'Role not found' });
    //     }
    //     // Return the Role details along with the Role name

    //     res.status(200).json({
    //         UserName: user.Name,
    //         ApiKey: user.ApiKey,
    //         BirthDate: user.BirthDate,
    //         ContactNumber: user.ContactNumber,
    //         Email: user.Email,
    //         Image: user.Image,
    //         LoginID: user.LoginID,
    //         Password: user.Password,
    //         SecurityQuestion: user.SecurityQuestion,
    //         SecurityAnswer: user.SecurityAnswer,

    //         Role: RoleFind.Name,
    //     });
    //     console.log(`User details: ${JSON.stringify({
    //         UserName: user.Name,
    //         ApiKey: user.ApiKey,
    //         BirthDate: user.BirthDate,
    //         ContactNumber: user.ContactNumber,
    //         Email: user.Email,
    //         Image: user.Image,
    //         LoginID: user.LoginID,
    //         Password: user.Password,
    //         SecurityQuestion: user.SecurityQuestion,
    //         SecurityAnswer: user.SecurityAnswer,

    //         Role: RoleFind.Name,
    //     })}`);

    //     console.log(`\n ${JSON.stringify({
    //         UserID: user._id,
    //         RoleID: RoleFind._id
    //     })}`);
    //     console.log(`User with ID: ${id} fetched successfully`);
    // }

    async updateTask(req, res) {
        const { id } = req.params;
        const {
            Title, Desc, DueDate, DueTime, Progress, Category, Status
        } = req.body;

        const newtask = await TaskerTasks.findById(id);
        if (!newtask) {
            return res.status(404).json({ message: 'User not found' });
        }

        let updateFields = {
            Title, Desc, DueDate, DueTime, Progress, Category, Status
        };

        const result = await TaskerTasks.findByIdAndUpdate(id, updateFields, { new: true });
        console.log("update success for:", updateFields.Title);
        return res.status(200).json(result);
    }

    async deleteTask(req, res) {
        try {
            const { id } = req.params;

            const deltask = await TaskerTasks.findByIdAndDelete(id);
            console.log("tried to delete task");
            return res.status(200).json({ deletask: deltask, message: 'Task deleted' });
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }
}

const tasks_controller = new TaskerTask_Controller();

module.exports = tasks_controller;