const testPrimeNumber = 2

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
