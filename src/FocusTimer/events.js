import { controls, musicButtons } from "./elements.js"
import * as actions from './actions.js'
import state from "./state.js"

export function registerControls() {
  controls.addEventListener('click', (event) => {
    const action = event.target.dataset.action

    if (typeof actions[action] != "function") {
      return
    }

    actions[action]()

  })

  musicButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      
      const clickedButton = event.target

      musicButtons.forEach(button => {
        if (button.dataset.action != clickedButton.dataset.action) {
          button.classList.remove('secondary') 
        }
      })
      
      clickedButton.classList.toggle('secondary')
      state.isMusicOn = clickedButton.classList.contains('secondary')

      actions.stopMusic()

      if (state.isMusicOn) {
        actions.playMusic(clickedButton.dataset.action)
      }

    })

  })

}