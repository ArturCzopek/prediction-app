package com.metrosoft.prediction.result

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/results")
class ResultController(private val resultService: ResultService) {

    @GetMapping("/all")
    fun getTable() = resultService.getTable()

    @GetMapping(("/match/{matchId}"))
    fun getResultsForMatch(@PathVariable matchId: Long) = resultService.getResultsForMatch(matchId)
}
