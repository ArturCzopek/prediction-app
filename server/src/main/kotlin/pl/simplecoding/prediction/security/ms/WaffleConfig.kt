package pl.simplecoding.prediction.security.ms

import org.springframework.boot.web.servlet.FilterRegistrationBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import waffle.servlet.NegotiateSecurityFilter


@Configuration
@Profile("prod-ms")
class WaffleConfig {

    @Bean
    fun someFilterRegistration() = FilterRegistrationBean<NegotiateSecurityFilter>().apply {
        filter = NegotiateSecurityFilter()
        urlPatterns = listOf("/*")
        setName("NegotiateSecurityFilter")
        order = 0
    }
}
