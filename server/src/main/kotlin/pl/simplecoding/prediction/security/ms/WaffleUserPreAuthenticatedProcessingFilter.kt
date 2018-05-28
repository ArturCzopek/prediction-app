package pl.simplecoding.prediction.security.ms

import org.springframework.security.web.authentication.preauth.AbstractPreAuthenticatedProcessingFilter
import javax.servlet.http.HttpServletRequest


class WaffleUserPreAuthenticatedProcessingFilter : AbstractPreAuthenticatedProcessingFilter() {

    override fun getPreAuthenticatedPrincipal(request: HttpServletRequest): Any? =
            if (request.userPrincipal != null) request.userPrincipal.name else null

    override fun getPreAuthenticatedCredentials(request: HttpServletRequest): Any = "N/A"
}
