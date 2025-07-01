import { userService } from "../services/userService.js";

function errorHandler (controller) {
    return async (req,res,next) => {
        try {
           await controller (req, res, next)

        } catch(err) { return next(err)}
    }
}


export const userController = {
    getAll: errorHandler(async (req, res) => {
        const users = await userService.getAll();
        res.json(users
            // .filter(user => user.id === req.user.id)
        );
    }),

    getById: errorHandler(async (req, res) => {
        const user = await userService.getById(req.params.id);
        res.json(user || {});
    }),

    getByEmail: errorHandler(async (req, res) => {
        
        const user = await userService.getByEmail(req.params.email);
        res.json(user || {});
        
    }),    
    
    createUser: errorHandler(async (req, res) => {
        const user = await userService.create(req.body);
        res.status(201).json(user);
      
    }),

    
    updateUser: errorHandler(async (req, res) => {
        const updated = await userService.update(req.params.id, req.body);
        res.json(updated);
      
    }),

    deleteUser: errorHandler(async (req, res) => {
        const result = await userService.delete(req.params.id);
        res.json(result);
        
    })
    };
