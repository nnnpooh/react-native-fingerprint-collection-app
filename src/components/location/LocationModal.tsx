import React, {FC} from 'react';
import {Modal, Button} from 'native-base';
import {ModalType} from 'src/components/location/types/modal';
import useLocationForm from 'src/components/location/utilities/useLocationForm';
import LocationModalContent from 'src/components/location/LocationModalContent';
import useLocation from 'src/components/location/utilities/useLocation';

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalType: ModalType;
}

const LocationModal: FC<Props> = ({showModal, setShowModal, modalType}) => {
  const {form} = useLocationForm(modalType);

  // console.log({value: form.watch(), error: form.formState.errors});
  const {mutate} = useLocation(
    setShowModal,
    form.reset,
    form.setError,
    modalType,
  );
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>{modalType}</Modal.Header>
        <Modal.Body>
          <LocationModalContent form={form} type={modalType} />
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setShowModal(false);
                console.log('here');
                form.reset();
              }}>
              Cancel
            </Button>
            <Button onPress={form.handleSubmit(data => mutate(data))}>
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default LocationModal;
