import React, {FC} from 'react';
import {Center, IconButton} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';

interface Props {
  onPress: () => void;
}

const EditButton: FC<Props> = ({onPress}) => {
  return (
    <IconButton
      variant="solid"
      bg="primary.500"
      size="md"
      icon={<Icon name="edit" size={15} color="white" />}
      onPress={onPress}
    />
  );
};
export default EditButton;
