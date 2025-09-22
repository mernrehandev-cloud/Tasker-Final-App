const TaskerStatus = require('../models/tasker_status.model');

class Tasker_Status_Controller {
    constructor() {
    }
    async getTaskerStatus(req, res) {
        try {
            const taskerstatus = await TaskerStatus.find();
            res.status(200).json(taskerstatus);
        } catch (error) {
            res.status(500).json({ message: "Cant run get request of TaskStatus" });
        }
    }

    async createTaskerStatus(req, res) {
        try {
            const { Name, Icon } = req.body;

            const newTaskerstatus = await TaskerStatus.create({ Name, Icon });
            res.status(201).json(newTaskerstatus);
        } catch (error) {
            res.status(500).json({ error: error.message, message: "Server Error" });
        }
    }

    // async getTicketStatusById(req, res) {
    //     // Logic to get a user by ID
    //     const { id } = req.params;
    //     const ticketstatus = await TicketStatus.findById(id);
    //     if (!ticketstatus) {
    //         return res.status(404).json({ message: 'TicketStatus not found' });
    //     }
    //     console.log(`Fetching TicketStatus with ID: ${id}`);

    //     res.status(200).json(ticketstatus);
    //     console.log(`TicketStatus with ID: ${id} fetched successfully`);
    // }

    // async updateTicketStatus(req, res) {
    //     // Logic to update a user by ID
    //     const { id } = req.params;
    //     const { Name } = req.body;
    //     console.log(`Updating TicketStatus with ID: ${id} with Name: ${Name}`);

    //     const ticketstatus = await TicketStatus.findByIdAndUpdate(id, { Name }, { new: true });
    //     if (!ticketstatus) {
    //         return res.status(404).json({ message: 'TicketStatus not found' });
    //     }
    //     res.status(200).json(ticketstatus);
    // }

    // async deleteTicketStatus(req, res) {
    //     // Logic to delete a user by ID
    //     const { id } = req.params;
    //     const ticketstatus = await TicketStatus.findByIdAndDelete(id);
    //     if (!ticketstatus) {
    //         return res.status(404).json({ message: 'TicketStatus not found' });
    //     }
    //     res.status(200).json({ message: 'TicketStatus deleted successfully' });
    // }
}
const tasker_status_controller = new Tasker_Status_Controller();

module.exports = tasker_status_controller;