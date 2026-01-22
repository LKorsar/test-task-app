import { Modal } from 'antd';
import { useMachine } from '@xstate/react';
import { myStateMachine } from '../StateMachines/stateMachine';

interface ModalPlayerProps {
  open: boolean;
  onClose: () => void;
}

function ModalPlayer ({ open, onClose }: ModalPlayerProps) {
  const [state, send] = useMachine(myStateMachine);
  return (
    <Modal
      open={open}
      onCancel={onClose}
    >
      <div>Здесь будеть видеопроигрыватель</div>
    </Modal>
  );
};

export default ModalPlayer;