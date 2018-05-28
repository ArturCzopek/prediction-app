package pl.simplecoding.prediction.match

import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/matches")
class MatchController(private val matchService: MatchService) {

    @GetMapping
    fun getAllMatches() = matchService.getAllMatchesWithUserTypes()

    // todo: only admin can add match
    @PostMapping("/new")
    fun addMatch(@RequestBody newMatch: NewMatchDto) = matchService.addMatch(newMatch)

    // todo: only admin can add result
    @PostMapping("/result")
    fun addMatchResult(@RequestBody matchResult: MatchResultDto) = matchService.addMatchResult(matchResult)
}
