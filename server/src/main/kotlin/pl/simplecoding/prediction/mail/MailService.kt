package pl.simplecoding.prediction.mail

import kotlinx.coroutines.experimental.CommonPool
import kotlinx.coroutines.experimental.launch
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Profile
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.stereotype.Service
import org.thymeleaf.TemplateEngine
import org.thymeleaf.context.Context
import pl.simplecoding.prediction.match.MatchService
import pl.simplecoding.prediction.match.MatchWithUserType
import pl.simplecoding.prediction.user.User
import pl.simplecoding.prediction.user.UserRepository


const val REMINDER_TEMPLATE = "reminder"
const val REMINDER_EMPTY_TEMPLATE = "reminder-empty"

@Service
@Profile("prod-ms")
class MailService(
        @Value("\${spring.mail.from}") private val mailFrom: String,
        private val javaMailSender: JavaMailSender,
        private val templateEngine: TemplateEngine,
        private val matchService: MatchService,
        private val userRepository: UserRepository
) {

    fun sendNotificationAboutTodayMatches() = userRepository.findByEnabledTrue()
            .mapNotNull { prepareTodayMatchesMail(it) }
            .forEach { launch(CommonPool) { javaMailSender.send(it.mimeMessage) } }

    private fun prepareTodayMatchesMail(user: User): MimeMessageHelper? {
        val todayMatches = matchService.getTodayMatchesWithUserTypes(user.login)

        return if (todayMatches.isEmpty()) {
            null
        } else {
            with(javaMailSender.createMimeMessage()) {
                MimeMessageHelper(this).apply {
                    setTo(user.email)
                    setFrom(mailFrom)
                    setSubject(getSubjectForUser(todayMatches))
                    setText(getTextForUser(todayMatches, user.firstName, todayMatches.values.flatten().none { it.type == null }))
                }
            }
        }
    }

    private fun getTextForUser(todayMatches: Map<String, List<MatchWithUserType>>, name: String, allMatchesTyped: Boolean): String {
        val matchesWithTypes = todayMatches.values.flatten().groupBy { it.type != null }
        val context = Context().apply {
            setVariable("userName", name)
            setVariable("matchesTyped", matchesWithTypes[true])
            setVariable("matchesTypedAmount", matchesWithTypes[true]?.size ?: 0)
            setVariable("matchesNotTyped", matchesWithTypes[false])
            setVariable("matchesNotTypedAmount", matchesWithTypes[false]?.size ?: 0)
        }

        return templateEngine.process(if (allMatchesTyped) REMINDER_EMPTY_TEMPLATE else REMINDER_TEMPLATE, context)
    }

    private fun getSubjectForUser(todayMatches: Map<String, List<MatchWithUserType>>) =
            with(todayMatches.values.flatten().count { it.type == null }) {
                when (this) {
                    0 -> "Perfect! You have typed all matches today!"
                    1 -> "You have 1 match more to type today!"
                    else -> "You have $this matches more to type today!"
                }
            }
}
