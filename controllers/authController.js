const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/User.js');
const secret_key = "israrkhan@123456";

class AuthController {
  static userRegistration = async (req, res) => {
    try {
      const { username, email, password, role } = req.body;
  
      // Check if the username already exists
      const existingUser = await UserModel.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ status: 'failed', message: 'Username already exists' });
      }
  
      const user = await UserModel.findOne({ email: email });
      if (user) {
        return res.status(400).json({ status: 'failed', message: 'Email has already existed' });
      }
  
      if (!username || !email || !password || !role) {
        return res.status(400).json({ status: 'failed', message: 'All fields are required' });
      }
  
      if (!password.trim()) {
        return res.status(400).json({ status: 'failed', message: 'Password is required' });
      }
  
      const hashPassword = await bcrypt.hash(password, 10);
      const doc = await UserModel.create({ username, email, password: hashPassword, role });
      const token = jwt.sign({ _id: doc._id, role: doc.role }, secret_key, { expiresIn: '5d' });
      const setToken = await UserModel.findByIdAndUpdate(
        { _id: doc._id },
        { token: token },
        { new: true }
      );
  
      return res.status(201).json({ status: 201, message: 'Registration successful', token, role: setToken.role, username: setToken.username });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  };
  

  static userLogin = async (req, res) => {
    try {
      const { email, username: inputUsername, password } = req.body;
  
      // Find the user by email or username
      const user = await UserModel.findOne({
        $or: [
          { email: email },
          { username: inputUsername }
        ]
      });
  
      if (!user) {
        return res.status(401).json({ status: 'failed', message: 'Invalid email or username' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ status: 'failed', message: 'Invalid password' });
      }
  
      const { _id, role, username } = user;
  
      const token = jwt.sign({ _id, role }, secret_key, { expiresIn: '5d' });
  
      return res.status(200).json({ status: 200, message: 'Login successful', token, role, username });
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
      const { username } = req.params;
      const deletedUser = await UserModel.findOneAndDelete({ username: username });

  
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
      const { username, email, role } = req.body; // Extract username, email, and role from the request body
  
      const updatedUser = await UserModel.findOneAndUpdate(
        { username: username },
        { email: email, role: role },
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
      const { username, newPassword } = req.body; // Extract username and newPassword from the request body
  
      const hashPassword = await bcrypt.hash(newPassword, 10);
  
      const updatedUser = await UserModel.findOneAndUpdate(
        { username: username },
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
