package com.metrosoft.prediction.user

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/users")
class UserController(private val userRepository: UserRepository) {

    // todo remove
    @GetMapping
    fun getAllUsers() = userRepository.findAll()
}
