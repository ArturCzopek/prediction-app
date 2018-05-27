package com.metrosoft.prediction.user


import org.springframework.data.annotation.CreatedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.LocalDateTime
import javax.persistence.*
import javax.validation.constraints.NotEmpty

@Entity
@Table(name = "USERS")
@EntityListeners(AuditingEntityListener::class)
data class User(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "USR_ID")
        val id: Long?,

        @NotEmpty
        @Column(name = "USR_LOGIN", length = 50)
        val login: String,

        @Column(name = "USR_ROLE", length = 20)
        @Enumerated(EnumType.STRING)
        val role: UserRole = UserRole.REGULAR,

        @NotEmpty
        @Column(name = "USR_FIRST_NAME", length = 50)
        val firstName: String,

        @NotEmpty
        @Column(name = "USR_LAST_NAME", length = 50)
        val lastName: String,

        @Column(name = "USR_ENABLED")
        val enabled: Boolean,

        @CreatedDate
        @Column(name = "USR_CREATED")
        val created: LocalDateTime
)