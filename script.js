'use strict'
const techButton = document.getElementById('tech-button')
const coreButton = document.getElementById('core-button')
const techContainer = document.getElementById('tech')
const coreContainer = document.getElementById('core')

techButton.onclick = function (e) {
  if (!techButton.classList.contains('active')) {
    techButton.classList.add('active')
    techContainer.classList.remove('hidden')
    coreContainer.classList.add('hidden')
    coreButton.classList.remove('active')
  }
}
coreButton.onclick = function (e) {
  if (!coreButton.classList.contains('active')) {
    coreButton.classList.add('active')
    coreContainer.classList.remove('hidden')
    techButton.classList.remove('active')
    techContainer.classList.add('hidden')
  }
}
