import {View, Text} from 'react-native';
import React from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Shop} from 'iconsax-react-native';

import tw from '../../../../tailwind';

const ProviderLocation = ({
  region,
  addresBarStyle,
  style,
  mapContainerStyle,
  mapstyle,
}) => {
  return (
    <View style={tw.style('items-center rounded-15 flex-1', style)}>
      <MapView
        provider={PROVIDER_GOOGLE}
        rotateEnabled={false}
        scrollEnabled={false}
        zoomEnabled={true}
        style={tw.style('w-full h-45 rounded-15', mapContainerStyle)}
        customMapStyle={mapstyle}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={false}
        showsPointsOfInterest={true}
        showsCompass={false}
        initialRegion={{
          latitude: region.lat,
          longitude: region.lng,
          latitudeDelta: 0.07,
          longitudeDelta: 0.07,
        }}>
        <Marker coordinate={{latitude: region.lat, longitude: region.lng}} />
      </MapView>
      <View
        style={tw.style(
          'bg-white bv-heading-sm mb-2 py-3 w-3/4 px-2 items-center justify-center flex-row rounded-10 absolute  bottom-0',
          addresBarStyle,
        )}>
        <Shop size={18} color="#414141" style={tw`mr-2`} />
        <Text style={tw`bv-sans-sm`}>{region.address}</Text>
      </View>
    </View>
  );
};

export {ProviderLocation};
