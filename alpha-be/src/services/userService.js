import { userRepository } from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import passwordHandling from "../utils/passwordHandling.js";

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
    const createdData = await passwordHandling(data);
    return userRepository.create(createdData);
  },

  async update(id, fields) {
    const updatedFields = await passwordHandling(fields);
    console.log("updated fields: ", updatedFields)
    return userRepository.update(id, updatedFields);
  },

  async delete(id) {
    return userRepository.delete(id);
  },
};
