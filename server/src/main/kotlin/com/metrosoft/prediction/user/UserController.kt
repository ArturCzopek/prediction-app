package com.metrosoft.prediction.user

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class UserController(private val userRepository: UserRepository) {

    @RequestMapping("/users")
    fun all() = userRepository.findAll()
}