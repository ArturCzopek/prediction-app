package pl.simplecoding.prediction

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableScheduling

@SpringBootApplication
@EnableScheduling
class PredictionAppApplication

fun main(args: Array<String>) {
    runApplication<PredictionAppApplication>(*args)
}
