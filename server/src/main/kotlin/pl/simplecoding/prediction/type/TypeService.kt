package pl.simplecoding.prediction.type

import mu.KLogging
import org.springframework.stereotype.Service
import pl.simplecoding.prediction.match.MatchRepository
import pl.simplecoding.prediction.user.UserService
import java.time.LocalDateTime

@Service
class TypeService(
        private val typeRepository: TypeRepository,
        private val matchRepository: MatchRepository,
        private val userService: UserService
) {
    fun addNewType(newType: NewTypeDto, userName: String): Type {
        val existingTypeForMatch = typeRepository.findByMatch_IdAndUser_login(newType.matchId, userName)
        val match = matchRepository.findById(newType.matchId).get()
        val user = userService.getUserByLogin(userName)!!

        require(!match.resultAdded, { "Results for this match has been added, you cannot add a new type" })
        require(LocalDateTime.now() < match.time, { "You cannot send a new type when match has started" })
        require(newType.goals1 >= 0 && newType.goals2 >= 0) { "Goals amount must be greater or equal 0" }

        val typeToBeSaved = existingTypeForMatch?.copy(goals1 = newType.goals1, goals2 = newType.goals2, created = LocalDateTime.now())
                ?: Type(
                        user = user,
                        match = match,
                        goals1 = newType.goals1,
                        goals2 = newType.goals2,
                        created = LocalDateTime.now()
                )

        return typeRepository.save(typeToBeSaved)
                .also { logger.info { "Added new type for match ${match.fullLabel} by ${user.fullName}" } }
    }

    companion object : KLogging()
}
