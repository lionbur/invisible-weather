import { flatten } from 'lodash/fp'

const weather = require('weather-js')

export type WeatherResult = {
  name: string,
  latitude: number,
  longitude: number,
  weather: string,
  timezone: number,
  temperature: number,
  feelsLike: number,
  humidity: number,
  windDisplay: string,
}
type ResolveWeather = (weather: WeatherResult[]) => void
type RejectWeather = (error: Error) => void
type WeatherJsResult = {
  location: {
    name: string,
    timezone: string,
    lat: string,
    long: string,
  },
  current: {
    temperature: string,
    skytext: string,
    feelslike: string,
    humidity: string,
    winddisplay: string,
  }
}

class WeatherError extends Error {
  public search: string

  constructor(message: string, search: string) {
    super(message)

    this.search = search
  }
}

const findWeather = (search: string, degreeType: string): Promise<WeatherResult[]> => new Promise(
  (resolve: ResolveWeather, reject: RejectWeather) => {
    void weather.find({ search, degreeType }, (err: string, results?: WeatherJsResult[]) => {
      if (err) {
        return void reject(new WeatherError(err, search))
      }

      return void resolve(results
        .map(({ location, current }: WeatherJsResult) => ({
          name: location.name,
          latitude: parseFloat(location.lat),
          longitude: parseFloat(location.long),
          timezone: parseInt(location.timezone, 10),
          weather: current.skytext,
          temperature: parseInt(current.temperature, 10),
          feelsLike: parseInt(current.feelslike, 10),
          humidity: parseInt(current.humidity, 10),
          windDisplay: current.winddisplay,
        })))
    })
  },
)

type GetWeatherReportsArgs = {
  queries: string[],
  degreeType: string,
}

export default async ({ queries, degreeType }: GetWeatherReportsArgs): Promise<any> => {
  try {
    const reports = await Promise.all(
      queries
        .map(query => findWeather(query, degreeType)),
    )

    return flatten(reports)
  } catch (e) {
    const error: WeatherError = e as WeatherError

    console.error(`Error while searching for ${error.search}: ${error.message}`)
    throw error
  }
}
