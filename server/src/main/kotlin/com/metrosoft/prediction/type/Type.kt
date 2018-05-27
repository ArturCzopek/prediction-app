package com.metrosoft.prediction.type

import com.fasterxml.jackson.annotation.JsonIgnore
import com.metrosoft.prediction.match.Match
import com.metrosoft.prediction.user.User
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "TYPES")
@EntityListeners(AuditingEntityListener::class)
data class Type(
        @Id
        @JsonIgnore
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "TP_ID")
        val id: Long? = null,

        @ManyToOne
        @JsonIgnore
        @JoinColumn(name = "TP_USER_ID")
        val user: User,

        @ManyToOne
        @JsonIgnore
        @JoinColumn(name = "TP_MATCH_ID")
        val match: Match,

        @Column(name = "TP_GOALS_1")
        val goals1: Int,

        @Column(name = "TP_GOALS_2")
        val goals2: Int,

        @Column(name = "TP_CALCULATED")
        @JsonIgnore
        val calculated: Boolean = false,

        @Column(name = "TP_POINTS")
        val pointsForType: Int? = null,

        @CreatedDate
        @Column(name = "TP_CREATED")
        val created: LocalDateTime? = null
)
