package pl.simplecoding.prediction.match

import mu.KLogging
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Service
import pl.simplecoding.prediction.result.ResultService
import pl.simplecoding.prediction.type.TypeRepository
import pl.simplecoding.prediction.user.UserRole
import pl.simplecoding.prediction.user.UserService
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.LocalTime
import java.time.ZoneId

const val matchTimeInHours = 2L

@Service
class MatchService(
        private val matchRepository: MatchRepository,
        private val typeRepository: TypeRepository,
        private val resultService: ResultService,
        private val userService: UserService
) {

    fun getAllMatchesWithUserTypes(login: String) = convertToLabeledAndSortedMatched(matchRepository.findAll(), login)

    fun getTodayMatchesWithUserTypes(login: String) = convertToLabeledAndSortedMatched(matchRepository.findByTimeBetween(getTodayMidnight(), getTomorrowMidnight()), login)

    fun addMatch(newMatchDto: NewMatchDto, authentication: Authentication) = with(newMatchDto) {
        require(LocalDateTime.now() < this.time) { "You cannot add past matches" }
        require(this.team1.trim() != this.team2.trim()) { "Teams names must be different" }
        require(userService.getUserByLogin(authentication)?.role == UserRole.ADMIN) { "Action allowed only for admin!" }

        val label = this.label.trim()
        val team1 = this.team1.trim()
        val team2 = this.team2.trim()

        require(matchRepository.findByLabelAndTeam1AndTeam2(label, team1, team2) == null) { "Match with this parameters already exist!" }

        matchRepository.save(Match(
                id = null,
                label = label,
                time = time,
                team1 = team1,
                team2 = team2
        ))
    }.also { logger.info { "Added new match: ${it.fullLabel}" } }

    fun addMatchResult(matchResultDto: MatchResultDto, authentication: Authentication): Match {
        val match = matchRepository.findById(matchResultDto.matchId).get()
        require(LocalDateTime.now() > match.time.plusHours(matchTimeInHours)) { "You can add a result only when match has ended" }
        require(matchResultDto.goals1 >= 0 && matchResultDto.goals2 >= 0) { "Goals amount must be greater or equal 0" }
        require(userService.getUserByLogin(authentication)?.role == UserRole.ADMIN) { "Action allowed only for admin!" }

        val updatedMatch = match.copy(goals1 = matchResultDto.goals1, goals2 = matchResultDto.goals2, resultAdded = true)
        return matchRepository.save(updatedMatch).also {
            logger.info { "Added match result: ${it.fullLabel} - ${it.goals1}:${it.goals2}" }
            resultService.calculateResultForMatch(it.id!!)
        }
    }

    private fun convertToLabeledAndSortedMatched(matches: MutableIterable<Match>, login: String) = matches
            .map { MatchWithUserType(it, typeRepository.findByMatch_IdAndUser_login(it.id!!, login)) }
            .sortedBy { it.match.time }
            .groupBy { it.match.label }

    private fun getTodayMidnight() = LocalDateTime.of(LocalDate.now(ZoneId.of("Europe/Berlin")), LocalTime.MIDNIGHT)

    private fun getTomorrowMidnight() = getTodayMidnight().plusDays(1)

    companion object : KLogging()
}
