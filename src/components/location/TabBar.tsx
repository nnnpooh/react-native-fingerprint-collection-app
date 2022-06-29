import React, {FC} from 'react';
import {SceneRendererProps, NavigationState} from 'react-native-tab-view';
import {Box, Pressable, useColorModeValue} from 'native-base';
import {Animated} from 'react-native';
interface Route {
  key: string;
  title: string;
}

interface Props extends SceneRendererProps {
  navigationState: NavigationState<Route>;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}
const TabBar: FC<Props> = ({navigationState, position, index, setIndex}) => {
  const inputRange = navigationState.routes.map((x, i) => i);
  return (
    <Box flexDirection="row">
      {navigationState.routes.map((route, i) => {
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(inputIndex =>
            inputIndex === i ? 1 : 0.5,
          ),
        });
        const color =
          index === i
            ? useColorModeValue('#000', '#e5e5e5')
            : useColorModeValue('#1f2937', '#a1a1aa');
        const borderColor =
          index === i
            ? 'cyan.500'
            : useColorModeValue('coolGray.200', 'gray.400');
        return (
          <Box
            key={route.key}
            borderBottomWidth="3"
            borderColor={borderColor}
            flex={1}
            alignItems="center"
            p="3">
            <Pressable
              onPress={() => {
                setIndex(i);
              }}>
              <Animated.Text
                style={{
                  color,
                }}>
                {route.title}
              </Animated.Text>
            </Pressable>
          </Box>
        );
      })}
    </Box>
  );
};

export default TabBar;
