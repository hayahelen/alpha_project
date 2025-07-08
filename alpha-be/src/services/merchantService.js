import { merchantRepository } from "../repositories/merchantRepository.js";
import { userRepository } from "../repositories/userRepository.js";

export const merchantService = {
  async getAllMerchants() {
    return merchantRepository.getAllMerchants();
  },

  async getMerchantById(id) {
    return merchantRepository.getMerchantById(id);
  },

  async createMerchant(data) {
    return merchantRepository.createMerchant(data);
  },

  async updateMerchant(id, merchantName) {
    return merchantRepository.updateMerchant(id, merchantName);
  },

  async deleteMerchant(id) {
    return merchantRepository.deleteMerchant(id);
  },
};
