package pl.simplecoding.prediction.user

import org.springframework.http.HttpStatus
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/users")
class UserController(private val userService: UserService) {

    @GetMapping("/data")
    fun getUserData(authentication: Authentication) = userService.getUserByLogin(authentication)

    @GetMapping("/all")
    fun getAllUsers(authentication: Authentication) =
            when (userService.getUserByLogin(authentication)?.role) {
                UserRole.ADMIN -> userService.getAllUsers()
                else -> throw IllegalAccessException("User has no access to get users list")
            }

    @PostMapping("/toggle-enable")
    fun enableUser(@RequestBody userId: Long, authentication: Authentication) =
            when (userService.getUserByLogin(authentication)?.role) {
                UserRole.ADMIN -> {
                    userService.toggleEnableStatus(userId)
                    HttpStatus.OK
                }
                else -> HttpStatus.FORBIDDEN
            }
}