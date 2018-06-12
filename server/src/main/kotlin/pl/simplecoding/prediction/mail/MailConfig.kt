package pl.simplecoding.prediction.mail

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.thymeleaf.spring5.SpringTemplateEngine
import org.thymeleaf.templatemode.TemplateMode
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver


@Configuration
@Profile("prod-ms")
class MailConfig {

    @Bean
    fun emailTemplateEngine() = SpringTemplateEngine().apply {
        addTemplateResolver(textTemplateResolver())
    }

    private fun textTemplateResolver() = ClassLoaderTemplateResolver().apply {
        order = 1
        prefix = "/mail/"
        suffix = ".txt"
        templateMode = TemplateMode.TEXT
        characterEncoding = "UTF-8"
        isCacheable = false
    }
}
