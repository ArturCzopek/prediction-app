package pl.simplecoding.prediction.mail

import mu.KLogging
import org.springframework.context.annotation.Profile
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

const val EVERY_8_AM_SCHEDULE = "0 0 8 * * *"

@Component
@Profile("prod-ms")
class TypesNotificationScheduler(private val mailService: MailService) {

    @Scheduled(cron = EVERY_8_AM_SCHEDULE)
    fun sendMorningReminderMail() = mailService.sendNotificationAboutTodayMatches()
            .also { logger.info { "Sent reminder email about types to players" } }


    companion object: KLogging()
}
