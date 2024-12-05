import React from 'react';
import {View, Text, Image, FlatList, Platform, Linking} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {Car, Map1, Shop, TickCircle} from 'iconsax-react-native';

import tw from '../../../../tailwind';
import {Button} from '../../commons';
import {useLocation} from '../../../hooks';

const LocationAndAmenities = ({
  address,
  locationRadius,
  amenities,
  workSpaceImages,
  lng,
  lat,
}) => {
  const mapRef = React.createRef();
  const position = useLocation().location;

  const GetDirection = (long, lat) => {
    if (Platform.OS === 'ios') {
      Linking.openURL(
        `http://maps.apple.com/?daddr=${lat},${long}&saddr=${position.coords.latitude},${position.coords.longitude}`,
      );
    }
    if (Platform.OS === 'android') {
      Linking.openURL(
        `https://www.google.com/maps/dir/?api=1&origin=${position.coords.latitude},${position.coords.longitude}&destination=${lat},${long}&travelmode=driving`,
      );
    }
  };

  const Item = props => {
    const {id, title, icon, style} = props;
    return (
      <View
        key={id}
        style={tw.style('flex-row items-center w-1/2 py-1', style)}>
        {icon ? icon : <TickCircle size={18} color="#333333" />}
        <Text style={tw`ml-2 bv-sans-xs`} numberOfLines={2}>
          {title}
        </Text>
      </View>
    );
  };

  const renderItem = ({item}) => {
    return <Image style={tw`h-32 w-32 rounded-15`} source={{uri: item.url}} />;
  };
  return (
    <View>
      <View style={tw`my-1.5`}>
        {/* <Text style={tw`bv-heading-base text-primary mb-3`}>Address</Text> */}
        <View
          style={tw`flex-row bg-lightGray py-3 px-2.5 rounded-15 justify-between`}>
          <View style={tw`w-5/12 justify-between mr-2`}>
            <Item
              style={tw`w-full`}
              title={address}
              icon={<Shop size={18} color="#414141" />}
            />
            <Item
              style={tw`w-full`}
              title={`Mobile location radius: ${locationRadius} km`}
              icon={<Car size={18} color="#414141" />}
            />
            <Button
              title={'direction'}
              containerStyle={tw`mt-4`}
              style={tw`border border-primary h-auto w-22 p-2 rounded-10`}
              titleStyle={tw`bv-heading-xs`}
              icon={<Map1 size={14} color="#5948AA" />}
              defaultColor="#5948AA"
              onPress={() => GetDirection(lat, lng)}
            />
          </View>
          <View style={tw`w-6/12`}>
            <MapView
              ref={mapRef}
              provider={PROVIDER_GOOGLE}
              rotateEnabled={false}
              scrollEnabled={false}
              zoomEnabled={false}
              showsPointsOfInterest={true}
              style={tw`flex-1 rounded-lg`}
              initialRegion={{
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}>
              <Marker coordinate={{latitude: lat, longitude: lng}} />
            </MapView>
          </View>
        </View>
      </View>
      <View style={tw`my-1.5`}>
        {/* <Text style={tw`bv-heading-base text-primary mb-3`}>Amenities</Text> */}
        <View
          style={tw`flex-row flex-wrap justify-start bg-lightGray py-3 px-4 rounded-15`}>
          {amenities.map((item, index) => (
            <Item id={index} title={item} />
          ))}
        </View>
      </View>
      <View style={tw`my-1.5`}>
        {/* <Text style={tw`bv-heading-base text-primary mb-3`}>Work Space</Text> */}
        <FlatList
          contentContainerStyle={tw`justify-center py-3`}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={workSpaceImages}
          ItemSeparatorComponent={() => <View style={tw`w-4 h-full`} />}
          renderItem={item => renderItem(item)}
          keyExtractor={(item, index) => String(item.id || index)}
        />
      </View>
    </View>
  );
};

export {LocationAndAmenities};
