import { createMachine } from "xstate";

export const myStateMachine = createMachine({
  id: 'player',
  type: 'parallel',
  states: {
    displayMode: {
      initial: 'full',
      states: {
        mini: {
          on: {
            toggleButton:  'full',
          }
        },
        full: {
          on: {
            toggleButton: 'mini',
          },
        },
      },  
    },
    playback: {
      initial: 'playing',
      states: {
        playing: {
          on: {
            togglePlayPauseBtn: 'paused',
            },
        },
        paused: {
          on: {
            togglePlayPauseBtn: 'playing',
          },
        },
      },
    },
  },
})