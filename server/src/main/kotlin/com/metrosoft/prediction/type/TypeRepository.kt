package com.metrosoft.prediction.type

import org.springframework.data.repository.CrudRepository

interface TypeRepository: CrudRepository<Type, Long> {
    fun findByMatch_IdAndUser_id(matchId: Long, userId: Long): Type?

    fun findByMatch_Id(matchId: Long): List<Type>

    fun findByUser_Id(userId: Long): List<Type>
}
