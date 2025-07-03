import { merchantService } from "../services/merchantService.js";
import errorHandling from "../utils/errorHandling.js";

export const merchantController = {
  getAllMerchants: errorHandling(async (req, res) => {
    const merchants = await merchantService.getAllMerchants();
    res.json(merchants);
  }),

  getMerchantById: errorHandling(async (req, res) => {
    const merchant = await merchantService.getMerchantById(req.params.id);
    res.json(merchant || {});
  }),

  createMerchant: errorHandling(async (req, res) => {
    const merchant = await merchantService.createMerchant(req.body);
    res.status(201).json(merchant);
  }),

  updateMerchant: errorHandling(async (req, res) => {
    const updatedMerchant = await merchantService.updateMerchant(
      req.params.id,
      req.body
    );
    res.json(updatedMerchant);
  }),

  deleteMerchant: errorHandling(async (req, res) => {
    const result = await merchantService.deleteMerchant(req.params.id);
    res.json(result);
  }),
};
