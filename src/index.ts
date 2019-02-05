import getInput from './getInput'

async function main(): Promise<void> {
  try {
    const answers: [string?] = await getInput()

  } catch (error/*: Error*/) {
    console.error(error.message)
  }
}
void main()
