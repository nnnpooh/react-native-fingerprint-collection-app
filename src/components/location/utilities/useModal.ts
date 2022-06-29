import {useState} from 'react';
import {ModalType} from '../types/modal';

function useModal() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('ADD_SITE');

  function handlePress(type: ModalType) {
    setModalType(type);
    setShowModal(true);
  }

  return {handlePress, showModal, modalType, setShowModal};
}

export default useModal;
