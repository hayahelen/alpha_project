import { userService } from "../services/userService.js";
import errorHandling from "../utils/errorHandling.js";

export const userController = {
  getAll: errorHandling(async (req, res) => {
    const users = await userService.getAll();
    res.json(
      users
      // .filter(user => user.id === req.user.id)
    );
  }),

  getById: errorHandling(async (req, res) => {
    const user = await userService.getById(req.params.id);
    res.json(user || {});
  }),

  getByEmail: errorHandling(async (req, res) => {
    const user = await userService.getByEmail(req.params.email);
    res.json(user || {});
  }),

  createUser: errorHandling(async (req, res) => {
    const user = await userService.create(req.body);
    res.status(201).json(user);
  }),

  updateUser: errorHandling(async (req, res) => {
    const updated = await userService.update(req.params.id, req.body);
    res.json(updated);
  }),

  deleteUser: errorHandling(async (req, res) => {
    const result = await userService.delete(req.params.id);
    res.json(result);
  }),
};
