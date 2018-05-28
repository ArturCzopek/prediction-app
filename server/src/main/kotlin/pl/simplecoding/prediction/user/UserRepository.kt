package pl.simplecoding.prediction.user

import org.springframework.data.repository.CrudRepository

interface UserRepository: CrudRepository<User, Long>
