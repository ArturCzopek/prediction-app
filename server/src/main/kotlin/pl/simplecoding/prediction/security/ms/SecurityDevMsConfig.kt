package pl.simplecoding.prediction.security.ms

import mu.KLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.core.userdetails.UserDetailsByNameServiceWrapper
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationProvider
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken
import pl.simplecoding.prediction.security.UserDetailsService


@Configuration
@Profile("dev-ms")
class SecurityDevMsConfig(
        private val userDetailsService: UserDetailsService,
        @Value("\${spring.security.static-user}") private val staticUser: String,
        @Value("\${metrosoft.client-url}") private val clientUrl: String
) : WebSecurityConfigurerAdapter() {

    override fun configure(http: HttpSecurity) {
        // @formatter:off
        http
                .addFilterBefore(staticUserPreAuthenticatedProcessingFilter(), UsernamePasswordAuthenticationFilter::class.java)
                .authorizeRequests()
                    .antMatchers("/").permitAll()
                .and().logout()
                    .logoutUrl("/logout")
                    .logoutSuccessUrl("$clientUrl/#/logout")
                    .invalidateHttpSession(true)
                .and()
                    .csrf().disable()
                    .headers().disable()

            logger.info { "Client url: $clientUrl"}
        // @formatter:on
    }

    @Autowired
    fun configureGlobal(auth: AuthenticationManagerBuilder) {
        auth.authenticationProvider(PreAuthenticatedAuthenticationProvider().apply {
            setPreAuthenticatedUserDetailsService(UserDetailsByNameServiceWrapper<PreAuthenticatedAuthenticationToken>(userDetailsService))
        })
    }

    private fun staticUserPreAuthenticatedProcessingFilter() = StaticUserPreAuthenticatedProcessingFilter(this.staticUser).apply {
        setAuthenticationManager(authenticationManager())
    }

    companion object: KLogging()
}
