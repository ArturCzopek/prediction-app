package pl.simplecoding.prediction.user

import org.springframework.http.HttpStatus
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/api/users")
class UserController(private val userService: UserService) {

    @GetMapping("/data")
    fun getUserData(authentication: Authentication) = userService.getUserByLogin(authentication.name)

    @GetMapping("/timezone")
    fun getTimeZoneForUser(timeZone: TimeZone) = timeZone

    @GetMapping("/all")
    fun getAllUsers(authentication: Authentication): List<User> {
        return when (userService.getUserByLogin(authentication.name)?.role) {
            UserRole.ADMIN -> userService.getAllUsers()
            else -> throw IllegalAccessException("User has no access to get users list")
        }
    }

    @PostMapping("/disable")
    fun disableUser(@RequestBody userId: Long, authentication: Authentication): HttpStatus {
        return when (userService.getUserByLogin(authentication.name)?.role) {
            UserRole.ADMIN -> {
                userService.toggleEnableStatus(userId, false)
                HttpStatus.OK
            }
            else -> HttpStatus.FORBIDDEN
        }
    }

    @PostMapping("/enable")
    fun enableUser(@RequestBody userId: Long, authentication: Authentication): HttpStatus {
        return when (userService.getUserByLogin(authentication.name)?.role) {
            UserRole.ADMIN -> {
                userService.toggleEnableStatus(userId, true)
                HttpStatus.OK
            }
            else -> HttpStatus.FORBIDDEN
        }
    }
}