package com.metrosoft.prediction.matches

import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.LocalDateTime
import javax.persistence.*
import javax.validation.constraints.NotEmpty

@Entity
@Table(name = "MATCHES")
@EntityListeners(AuditingEntityListener::class)
data class Match(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "MTC_ID")
        val id: Long?,

        @NotEmpty
        @Column(name = "MTC_LABEL", length = 200)
        val label: String,

        @Column(name = "MTC_TIME")
        val time: LocalDateTime,

        @NotEmpty
        @Column(name = "MTC_TEAM_1", length = 50)
        val team1: String,

        @NotEmpty
        @Column(name = "MTC_TEAM_2", length = 50)
        val team2: String,

        @Column(name = "MTC_GOALS_1")
        val goals1: Int? = null,

        @Column(name = "MTC_GOALS_2")
        val goals2: Int? = null,

        @Column(name = "MTC_CALCULATED")
        val calculated: Boolean = false
) {
    val winner: Winner
        get() = when {
            goals1 == null || goals2 == null -> Winner.NO_RESULT
            goals1 > goals2 -> Winner.TEAM_1
            goals1 < goals2 -> Winner.TEAM_2
            else -> Winner.DRAW
        }

    enum class Winner {
        TEAM_1,
        TEAM_2,
        DRAW,
        NO_RESULT;
    }
}