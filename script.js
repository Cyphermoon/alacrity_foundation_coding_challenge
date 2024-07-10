const primeNumberForm = document.querySelector("form.prime_number_form")
const primeInputNumber = document.querySelector("#prime_number_input")
const primeNumberOutput = document.querySelector("#prime_number_output")

const testPrimeNumber = 2



/*** UTILITY FUNCTIONS *******/
function convertToNumber(_input) {
    const input = parseInt(_input)

    if (isNaN(input)) throw new Error("Please provide a value with the type of number");

    return input
}

function isPrimeNumber(_inputNumber) {
    const inputNumber = convertToNumber(_inputNumber)
    const factors = []

    // numbers less than one are not considered prime number
    if (inputNumber <= 1) return { isPrime: false, factors }

    // loop through all possible factors excluding 1 and the number itself
    for (let i = inputNumber - 1; i > 1; i--) {
        if (inputNumber % i === 0) factors.push(i)
    }

    return {
        isPrime: factors.length === 0,
        factors
    }

}


function getPrimeNumberBetweenRange(_lowerRange, _upperRange) {
    const lowerRange = convertToNumber(_lowerRange)
    const upperRange = convertToNumber(_upperRange)
    const primeNumbers = []

    // check for prime number between range with both lower and upper range inclusive
    for (let i = lowerRange; i <= upperRange; i++) {
        if (isPrimeNumber(i).isPrime) primeNumbers.push(i)
    }

    return primeNumbers
}

function resetValues() {
    primeInputNumber.value = ""
    primeNumberOutput.textContent = "Please submit a number to check 'primeness' of the number"

}

function convertInputToRangeFormat(inputNumber) {
    // check if the input is in a range format e.g 1-2
    const rangeRegex = /(\d\-\d)/g

    if (!rangeRegex.test(inputNumber)) return [];

    const range = inputNumber.split("-")
    return range
}




/***** User Interface Manipulation */

primeNumberForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const inputNumber = primeInputNumber.value
    const range = convertInputToRangeFormat(inputNumber)

    // Check if it is a range instead of an ordinary number
    if (range.length > 0) {

        const primeNumbers = getPrimeNumberBetweenRange(range[0], range[1])

        primeNumberOutput.textContent = `Prime numbers between ${range[0]} and ${range[1]} are: ${primeNumbers.join(", ")}`

        setTimeout(() => {
            resetValues()
        }, 3000)
        return
    }

    try {
        // check if the input is a prime number
        // Output 'Prime!' if it is
        if (isPrimeNumber(inputNumber).isPrime) {
            primeNumberOutput.textContent = `Prime!`
        }
        // Otherwise Print the factors
        else {
            primeNumberOutput.textContent = `${inputNumber} is not a prime number. Factors: ${isPrimeNumber(inputNumber).factors.join(", ")}`
        }

        // reset the values after three seconds
        setTimeout(() => {
            resetValues()
        }, 3000)

    } catch (err) {
        alert(err.message)
        resetValues()
    }
})
