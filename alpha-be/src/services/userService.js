import { userRepository } from "../repositories/userRepository.js";
import bcrypt from "bcrypt";

export const userService = {
  async getAll() {
    return userRepository.getAll();
  },

  async getById(id) {
    return userRepository.getById(id);
  },

  async getByEmail(email) {
    return userRepository.getByEmail(email);
  },

  async create(data) {
    const password = data.password;
    const hashed_password = await bcrypt.hash(data.password, 13);
    data.password = hashed_password;
    return userRepository.create(data);
  },

  async update(id, fields) {
    return userRepository.update(id, fields);
  },

  async delete(id) {
    return userRepository.delete(id);
  },
};
