const expect = require('expect')

import getWeatherReports, {WeatherResult} from './weather'
import { degreeType } from './consts'

describe('Weather Service', function() {
  this.timeout(10000) // relies on using a non-arrow function!

  const nameMatch = (query: string, match: RegExp) => async (): Promise<void> => {
    const reports: [WeatherResult] = await getWeatherReports({queries: [query], degreeType})

    reports.forEach(
      ({ name }: WeatherResult): void => {
        expect(name).toMatch(match)
      }
    )
  }

  it ('All results for jerusalem contain jerusalem', nameMatch('jerusalem', /jerusalem/i))
  it ('All results for tel aviv contain israel', nameMatch('tel aviv', /israel/i))
  it ('Zip code 10001 is in NYC', nameMatch('10001', /new york/i))

  const temperatureRange = (query, min, max) => async () => {
    const reports: [WeatherResult] = await getWeatherReports({queries: [query], degreeType: 'C'})

    reports.forEach(
      ({ temperature }: WeatherResult): void => {
        expect(temperature).toBeGreaterThan(min)
        expect(temperature).toBeLessThan(max)
      }
    )
  }

  it ('It\'s never too cold in tel aviv', temperatureRange('tel aviv', -10, 45))
  it ('It\'s never too hot in quebec', temperatureRange('quebec', -40, 20))

  it ('London is in UTC', async () => {
    const reports: [WeatherResult] = await getWeatherReports({queries: ['london, uk'], degreeType: 'C'})

    reports.forEach(
      ({ timezone }: WeatherResult): void => {
        expect(timezone).toBe(0)
      }
    )
  })
})