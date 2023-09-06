import state from './state.js'
import * as timer from './timer.js'
import * as sounds from './sounds.js'

export function toggleRunning() {
  state.isRunning = document.documentElement.classList.toggle('running')

  document.getElementById('btnPlay').classList.add('secondary')
  document.getElementById('btnPause').classList.add('secondary')
  
  document.getElementById('btnReset').classList.remove('secondary')

  timer.countDown()
  sounds.buttonPressAudio.play()
}

export function reset() {
  state.isRunning = false
  state.minutes = 0
  state.seconds = 0

  document.getElementById('minutes').innerText = String(state.minutes).padStart(2, "0")
  document.getElementById('seconds').innerText = String(state.seconds).padStart(2, "0")
  
  document.documentElement.classList.remove('running')

  document.getElementById('btnReset').classList.add('secondary')

  document.getElementById('btnPlay').classList.remove('secondary')
  document.getElementById('btnPause').classList.remove('secondary')

  sounds.kitchenTimer.pause()
  sounds.buttonPressAudio.play()
}

export function plus5() {
  if(state.minutes >= 60) {
    return
  }

  state.minutes += 5
  document.getElementById('minutes').innerText = String(state.minutes).padStart(2, "0")

  sounds.buttonPressAudio.play()
}

export function minus5() {
  if(state.minutes === 0) {
    return
  }

  if(state.minutes <= 5 && state.isRunning) {
    reset()
    sounds.kitchenTimer.play()
    return
  }

  state.minutes -= 5
  document.getElementById('minutes').innerText = String(state.minutes).padStart(2, "0")

  sounds.buttonPressAudio.play()
}

export function playMusic(action) {
  switch (action) {
    case "playForest":
      sounds.musicForest.play()
      break;

    case "playRain":
      sounds.musicRain.play()
      break;
  
    case "playCoffeShop":
      sounds.musicCoffeShop.play()
      break;
    
    case "playFire":
      sounds.musicFireplace.play()
      break;
    
    default:
      break;
  }
      
}

export function stopMusic() {
  sounds.musicForest.pause();
  sounds.musicRain.pause();
  sounds.musicCoffeShop.pause();
  sounds.musicFireplace.pause();
}
