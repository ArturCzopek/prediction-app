package pl.simplecoding.prediction.result

import mu.KLogging
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import pl.simplecoding.prediction.match.Match
import pl.simplecoding.prediction.match.MatchRepository
import pl.simplecoding.prediction.type.Type
import pl.simplecoding.prediction.type.TypeRepository
import pl.simplecoding.prediction.user.UserRepository
import kotlin.math.sign

const val exactResultPoints = 3
const val goodWinnerPoints = 1
const val noPoints = 0

@Service
class ResultService(
        private val userRepository: UserRepository,
        private val matchRepository: MatchRepository,
        private val typeRepository: TypeRepository
) {

    fun calculateResultForMatch(matchId: Long): List<Type> = with(matchRepository.findById(matchId).get()) {
        return typeRepository.findByMatch_Id(matchId)
                .map { validType ->
                    typeRepository.save(validType.copy(
                            calculated = true,
                            pointsForType = calculatePointsForType(validType.goals1, validType.goals2, this.goals1!!, this.goals2!!)
                    ))
                }
                .also { logger.info { "Calculated results for match ${this.fullLabel}" } }
    }

    fun getTable(): List<AllResultsForUser> {
        val matchesToCheck = matchRepository.findAllByResultAddedTrue(Sort.by("id"))
        return userRepository.findAll()
                .map {
                    AllResultsForUser(
                            fullUserName = it.fullName,
                            place = 0,
                            resultsForMatches = getAllResultsForUser(it.login, matchesToCheck)

                    )
                }
                .sortedByDescending { it.summaryPoints }
                .mapIndexed { index, allResultsForUser -> allResultsForUser.copy(place = index + 1) }
    }

    fun getResultsForMatch(matchId: Long) = typeRepository.findByMatch_Id(matchId)
            .map { UserResultForMatch(it.user.fullName, 0, ResultForMatch(it.match.fullLabel, it.pointsForType)) }
            .sortedByDescending { it.resultForMatch.pointsForMatch }
            .mapIndexed { index, userResultForMatch -> userResultForMatch.copy(place = index + 1) }

    private fun calculatePointsForType(goals1Typed: Int, goals2Typed: Int, goals1Real: Int, goals2Real: Int) = when {
        goals1Typed == goals1Real && goals2Typed == goals2Real -> exactResultPoints
        (goals1Real - goals2Real).sign == (goals1Typed - goals2Typed).sign -> goodWinnerPoints  // the same sign for comparision for no draw
        else -> noPoints
    }

    private fun getAllResultsForUser(login: String, matches: List<Match>) = matches
            .mapIndexed { _, match -> ResultForMatch(match.fullLabel, typeRepository.findByMatch_IdAndUser_login(match.id!!, login)?.pointsForType) }

    companion object : KLogging()
}
