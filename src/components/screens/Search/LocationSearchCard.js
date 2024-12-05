import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Car, Shop} from 'iconsax-react-native';

import tw from '../../../../tailwind';
import {TabBar, TabBarItem} from '../../commons';
import {LocationSearch} from '../../elements';

const LocationSearchCard = ({title, style, onSubmit = () => false}) => {
  const [myLocation, setMyLocation] = useState(false);
  const [address, setAddress] = useState('');

  useEffect(() => {
    let locationSearchOptions = {
      where: !myLocation ? 'studio' : 'my_location',
      address: address,
    };
    onSubmit(locationSearchOptions, address !== '' ? true : false);
  }, [address, myLocation]);
  return (
    <View
      style={[tw.style('bg-white px-2 py-6  rounded-3xl shadow-md '), style]}>
      <Text
        style={tw`
            tp-heading text-[16px] ml-2 text-[#414141] mb-5 capitalize text-center`}>
        {title}
      </Text>
      <TabBar>
        <TabBarItem
          options={{
            title: 'Provider Location',
            icon: <Shop size={18} color="#5948AA" />,
            onPress: () => setMyLocation(false),
          }}>
          <LocationSearch
            label="Searching Area"
            placeholder="Enter Your Address"
            desription="You would go to the provider location, home, studio, or salon."
            onSubmit={val => setAddress(val)}
          />
        </TabBarItem>
        <TabBarItem
          options={{
            title: 'My Location',
            icon: <Car size={18} color="#5948AA" />,
            onPress: () => setMyLocation(true),
          }}>
          <LocationSearch
            placeholder="My Current Location"
            desription="Mobile provider would come to your location, house, office, etc."
            onSubmit={val => setAddress(val)}
          />
        </TabBarItem>
      </TabBar>
    </View>
  );
};

export {LocationSearchCard};
