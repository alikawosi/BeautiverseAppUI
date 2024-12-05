import {View, Text, Pressable, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {Edit, More, Trash} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';

const LocationCard = ({
  id,
  title,
  description,
  value,
  style,
  onDeletePress = () => false,
  onUpdatePress = () => false,
}) => {
  const {navigate} = useNavigation();
  const [activeKey, setActiveKey] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const a = useQuery({queryKey: ['GetAddresses']});

  return (
    <View style={tw.style('flex-row mb-5', style)}>
      <View style={tw`w-3/4 mr-2`}>
        <Text style={tw`tp-heading text-left w-full`} value={value}>
          {title}
        </Text>
        <Text style={tw`tp-body1 text-left rounded-2xl w-full`}>
          {description}
        </Text>
      </View>
      <View style={tw`flex-row w-1/4 items-center justify-center `}>
        {activeKey !== id ? (
          <Pressable style={tw`p-2 `} onPress={() => setActiveKey(id)}>
            <More size="18" color="#717171" style={tw` `} />
          </Pressable>
        ) : (
          <View style={tw`flex-row m-1 `}>
            {!isLoading ? (
              <Trash
                size="18"
                color="#D70D19"
                style={tw`p-3 m-2`}
                onPress={() => {
                  setIsLoading(true);
                  onDeletePress();
                }}
              />
            ) : (
              <ActivityIndicator />
            )}

            <Edit
              size="18"
              color="#5948AA"
              style={tw`p-3 m-2`}
              onPress={() =>
                navigate('AddAddressModal', {
                  label: 'Add Address',
                  initialValues: {name: title, address: description},
                  id: id,
                  refetch: () => onUpdatePress(),
                })
              }
            />
          </View>
        )}
      </View>
    </View>
  );
};

export {LocationCard};
