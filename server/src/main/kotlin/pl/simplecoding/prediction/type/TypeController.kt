package pl.simplecoding.prediction.type

import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/types")
class TypeController(private val typeService: TypeService) {

    @PostMapping("/new")
    fun addType(@RequestBody newTypeDto: NewTypeDto, authentication: Authentication) = typeService.addNewType(newTypeDto, authentication.name)
}
