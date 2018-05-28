package pl.simplecoding.prediction.security

import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import pl.simplecoding.prediction.user.UserRepository


@Service
class UserDetailsService(
        private val userRepository: UserRepository
) : org.springframework.security.core.userdetails.UserDetailsService {

    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(username: String?): UserDetails {
        if (username == null) {
            throw UsernameNotFoundException("User not found")
        }

        val user = this.userRepository.findByLogin(username.toLowerCase())
                ?: throw UsernameNotFoundException("User not found")

        return org.springframework.security.core.userdetails.User(
                user.login, "N/A", listOf(SimpleGrantedAuthority(user.role.name))
        )
    }
}
