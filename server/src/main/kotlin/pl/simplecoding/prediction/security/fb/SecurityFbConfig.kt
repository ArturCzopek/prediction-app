package pl.simplecoding.prediction.security.fb

import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.builders.WebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter


@Configuration
@Profile("dev-fb", "prod-fb")
class SecurityFbConfig : WebSecurityConfigurerAdapter() {

    override fun configure(http: HttpSecurity) {
        // @formatter:off
        http
                .oauth2Login()
                .loginPage("/sign-in.html")
                .and()
                    .authorizeRequests()
                    .antMatchers("/login", "/sign-in.html", "/h2-console").permitAll()
                    .anyRequest().authenticated()
                .and()
                    .csrf().disable()
                    .headers().disable()
        // @formatter:on

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
