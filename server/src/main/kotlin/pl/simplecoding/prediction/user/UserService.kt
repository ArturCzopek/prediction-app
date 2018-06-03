package pl.simplecoding.prediction.user

import javassist.NotFoundException
import mu.KLogging
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.ParameterizedTypeReference
import org.springframework.http.HttpMethod
import org.springframework.http.RequestEntity
import org.springframework.security.core.Authentication
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import java.net.URI
import java.nio.file.attribute.UserPrincipalNotFoundException

typealias FbData = Map<String, Any>


@Service
class UserService(
        private val userRepository: UserRepository,
        private val clientService: OAuth2AuthorizedClientService,
        @Value("\${spring.profiles.active}") private val activeProfile: String
) {
    fun getUserByLogin(authentication: Authentication?): User? = with(authentication
            ?: throw UserPrincipalNotFoundException("Not found user")) {
        val userFromDb = userRepository.findByLogin(this.name)
        return when {
            userFromDb != null -> userFromDb
            activeProfile.contains("-fb") -> addNewUserFromFb(this)
            else -> null
        }
    }

    private fun addNewUserFromFb(authentication: Authentication) = with(getFbData(authentication)) {
        userRepository.save(User(
                this["id"] as String,
                this["email"] as String,
                this["first_name"] as String,
                this["last_name"] as String)
        ).also { logger.info { "Added new FB user: ${it.id}: ${it.fullName}" } }
    }

    private fun getFbData(authentication: Authentication): FbData {

        fun buildFbUrl(id: String, token: String)
                = "https://graph.facebook.com/v3.0/$id?fields=email,first_name,last_name&access_token=$token"

        val token = with(authentication as OAuth2AuthenticationToken) {
            clientService.loadAuthorizedClient<OAuth2AuthorizedClient>(
                    this.authorizedClientRegistrationId,
                    this.name
            ).accessToken.tokenValue
        }

        val endpoint = URI.create(buildFbUrl(authentication.principal.attributes["id"] as String, token))
        val request = RequestEntity<Any>(HttpMethod.GET, endpoint)
        val respType = object : ParameterizedTypeReference<FbData>() {}
        return RestTemplate().exchange(request, respType).body!!
    }

    fun getAllUsers(): List<User> = userRepository.findAll()

    fun toggleEnableStatus(userId: Long) = with(this.getUserById(userId)
            ?: throw NotFoundException("Cannot find user with given id")) {
        userRepository.save(this.copy(enabled = !this.enabled))
    }

    private fun getUserById(id: Long) = with(userRepository.findById(id)) {
        if (this.isPresent) this.get() else null
    }

    companion object : KLogging()
}
