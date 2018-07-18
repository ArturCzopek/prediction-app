package pl.simplecoding.prediction.statistic

sealed class StatRecord<T>(val key: String, val value: T)

class NumericRecord(key: String, value: Number): StatRecord<Number>(key, value)

class StringRecord(key: String, value: String): StatRecord<String>(key, value)