package pl.simplecoding.prediction.match

import pl.simplecoding.prediction.type.Type

data class MatchWithUserType(
        val match: Match,
        val type: Type?
)
