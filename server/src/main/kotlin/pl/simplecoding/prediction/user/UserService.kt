package pl.simplecoding.prediction.user

import org.springframework.stereotype.Service

@Service
class UserService(private val userRepository: UserRepository) {
    fun getUserByLogin(login: String) = userRepository.findByLogin(login)
}