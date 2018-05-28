package pl.simplecoding.prediction.match

import java.time.LocalDateTime
import javax.validation.constraints.NotEmpty

data class NewMatchDto(
        @NotEmpty val label: String,
        @NotEmpty val time: LocalDateTime,
        @NotEmpty val team1: String,
        @NotEmpty val team2: String
)
