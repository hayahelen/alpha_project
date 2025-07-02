import { json } from "express";
import { userRepository } from "../repositories/userRepository.js";
import jwt from 'jsonwebtoken'
import generateAccessToken from "../middleware/generateAccessToken.js";
import { userService } from "../services/userService.js";
import bcrypt from 'bcrypt'



export const authService = {
    async register(data) {
        //storing them here for easiness
        const email = data.email
        const password = data.password

        const hashed_password = await bcrypt.hash(data.password, 13)
        data.password = hashed_password
        const user = await userRepository.create(data);

        return this.login(email, password)
    },

    async login(email, password) {

        const user = await userRepository.getByEmail(email);
        const isValidPassword = await bcrypt.compare(password, user.password)

         if (!user || !isValidPassword) {
            throw new Error("Invalid Credentials!")
         }
         
         const userId = {id: user.id}
         console.log("USER-ID", userId)

        //hon fi link la the access token bil middleware and the refresh token (should i have it in own middleware file kamen?)
        const accessToken = generateAccessToken(userId)
        const refreshToken = jwt.sign(userId, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'})
        
  
        const tokens = {accessToken: accessToken, refreshToken: refreshToken}
        const rtoken = {refreshToken: refreshToken}

        //hon aam nebaata lal backend databse

        const updatedRT = await userService.update(user.id, rtoken);
        console.log(tokens, "..." , updatedRT)
        return tokens

    },

    async refreshAccessToken(refreshToken) {
        const user = await userRepository.getByRefreshToken(refreshToken)
        const userId = {id:user.id}
        
    // //mnekhla2 a new access token    
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return err
        const accessToken = generateAccessToken(userId)
        console.log("ACCESSSSSSSSSS", accessToken)
        return {accessToken: accessToken}
    })

},
    async logout(refreshToken) {
    console.log("PPPPP", refreshToken)
    const user = await userRepository.getByRefreshToken(refreshToken);
    const nullToken = {refreshToken: null};
        console.log("USER", user);
    const logout_user = await userRepository.update(user.id, nullToken);
    console.log("NULLIFIED REFRESH-TOKEN",logout_user);
    return logout_user

    }

}


