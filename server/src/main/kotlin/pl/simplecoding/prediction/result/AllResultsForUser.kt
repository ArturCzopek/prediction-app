package pl.simplecoding.prediction.result

data class AllResultsForUser(
        val fullUserName: String,
        val place: Int,
        val resultsForMatches: List<ResultForMatch>
) {
    val summaryPoints by lazy {
        with(resultsForMatches.mapNotNull { it.pointsForMatch }) {
            when {
                this.isEmpty() -> 0
                else -> this.reduce { acc, points -> acc + points }
            }
        }
    }
}
