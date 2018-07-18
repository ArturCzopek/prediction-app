package pl.simplecoding.prediction.statistic

import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pl.simplecoding.prediction.user.UserRole
import pl.simplecoding.prediction.user.UserService

@RestController
@RequestMapping("/api/statistics")
class StatisticController(
        private val statisticService: StatisticService,
        private val userService: UserService
) {

    @GetMapping("/all")
    fun getAllStatistics(authentication: Authentication) = when (userService.getUserByLogin(authentication)?.role) {
        UserRole.ADMIN -> statisticService.getAppStatistics()
        else -> throw IllegalAccessException("User has no access to get statistics")
    }
}