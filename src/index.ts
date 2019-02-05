import getInput, { Queries } from './getInput'
import getWeatherReports, { WeatherResult } from './weather'
import formatWeatherResult from './formatWeather'
import { degreeType } from './consts'

async function main(): Promise<void> {
  try {
    const queries: Queries = await getInput()

    const reports: [WeatherResult] = await getWeatherReports({ queries, degreeType })

    console.log(
      reports
        .map(formatWeatherResult)
        .join('\n\n'),
    )
  } catch (error) {
    console.error(error.message)
  }
}

void main()
