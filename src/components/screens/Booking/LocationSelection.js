import {View} from 'react-native';
import React from 'react';
import {Car, Shop} from 'iconsax-react-native';

import tw from '../../../../tailwind';
import {TabBar, TabBarItem} from '../../commons';
import {ProviderLocation} from './ProviderLocation';
import {LocationSearch} from '../../elements';

const LocationSelection = ({
  professionalLocation,
  onMyLocationSubmit = () => false,
  onProviderLocationPress = () => false,
}) => {
  return (
    <View>
      <TabBar>
        <TabBarItem
          options={{
            title: 'Provider Location',
            icon: <Shop size={18} color="#5948AA" />,
            onPress: () => onProviderLocationPress(),
          }}>
          <ProviderLocation region={professionalLocation} style={tw`mt-4`} />
        </TabBarItem>
        <TabBarItem
          options={{
            title: 'My Location',
            icon: <Car size={18} color="#5948AA" />,
          }}>
          <LocationSearch
            label="Your Address"
            placeholder="Enter Your Address"
            style={tw`mt-3`}
            onSubmit={val => onMyLocationSubmit(val)}
          />
        </TabBarItem>
      </TabBar>
    </View>
  );
};

export {LocationSelection};
