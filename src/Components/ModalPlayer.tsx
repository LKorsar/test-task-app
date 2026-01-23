import { Modal, Button } from 'antd';
import { useMachine } from '@xstate/react';
import { useRef, useEffect, useState } from 'react';
import { ShrinkOutlined, CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import { myStateMachine } from '../StateMachines/stateMachine';
import './ModalPlayer.css';

interface ModalPlayerProps {
  open: boolean;
  onClose: () => void;
  videoURL?: string;
}

function ModalPlayer ({ open, onClose, videoURL }: ModalPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (open && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Autoplay failed:', error);
      });
    }
  }, [open]);

  const [state, send] = useMachine(myStateMachine);
  const isPlaying = state.matches({ playback: 'playing' });
  const isFullDisplay = state.matches({ displayMode: 'full' });
  const isMiniDisplay = state.matches({ displayMode: 'mini' });

  const [lastClicked, setLastClicked] = useState<'play' | 'display' | null>(null);

  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
    setLastClicked('play');
    send({ type: 'togglePlayPauseBtn' });
  };

  const handleToggleDisplay = () => {
    setLastClicked('display');
    send({ type: 'toggleButton' });
  };

  const isPlayButtonActive = lastClicked === 'play';
  const isDisplayButtonActive = lastClicked === 'display';

  const modalFooter = [
    <Button
      key="toggleDisplay"
      type="default"
      shape="circle"
      icon={isFullDisplay ? <ShrinkOutlined /> : <ShrinkOutlined rotate={180} />}
      onClick={handleToggleDisplay}
      size="large"
      className={isDisplayButtonActive ? "active-button" : ""}
    />,
    <Button
      key="togglePlay"
      type="default"
      shape="circle"
      icon={isPlaying ? <PauseOutlined /> : <CaretRightOutlined />}
      onClick={handleTogglePlay}
      size="large"
      className={isPlayButtonActive ? "active-button" : ""}
    />
  ];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={isFullDisplay ? 1000 : 400}
      className={`modal-player ${isMiniDisplay ? "mini-player-modal" : ""}`}
      title='PLAYER'
      footer={modalFooter}
      centered={!isMiniDisplay}
    >
      <div
        className="ant-modal-body"
        style={{ 
          width: '100%', 
          height: '100%',
          padding: 0
        }}>
          <video
            ref={videoRef}
            autoPlay={true}    
            loop={true}
            controls={false}
            muted={true}
            playsInline={true}
            preload="auto"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              cursor: 'pointer'
            }}
            src={videoURL}
            onClick={handleTogglePlay}
          >
            Ваш браузер не поддерживает видео.
          </video>
      </div>
    </Modal>
  );
};

export default ModalPlayer;