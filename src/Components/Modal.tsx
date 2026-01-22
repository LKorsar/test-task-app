import { useMachine } from '@xstate/react';
import { myStateMachine } from '../StateMachines/stateMachine';

function Modal () {
  const [state, send] = useMachine(myStateMachine);
};

export default Modal;