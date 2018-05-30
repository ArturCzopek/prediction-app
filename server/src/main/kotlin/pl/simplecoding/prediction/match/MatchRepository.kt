package pl.simplecoding.prediction.match

import org.springframework.data.domain.Sort
import org.springframework.data.repository.CrudRepository

interface MatchRepository : CrudRepository<Match, Long> {
    fun findByLabelAndTeam1AndTeam2(label: String, team1: String, team2: String): Match?

    fun findAllByResultAddedTrue(sort: Sort): List<Match>
}