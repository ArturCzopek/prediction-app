package pl.simplecoding.prediction.type

import org.springframework.data.jpa.repository.JpaRepository

interface TypeRepository: JpaRepository<Type, Long> {
    fun findByMatch_IdAndUser_login(matchId: Long, login:String): Type?

    fun findByMatch_Id(matchId: Long): List<Type>

    fun findByUser_Id(userId: Long): List<Type>
}
