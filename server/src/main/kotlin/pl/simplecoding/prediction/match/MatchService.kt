package pl.simplecoding.prediction.match

import mu.KLogging
import org.springframework.stereotype.Service
import pl.simplecoding.prediction.result.ResultService
import pl.simplecoding.prediction.type.TypeRepository
import java.time.LocalDateTime

const val loggedInUserId = 1L
const val matchTimeInHours = 2L

@Service
class MatchService(
        private val matchRepository: MatchRepository,
        private val typeRepository: TypeRepository,
        private val resultService: ResultService
) {

    // todo remove this ugly logged in user id
    fun getAllMatchesWithUserTypes() = matchRepository.findAll()
            .map { MatchWithUserType(it, typeRepository.findByMatch_IdAndUser_id(it.id!!, loggedInUserId)) }
            .sortedBy { it.match.time }
            .groupBy { it.match.label }


    // todo valid if admin
    fun addMatch(newMatchDto: NewMatchDto) = with(newMatchDto) {
        require(LocalDateTime.now() < this.time) { "You cannot add past matches" }
        require(this.team1 != this.team2) { "Teams names must be different" }

        matchRepository.save(Match(
                id = null,
                label = this.label,
                time = this.time,
                team1 = this.team1,
                team2 = this.team2
        ))
    }.also { logger.info { "Added new match: ${it.fullLabel}" } }

    // todo valid if admin
    fun addMatchResult(matchResultDto: MatchResultDto): Match {
        val match = matchRepository.findById(matchResultDto.matchId).get()
        require(LocalDateTime.now() > match.time.plusHours(matchTimeInHours)) { "You can add a result only when match has ended" }
        require(matchResultDto.goals1 >= 0 && matchResultDto.goals2 >= 0) { "Goals amount must be greater or equal 0" }

        val updatedMatch = match.copy(goals1 = matchResultDto.goals1, goals2 = matchResultDto.goals2, resultAdded = true)
        return matchRepository.save(updatedMatch).also {
            logger.info { "Added match result: ${it.fullLabel} - ${it.goals1}:${it.goals2}" }
            resultService.calculateResultForMatch(it.id!!)
        }
    }

    companion object : KLogging()
}
