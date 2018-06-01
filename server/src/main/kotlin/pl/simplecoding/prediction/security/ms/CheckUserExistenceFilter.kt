package pl.simplecoding.prediction.security.ms

import mu.KLogging
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.filter.GenericFilterBean
import pl.simplecoding.prediction.user.UserService
import javax.servlet.FilterChain
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletResponse

class CheckUserExistenceFilter(private val userService: UserService) : GenericFilterBean() {
    override fun doFilter(req: ServletRequest, res: ServletResponse, chain: FilterChain) {
        with(userService.getUserByLogin(SecurityContextHolder.getContext()?.authentication?.name
                ?: throw IllegalStateException("User not logged in").also { logger.warn { "User not logged in" } })) {
            if (this == null || !this.enabled) {
                (res as HttpServletResponse).sendError(HttpServletResponse.SC_NOT_FOUND)
                return
            }
        }

        chain.doFilter(req, res)
    }

    companion object: KLogging()
}
