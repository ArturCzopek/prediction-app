package com.metrosoft.prediction

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class PredictionAppApplication

fun main(args: Array<String>) {
    runApplication<PredictionAppApplication>(*args)
}
