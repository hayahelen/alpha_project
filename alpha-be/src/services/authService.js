import { userRepository } from "../repositories/userRepository.js";

export const authService = {
    async register(data) {
        return userRepository.create(data);
    },

    async login(email) {
         return userRepository.getByEmail(email);
    },

    async findRefreshToken(refreshToken) {
        return userRepository.findByRefreshToken(refreshToken)
    }

}


