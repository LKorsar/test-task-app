import { createMachine } from "xstate";

export const myStateMachine = createMachine({
  id: 'player',
  type: 'parallel',
  states: {
    displayMode: {
      initial: 'full',
      states: {
        mini: {
          meta: {
            description: 'The video is just a small image',
          },
          on: {
            toggleButton: 'full',
          }
        },
        full: {
          meta: {
            description: 'Full-screen video',
          },
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