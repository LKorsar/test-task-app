import { PlayCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import './App.css'
import ModalPlayer from './Components/Modal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className='App'>
      <div className='closed-modal'>
        <PlayCircleOutlined
          className='play-circle'
          style={{ fontSize: '48px', color: '#8585ff' }}
          onClick={showModal}
        />
      </div>
      <ModalPlayer open={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export default App
