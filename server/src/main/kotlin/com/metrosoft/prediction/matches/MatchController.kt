package com.metrosoft.prediction.matches

import org.springframework.web.bind.annotation.*
import java.time.LocalDateTime

@RestController
@RequestMapping("/matches")
class MatchController(private val matchRepository: MatchRepository) {

    // todo: matches should contain user types
    @GetMapping
    fun all() = matchRepository.findAll()
            .sortedBy { it.time }
            .groupBy { it.label }


    // todo: only admin can add match
    @PostMapping("/new")
    fun addMatch(@RequestBody newMatch: NewMatch) = with(newMatch) {
        require(this.time > LocalDateTime.now(), { "You cannot add past matches" })
        require(this.team1 != this.team2, { "Teams names must be different" })
        matchRepository.save(Match(
                id = null,
                label = this.label,
                time = this.time,
                team1 = this.team1,
                team2 = this.team2
        ))
    }
}