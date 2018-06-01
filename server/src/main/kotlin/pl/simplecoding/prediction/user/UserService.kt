package pl.simplecoding.prediction.user

import javassist.NotFoundException
import org.springframework.stereotype.Service

@Service
class UserService(private val userRepository: UserRepository) {
    fun getUserByLogin(login: String) = userRepository.findByLogin(login)
    fun getUserById(id: Long) = userRepository.findById(id)
    fun getAllUsers(): List<User> = userRepository.findAll()
    fun saveUser(user: User) = userRepository.save(user)

    fun toggleEnableStatus(userId: Long, enable: Boolean) {
        val user = this.getUserById(userId)
        user.ifPresent({ u -> u.enabled = true })
        this.saveUser(user.orElseThrow({ NotFoundException("Cannot find user with given id") }))
    }
}