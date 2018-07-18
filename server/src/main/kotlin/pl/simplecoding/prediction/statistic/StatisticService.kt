package pl.simplecoding.prediction.statistic

import org.springframework.stereotype.Service
import pl.simplecoding.prediction.match.Match
import pl.simplecoding.prediction.match.MatchRepository
import pl.simplecoding.prediction.result.ResultService
import pl.simplecoding.prediction.result.exactResultPoints
import pl.simplecoding.prediction.result.goodWinnerPoints
import pl.simplecoding.prediction.result.noPoints
import pl.simplecoding.prediction.type.Type
import pl.simplecoding.prediction.type.TypeRepository
import pl.simplecoding.prediction.user.User
import pl.simplecoding.prediction.user.UserRepository

@Service
class StatisticService(
        private val matchRepository: MatchRepository,
        private val userRepository: UserRepository,
        private val typeRepository: TypeRepository,
        private val resultService: ResultService
) {

    private var allTypes = listOf<Type>()
    private var allUsers = listOf<User>()
    private var allMatches = listOf<Match>()
    private var typesGroupedByUser = mapOf<User, List<Type>>()

    fun getAppStatistics(): List<StatRecord<*>> {
        allTypes = typeRepository.findAll()
        allUsers = userRepository.findAll()
        allMatches = matchRepository.findAll()
        typesGroupedByUser = allTypes.groupBy { it.user }

        return listOf(
                NumericRecord("Users", allUsers.count()),
                NumericRecord("Users with at least one type", typesGroupedByUser.count { it.value.isNotEmpty() }),
                NumericRecord("Users with at all typed matches", typesGroupedByUser.count { it.value.size == allMatches.size }),
                StringRecord("Winner", resultService.getTable()[0].fullUserName),
                NumericRecord("All types in application", allTypes.count()),
                NumericRecord("Average types per user", (allTypes.count().toDouble() / allUsers.count().toDouble())),
                NumericRecord("Average points per type",
                        allTypes
                                .filter { it.calculated }
                                .map { it.pointsForType as Int }
                                .fold(0) { a, b -> a + b }.toDouble() / allTypes.count().toDouble()
                ),
                NumericRecord("Types for 3 points", allTypes.count { it.pointsForType == exactResultPoints }),
                NumericRecord("Types for 1 points", allTypes.count { it.pointsForType == goodWinnerPoints }),
                NumericRecord("Types for 0 points", allTypes.count { it.pointsForType == noPoints }),
                StringRecord("Match with the most amount of types",
                        allTypes
                                .map { it.match }
                                .groupBy({ it }) { it.fullLabel }
                                .map { it.key.fullLabel to it.value.size }
                                .sortedByDescending { it.second }[0]
                                .run { "${this.first} - ${this.second} types" }
                ),
                StringRecord("Match with the most received points",
                        allTypes
                                .map { it.match to (it.pointsForType ?: 0) }
                                .groupBy({ it.first }) { it.second }
                                .map { it.key.fullLabel to it.value.fold(0) { d, e -> d + e } }
                                .sortedByDescending { it.second }[0]
                                .run { "${this.first} - ${this.second} point per type" }
                )
        )
    }
}