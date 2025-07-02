import { authService } from "../services/authService.js";
import env from 'dotenv';
import jwt from 'jsonwebtoken'
import generateAccessToken from "../middleware/generateAccessToken.js";
import { userService } from "../services/userService.js";
import { userRepository } from "../repositories/userRepository.js";


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
        //3am nol2at the email here (from params)
        const email = req.params.email

        //here 3am neb3ato to the login where fi a findbyemail
        const user = await authService.login(email)

        //here we are getting the userid men the user fo2 
        const userId = {id: user.id}

        //hon fi link la the access token bil middleware and the refresh token (should i have it in own middleware file kamen?)
        const accessToken = generateAccessToken(userId)
        const refreshToken = jwt.sign(userId, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '60s'})
        
        res.json({accessToken: accessToken, refreshToken: refreshToken})
        const token = {refreshToken: refreshToken}

        //hon aam nebaata lal backend databse

        const updatedRT = await userService.update(user.id, token);
        console.log(updatedRT)

       

  //create refresh token on login and on register
  //create access token on login and on register
  //signup and login function in the authentication
    }),

    refreshToken: errorHandler(async (req, res) => {
        //aam nol2at the refreshToken
    const refreshToken = req.body.refreshToken
    //aam nebaato la backend 
    const token = await authService.getByRefreshToken(refreshToken)

    console.log("REFRESH" , refreshToken)
    
    console.log("TOKEN", token)

    
    if (refreshToken == null) return res.sendStatus(401)
    if (token == null) return res.sendStatus(403)

    //mnekhla2 a new access token    
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({id: user.id})
    res.json({accessToken: accessToken})
    })
    


}),

logout: errorHandler(async(req,res) => {
    //hon we remove the refresh token men ldb (bas naamel logout)
    const refreshToken = req.body.refreshToken
    const user = await authService.getByRefreshToken(refreshToken)
  
    const token = {refreshToken: null}

    const logout_user = await userRepository.update(user.id, token)

    console.log("NULLIFIED REFRESH-TOKEN",logout_user)

    res.sendStatus(204)
})
}