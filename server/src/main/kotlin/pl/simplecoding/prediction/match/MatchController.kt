package pl.simplecoding.prediction.match

import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/matches")
class MatchController(private val matchService: MatchService) {

    @GetMapping
    fun getAllMatches(authentication: Authentication) = matchService.getAllMatchesWithUserTypes(authentication.name)

    @PostMapping("/new")
    fun addMatch(@RequestBody newMatch: NewMatchDto, authentication: Authentication) = matchService.addMatch(newMatch, authentication.name)

    @PostMapping("/result")
    fun addMatchResult(@RequestBody matchResult: MatchResultDto, authentication: Authentication) = matchService.addMatchResult(matchResult, authentication.name)
}
