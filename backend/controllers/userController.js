import userModel from "../models/userModel.js";

export const getAllUsers = async (req, res, next) => {
    try {
        let users = await userModel.find({});
        return res.status(200).json({ users });
    } catch (error) {
        return res.status(400).json({ error });
    }
}

export const getLoggedUser = async (req, res, next) => {
    try {
        let user = await userModel.findById({ _id: req.user.id }).select('-password');
        if (!user) {
            return res.status(400).json({ message: "user not found" });
        }
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(400).json({ error });
    }
}