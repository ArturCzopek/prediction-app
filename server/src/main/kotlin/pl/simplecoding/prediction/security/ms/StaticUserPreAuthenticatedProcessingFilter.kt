package pl.simplecoding.prediction.security.ms

import org.springframework.security.web.authentication.preauth.AbstractPreAuthenticatedProcessingFilter

import javax.servlet.http.HttpServletRequest

class StaticUserPreAuthenticatedProcessingFilter(
        private val staticUser: String
) : AbstractPreAuthenticatedProcessingFilter() {

    override fun getPreAuthenticatedPrincipal(request: HttpServletRequest): Any = this.staticUser

    override fun getPreAuthenticatedCredentials(request: HttpServletRequest): Any = "N/A"
}
