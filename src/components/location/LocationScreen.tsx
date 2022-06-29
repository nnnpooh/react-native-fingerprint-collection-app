import React, {FC, useState} from 'react';
import {Dimensions, StatusBar, Animated} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import SiteTab from './SiteTab';
import PointTab from './PointTab';
import TabBar from './TabBar';

const initialLayout = {
  width: Dimensions.get('window').width,
};
const renderScene = SceneMap({
  site: SiteTab,
  point: PointTab,
});

const LocationScreen: FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'site',
      title: 'Site',
    },
    {
      key: 'point',
      title: 'Point',
    },
  ]);

  return (
    <>
      <TabView
        navigationState={{
          index: tabIndex,
          routes,
        }}
        renderScene={renderScene}
        renderTabBar={props => (
          <TabBar {...props} index={tabIndex} setIndex={setTabIndex} />
        )}
        onIndexChange={setTabIndex}
        initialLayout={initialLayout}
        style={{
          marginTop: StatusBar.currentHeight,
        }}
      />
    </>
  );
};

export default LocationScreen;
