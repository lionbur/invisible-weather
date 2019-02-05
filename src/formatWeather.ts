import { WeatherResult } from './weather'
import { degreeType } from './consts'

const formatLatitude = (latitude: number) => (latitude > 0 ? `${latitude}\xb0N` : `${-latitude}\xb0S`)
const formatLongitude = (longitude: number) => (longitude > 0 ? `${longitude}\xb0E` : `${-longitude}\xb0W`)
const nowInTimeZone = (hourOffset: number) => (
  new Date(Date.now() + hourOffset * 60 * 60 * 1000)
    .toLocaleTimeString()
)

/* eslint-disable indent */
export default ({
  name,
  latitude,
  longitude,
  weather,
  temperature,
  feelsLike,
  humidity,
  windDisplay,
  timezone,
}: WeatherResult) => (
`The weather in ${name} (${formatLatitude(latitude)} ${formatLongitude(longitude)}) is ${weather}.
The temperature is ${temperature}\xb0${degreeType}\
${temperature !== feelsLike ? ', but it feels like ${feelsLike}\xb0${degreeType}' : ''}.
The humidity is ${humidity}% and the wind is ${windDisplay}.
The time there is ${nowInTimeZone(timezone)}`
)
