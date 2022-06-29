import React, {FC} from 'react';
import {Select} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import {SiteType, PointType} from 'src/components/location/types/location';

interface OptionType {
  label: string;
  value: string;
}

interface Props {
  currentLocation: SiteType | PointType;
  onValueChange: (value: string) => void;
  options: OptionType[];
  placeholder: string;
}

const SelectLocation: FC<Props> = ({
  currentLocation,
  onValueChange,
  options,
  placeholder,
}) => {
  return (
    <Select
      flexGrow={1}
      selectedValue={currentLocation.key}
      accessibilityLabel={placeholder}
      placeholder={placeholder}
      _selectedItem={{
        bg: 'teal.600',
        endIcon: <Icon name="check" size={30} color="white" />,
      }}
      onValueChange={onValueChange}>
      {options.map(option => (
        <Select.Item
          label={option.label}
          value={option.value}
          key={option.value}
        />
      ))}
    </Select>
  );
};

export default SelectLocation;
