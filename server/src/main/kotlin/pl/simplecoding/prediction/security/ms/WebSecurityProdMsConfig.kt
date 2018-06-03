package pl.simplecoding.prediction.security.ms

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.builders.WebSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.core.userdetails.UserDetailsByNameServiceWrapper
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationProvider
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken
import pl.simplecoding.prediction.security.CheckUserExistenceFilter
import pl.simplecoding.prediction.security.UserDetailsService
import pl.simplecoding.prediction.user.UserService


@Configuration
@EnableWebSecurity
@Profile("prod-ms")
class WebSecurityProductionConfig(
        private val userDetailsService: UserDetailsService,
        private val userService: UserService
) : WebSecurityConfigurerAdapter() {

    override fun configure(http: HttpSecurity) {
        // @formatter:off
        http
                .addFilterBefore(waffleUserPreAuthenticatedProcessingFilter(), UsernamePasswordAuthenticationFilter::class.java)
                .addFilterAfter(CheckUserExistenceFilter(userService), WaffleUserPreAuthenticatedProcessingFilter::class.java)
                .authorizeRequests()
                    .anyRequest().authenticated()
                .and()
                    .csrf().disable()
                    .headers().disable()
        // @formatter:on
    }

    private fun waffleUserPreAuthenticatedProcessingFilter() = WaffleUserPreAuthenticatedProcessingFilter().apply {
        setAuthenticationManager(authenticationManager())
    }


    @Autowired
    fun configureGlobal(auth: AuthenticationManagerBuilder) {
        auth.authenticationProvider(PreAuthenticatedAuthenticationProvider().apply {
            setPreAuthenticatedUserDetailsService(UserDetailsByNameServiceWrapper<PreAuthenticatedAuthenticationToken>(userDetailsService))
        })
    }

    override fun configure(web: WebSecurity) {
        web.ignoring()
                .antMatchers("*.map")
                .antMatchers("*.css")
                .antMatchers("*.js")
                .antMatchers("*.jpg")
                .antMatchers("*.png")
                .antMatchers("/app/**")
                .antMatchers("/avatar/**")
                .antMatchers("/assets/images/**")
    }
}
