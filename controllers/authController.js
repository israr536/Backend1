const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/User.js');
const secret_key = "israrkhan@123456";

class AuthController {
  static userRegistration = async (req, res) => {
    try {
      const { username, email, password, role } = req.body;
      const user = await UserModel.findOne({ email: email });
      if (user) {
        return res.send({ "status": "failed", "message": "email has already existed" });
      }
  
      if (!username || !email || !password  || !role) {
        return res.send({ "status": "failed", "message": "all fields are required" });
      }
  
      if (!password.trim()) {
        return res.send({ "status": "failed", "message": "password is required" });
      }
  
      const hashPassword = await bcrypt.hash(password, 10);
      const doc = await UserModel.create({ username, email, password: hashPassword,role });
      const token = jwt.sign({ _id: doc._id, role: doc.role }, secret_key, { expiresIn: '5d' });
      const setToken = await UserModel.findByIdAndUpdate(
        { _id: doc._id },
        { token: token },
        { new: true }
      );
  
      return res.status(201).json({ status: 201, message: "succeed", token: token, role: setToken.role, username: setToken.username });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  };
  

  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        return res.send({ "status": "failed", "message": "user is not registered" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.send({ "status": "failed", "message": "password or email is wrong" });
      }

      const userId = user._id;
      const retrievedUser = await UserModel.findById(userId);
      if (!retrievedUser) {
        return res.send({ "status": "failed", "message": "user not found" });
      }

      const role = retrievedUser.role;
      if (!role) {
        return res.send({ "status": "failed", "message": "user role not found" });
      }

      const token = jwt.sign({ _id: userId, role: role }, secret_key, { expiresIn: '5d' });
      return res.status(202).json({ status: 202, message: "succeed", token: token, role: role, username: retrievedUser.username });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  };


  static getUserList = async (req, res) => {
    try {
      const userList = await UserModel.find();
      const formattedUserList = userList.map(user => ({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }));
  
      return res.status(200).json({ status: 200, message: 'User list retrieved successfully', userList: formattedUserList });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  };
  
  static deleteUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const deletedUser = await UserModel.findByIdAndDelete(userId);
      
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json({ status: 200, message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  };
  static updateUser = async (req, res) => {
    try {
      const { username, email, role, userId } = req.body; // Extract userId from the request body
  
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { username, email, role },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json({ status: 200, message: 'User updated successfully', user: updatedUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  };
  static resetPassword = async (req, res) => {
    try {
      const { userId, newPassword } = req.body; // Extract userId and newPassword from the request body
  
      const hashPassword = await bcrypt.hash(newPassword, 10);
  
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { password: hashPassword },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json({ status: 200, message: 'Password reset successfully', user: updatedUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  };
};
  



module.exports = AuthController;
