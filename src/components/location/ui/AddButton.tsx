import React, {FC} from 'react';
import {IconButton} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';

interface Props {
  onPress: () => void;
}

const AddButton: FC<Props> = ({onPress}) => {
  return (
    <IconButton
      onPress={onPress}
      icon={<Icon name="plus" size={20} color="white" />}
      size="lg"
      bg="primary.500"
      variant="solid"
      borderRadius={'full'}
    />
  );
};
export default AddButton;
