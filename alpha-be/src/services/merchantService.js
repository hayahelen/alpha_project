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
    //explanation: here we are getting the user from the user table and making sure the merchant id is nullified
    //i did this because i implemented soft delete for the merchant so it changes isActive to false but doesnt delete from table so doesnt cascade
    //this means that it doesnt automatically nullify so i had to nullify it from here as i did with the refresh token before
    //i also created the getByMerchantId to facilitate finding the data in the user table
    const merchantUser = await userRepository.getByMerchantId(id);
    const nullMerchantId = { merchantId: null };
    const deletedMerchantId = await userRepository.update(
      merchantUser.id,
      nullMerchantId
    );
    return merchantRepository.deleteMerchant(id);
  },
};
