import { createInterface } from 'readline'

type Answers = [string?]
type AnswersResolve = (_: Answers) => void
type Reject = (error: Error) => void

export default (): Promise<Answers> => new Promise((resolve: AnswersResolve, reject: Reject): void => {
  const io = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Location name or postal code (empty value to end): ',
    terminal: false,
  })
  const answers: Answers = []

  io
    .on('line', (answer: string): void => {
      if (!answer) {
        return void resolve(answers)
      }

      answers.push(answer)
      io.prompt()
    })
    .on('close', (): void => {
      reject(new Error('Input closed'))
    })

  void io.prompt()
})