const { mongoose } = require('mongoose');
const TaskerCategory = require('../models/tasker_category.model');

class TaskerCategory_Controller {
    constructor() {
    }
    async getTaskerCategory(req, res) {
        try {
            const Taskercategory = await TaskerCategory.find();
            res.status(200).json(Taskercategory, { message: `Total TaskCategory: ${Taskercategory.length}` });
        } catch (error) {
            res.status(400).json({ message: "Cant run get request of TaskCategory" })
        }
    }

    async createTaskerCategory(req, res) {
        try {
            const { Name, ColorCode } = req.body;

            const newTaskerCategory = await TaskerCategory.create({ Name, ColorCode });
            res.status(201).json(newTaskerCategory);
        } catch (error) {
            res.status(500).json({ error: error.message, message: "Server Error" });
        }
    }

    // async getTaskerCategoryById(req, res) {
    //     // Logic to get a user by ID
    //     const { id } = req.params;
    //     const TaskerCategory = await TaskerCategory.findById(id);
    //     if (!TaskerCategory) {
    //         return res.status(404).json({ message: 'AdvertisementCategory not found' });
    //     }
    //     console.log(`Fetching AdvertisementCategory with ID: ${id}`);

    //     res.status(200).json(TaskerCategory)

    //     console.log(`AdvertisementCategory with ID: ${id} fetched successfully`);
    // }

    // async updateTaskerCategory(req, res) {
    //     // Logic to update a user by ID
    //     const { id } = req.params;
    //     const { Name, Image } = req.body;
    //     console.log(`Updating AdvertisementCategory with ID: ${id} with Name: ${Name} and Image: ${Image}`);

    //     const TaskerCategory = await TaskerCategory.findByIdAndUpdate(id, { Name, Image }, { new: true });
    //     if (!TaskerCategory) {
    //         return res.status(404).json({ message: 'AdvertisementCategory not found' });
    //     }
    //     res.status(200).json(TaskerCategory);
    // }

    // async deleteTaskerCategory(req, res) {
    //     // Logic to delete a user by ID
    //     const { id } = req.params;
    //     const TaskerCategory = await TaskerCategory.findByIdAndDelete(id);
    //     if (!TaskerCategory) {
    //         return res.status(404).json({ message: 'AdvertisementCategory not found' });
    //     }
    //     res.status(200).json({ message: 'AdvertisementCategory deleted successfully' });
    // }
}
const TaskerCategory_controller = new TaskerCategory_Controller();

module.exports = TaskerCategory_controller;