package pl.simplecoding.prediction.user

import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
@RequestMapping("/api/users")
class UserController(private val userService: UserService) {

    @GetMapping("/data")
    fun getUserData(authentication: Authentication) = userService.getUserByLogin(authentication.name)

    @GetMapping("/timezone")
    fun getTimeZoneForUser(timeZone: TimeZone) = timeZone
}