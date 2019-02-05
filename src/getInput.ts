import { createInterface } from 'readline'

export type Queries = string[]
type QueriesResolve = (_: Queries) => void
type Reject = (error: Error) => void

export default (): Promise<Queries> => new Promise(
  (resolve: QueriesResolve, reject: Reject): void => {
    const io = createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: 'Location name or postal code (empty value to end): ',
      terminal: false,
    })
    const answers: Queries = []

    io
      .on('line', (answer: string): void => {
        if (!answer) {
          return void resolve(answers)
        }

        answers.push(answer)
        return void io.prompt()
      })
      .on('close', (): void => {
        reject(new Error('Input closed'))
      })

    return void io.prompt()
  },
)
