package com.metrosoft.prediction.match

import com.metrosoft.prediction.type.Type

data class MatchWithUserType(
        val match: Match,
        val type: Type?
)
