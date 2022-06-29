import React, {FC, useState} from 'react';
import {Modal, Button, Fab} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import SettingModalContent from 'src/components/settings/SettingModalContent';
import useSettingForm from 'src/components/settings/utilities/useSettingForm';
import useSettings from 'src/components/settings/utilities/useSettings';

const SettingModal: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const {handleSubmit, watch, control, formState, reset, setError} =
    useSettingForm();
  const {mutate} = useSettings(setShowModal, reset, setError);

  // console.log({value: watch(), errors: formState.errors});
  return (
    <>
      <Fab
        placement="bottom-right"
        size="lg"
        icon={<Icon name="edit" size={30} color="white" />}
        onPress={() => setShowModal(true)}
      />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Edit Settings</Modal.Header>
          <Modal.Body>
            <SettingModalContent control={control} formState={formState} />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                  reset();
                }}>
                Cancel
              </Button>
              <Button onPress={handleSubmit(data => mutate(data))}>Save</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default SettingModal;
