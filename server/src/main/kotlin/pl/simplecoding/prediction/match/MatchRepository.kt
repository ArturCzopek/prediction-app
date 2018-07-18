package pl.simplecoding.prediction.match

import org.springframework.data.domain.Sort
import org.springframework.data.jpa.repository.JpaRepository
import java.time.LocalDateTime

interface MatchRepository : JpaRepository<Match, Long> {
    fun findByLabelAndTeam1AndTeam2(label: String, team1: String, team2: String): Match?

    fun findAllByResultAddedTrue(sort: Sort): MutableIterable<Match>

    fun findByTimeBetween(before: LocalDateTime, after: LocalDateTime): MutableIterable<Match>
}
