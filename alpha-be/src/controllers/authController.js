import { authService } from "../services/authService.js";
import env from 'dotenv';

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
        
        const email = req.body.email
        const password = req.body.password


        //here 3am neb3ato to the login where fi a findbyemail
        const user = await authService.login(email, password)
        res.json(user)
        
       
    }),

    refreshToken: errorHandler(async (req, res) => {

    //aam nol2at the refreshToken wnebaato lal backend
    const refreshToken = req.body.refreshToken
    const user = await authService.refreshAccessToken(refreshToken)

    if (refreshToken == null) return res.sendStatus(401)
    if (user == null) return res.sendStatus(403)
    res.json(user)


}),

logout: errorHandler(async(req,res) => {

    const refreshToken = req.body.refreshToken
    const user = await authService.logout(refreshToken)

    console.log("LOGGED OUT" , user)
    res.sendStatus(204)
})
}