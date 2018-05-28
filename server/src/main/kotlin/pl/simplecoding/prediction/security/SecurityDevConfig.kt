package pl.simplecoding.prediction.security

import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter


@Configuration
@Profile("dev")
class SecurityDevConfig : WebSecurityConfigurerAdapter() {

    override fun configure(http: HttpSecurity) {
        // @formatter:off
        http
                .authorizeRequests()
                    .antMatchers("/").permitAll()
                .and()
                    .csrf().disable()
                    .headers().disable()
        // @formatter:on
    }
}
