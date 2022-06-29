import React, {FC} from 'react';
import {Button, Text} from 'native-base';

interface Props {
  onPress: () => void;
  label: string;
  bg: string;
}

const HomeMenuButton: FC<Props> = ({onPress, label, bg}) => {
  return (
    <Button onPress={onPress} bg={bg} borderRadius="lg" h="24" shadow={3}>
      <Text fontSize={'lg'} color="white">
        {label}
      </Text>
    </Button>
  );
};

export default HomeMenuButton;
