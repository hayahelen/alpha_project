import { userRepository } from "../repositories/userRepository.js";

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
    return userRepository.create(data);
  },


  async update(id, fields) {
    return userRepository.update(id, fields);
  },

  async delete(id) {
    return userRepository.delete(id);
  }
};
