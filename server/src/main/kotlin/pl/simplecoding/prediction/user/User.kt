package pl.simplecoding.prediction.user


import com.fasterxml.jackson.annotation.JsonIgnore
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.LocalDateTime
import javax.persistence.*
import javax.validation.constraints.Email
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

        @NotEmpty
        @Email
        @Column(name = "USR_EMAIL", length = 100)
        val email: String,

        @Column(name = "USR_ROLE", length = 20)
        @Enumerated(EnumType.STRING)
        val role: UserRole = UserRole.REGULAR,

        @NotEmpty
        @Column(name = "USR_FIRST_NAME", length = 50)
        val firstName: String,

        @NotEmpty
        @JsonIgnore
        @Column(name = "USR_LAST_NAME", length = 50)
        val lastName: String,

        @Column(name = "USR_ENABLED")
        val enabled: Boolean = true,

        @CreatedDate
        @Column(name = "USR_CREATED")
        val created: LocalDateTime = LocalDateTime.now()
) {
        constructor(login: String, email: String, firstName: String, lastName: String) : this(null, login, email, UserRole.REGULAR, firstName, lastName)

        val fullName
        get() = "$firstName $lastName"
}