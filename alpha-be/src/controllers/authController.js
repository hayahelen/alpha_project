import { authService } from "../services/authService.js";
import env from 'dotenv';
import jwt from 'jsonwebtoken'
import generateAccessToken from "../middleware/generateAccessToken.js";
import { userController } from "./userController.js";

env.config();

function errorHandler (controller) {
    return async (req,res,next) => {
        try {
           await controller (req, res, next)

        } catch(err) { return next(err)}
    }
}


export const authController = {
    register: errorHandler(async (req,res) => {
        const user = await authService.register(req.body);
        res.status(201).json(user)
    }),


    login: errorHandler(async (req, res) => {
        const email = req.params.email
        console.log("EMAIL", email)

        const user = await authService.login(email)
        const userId = {id: user.id}
        console.log("USER", userId)
        const accessToken = generateAccessToken(userId)
        const refreshToken = jwt.sign(userId, process.env.REFRESH_TOKEN_SECRET)
        
        res.json({accessToken: accessToken, refreshToken: refreshToken})

        //email and password
        //from the body, get by email and compare the passwords
         

  //create refresh token on login and on register
  //create access token on login and on register
  //signup and login function in the authentication
    }),

    refreshToken: errorHandler(async (req, res) => {
    const refreshToken = req.body.refreshToken
    const token = await authService.findRefreshToken(refreshToken)
    console.log("REFRESH" , refreshToken)
    console.log("TOKEN", token)
    // if (refreshToken == null) return res.sendStatus(401)


})
}