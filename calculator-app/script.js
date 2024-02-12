'use strict'
const buttons = [...document.querySelectorAll('button')]

let screen = document.querySelector('#screen')

// screen.value = '234'

buttons.forEach((button) => {
  button.onclick = getValue
})
let temp = [] // this array is used to temperarily hold the value of the keys pressed
let operationArray = [] // this array holds the key operation values
screen.value = ''
function getValue(e) {
  let result /// 'result will be the value displayed'
  let val = e.target.textContent

  if (!isNaN(val)) {
    if (operationArray.length === 1) {
      // to prevent value on the screen from dissapearing
      temp.push(operationArray[0])
      operationArray = []
    }
    temp.push(val)
  }
  if (val === '.') {
    if (operationArray.length === 1) {
      temp[0] = operationArray[0]
      operationArray = []
    }
    if (operationArray[0] % 1 === 0) temp.push(val)
  }

  screen.value = temp.join('') // this is so that multiple key presses can form one number ie multiple digit number.
  if (
    val === 'X' ||
    val === '÷' ||
    val === '-' ||
    val === '+' ||
    val === '%' ||
    val === '='
  ) {
    let num = temp.join('')
    temp = []
    if (num !== '') {
      /// this condition is to avoid bug if no number is pressed before an operator is pressed.
      operationArray.push(num)
    }

    if (val === '=') {
      if (isNaN(operationArray.slice(-1))) operationArray.pop() /// this is to prevent bug if last element of operation Array is something other than number.
      result = eval(operationArray.join(''))
      screenWrite(result)
      operationArray = []
      operationArray.push(result)
    }
    if (val === '÷') val = '/' //  defining diff operations while pressing diff operators
    if (val === 'X') val = '*' //
    if (val === '%') {
      //
      result = operationArray[0] / 100
      operationArray = []
      operationArray.push(result)
      screenWrite(result)
    }
    if (operationArray.length === 3) {
      // this is to reset operation array by performing the required operation between values and adding those values back to the array.
      result = eval(operationArray.join(''))
      operationArray = []
      operationArray.push(result)
      operationArray.push(val)
      screenWrite(result)
    } else if (isNaN(operationArray[1]) && val !== '%' && val !== '=') {
      operationArray[1] = val
    }
    screenWrite(operationArray[0]) // to keep the prvious number on screen while performing operations on results of '=' or '%'
  }
  clearButton(val)
  console.log(operationArray)
}

function screenWrite(result) {
  screen.value = result
}

function clearButton(val) {
  if (val === 'AC') {
    temp = []
    operationArray = []
    screenWrite('')
  }
  if (val === 'CE') {
    if (operationArray.length === 1) operationArray = []
    /// to solve the bug of pressing CE after '=' sign or '%' sign (the bug concated the result with the new number after pressing CE)
    else temp = []
    screenWrite('')
  }
}
