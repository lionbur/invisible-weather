import { flow } from 'lodash/fp'

import getInput, {Queries} from './getInput'
import getWeatherReports, {WeatherResult} from './weather'
import formatWeatherResult from './formatWeather'
import { degreeType } from './consts'

async function main(): Promise<void> {
  try {
    const queries: Queries = await getInput()

    const reports: [WeatherResult] = await getWeatherReports({queries, degreeType})

    console.debug(
      reports
        .map(formatWeatherResult)
        .join('\n\n')
    )

  } catch (error/*: Error*/) {
    console.error(error.message)
  }
}

void main()
