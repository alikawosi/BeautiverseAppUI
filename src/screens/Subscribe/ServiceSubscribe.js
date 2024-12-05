import {ScrollView, Text, View} from 'react-native';
import React, {useState} from 'react';
import {AddCircle} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';
import {SelectedServiceData, SUBSCRIBE_CONST} from '../../constants';
import {
  ProfessionalProfileSummary,
  SelectedServiceCard,
} from '../../components/screens/Booking';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, CheckBox, Form} from '../../components/commons';

const ServiceSubscribe = ({route}) => {
  const [aggrementFlag, setAggrementFlag] = useState(false);
  const {navigate} = useNavigation();

  return (
    <SafeAreaView style={tw`flex-1 flex bg-white `}>
      <ScrollView style={tw`px-6`}>
        <ProfessionalProfileSummary
          professionalImage={
            route.params.profileInfo.img.url
              ? {uri: route.params.profileInfo.img.url}
              : require('../../assets/media/UserDefault.png')
          }
          professionalName={route.params.profileInfo.title}
          verified={route.params.profileInfo.verified}
          professionalAddress={route.params.profileInfo.location.address}
          distance={route.params.profileInfo.distance}
          style={tw`mb-4`}
        />
        <View style={tw`flex-row justify-between`}>
          <Text style={tw`bv-sans-sm capitalize text-primary`}>
            Subscription details
          </Text>
          <Text style={tw`bv-med-xs capitalize text-primary`}>
            how does it work?
          </Text>
        </View>
        {SelectedServiceData.map(item => {
          return (
            <SelectedServiceCard
              key={item.key}
              title={item.title}
              description={item.description}
              price={item.price}
              duration={item.duration}
              style={tw`mb-4`}
              closable
            />
          );
        })}
        <Button
          title={'Add Another Service'}
          titleStyle={tw`bv-sans-xs `}
          defaultColor={'#5948AA'}
          onPress={() => {
            navigate('Profile', {
              screen: 'ProfessionalProfile',
            });
          }}
          icon={<AddCircle size={18} color={'#5948AA'} />}
          style={tw`border border-basicGray rounded-10 justify-start mb-6 px-1 py-2 h-auto w-1/2 `}
        />
        <Form fields={SUBSCRIBE_CONST.subscribeFormData} />
        <View style={tw`h-0.25 w-full mb-6 w-full bg-lightGray`} />
        <View style={tw`flex-row justify-between mb-5`}>
          <Text style={tw`bv-med-sm capitalize text-grayBorder`}>
            Total appointments:
          </Text>
          <Text style={tw`bv-sans-base capitalize `}>12</Text>
        </View>
        <View style={tw`flex-row justify-between mb-5`}>
          <Text style={tw`bv-med-sm capitalize text-grayBorder`}>
            Total Credit:
          </Text>
          <Text style={tw`bv-sans-base capitalize `}>$1200</Text>
        </View>
        <View style={tw`flex-row justify-between mb-5`}>
          <Text style={tw`bv-med-sm capitalize text-grayBorder`}>
            Total Payment:
          </Text>
          <Text style={tw`bv-sans-base capitalize `}>how does it work?</Text>
        </View>
        <View style={tw`flex-row justify-between mb-5`}>
          <Text style={tw`bv-med-sm capitalize text-basicGreen`}>
            Saving Amount
          </Text>
          <Text style={tw`bv-sans-base capitalize text-basicGreen `}>$120</Text>
        </View>
        <View style={tw`h-0.25 w-full mb-4 w-full bg-lightGray`} />
        <View style={tw`flex-row justify-between mb-10`}>
          <Text style={tw`bv-sans-base capitalize text-grayBorder`}>
            Your Payment Plan:
          </Text>
          <View style={tw`items-end`}>
            <View style={tw`flex-row`}>
              <Text style={tw`bv-sans-base text-primary mr-1 `}>$90</Text>
              <Text style={tw`bv-sans-base text-black `}>Every 2 Weeks</Text>
            </View>
            <View style={tw`flex-row`}>
              <Text style={tw`bv-sans-xs line-through text-grayBorder mr-1  `}>
                $100
              </Text>
              <Text style={tw`bv-sans-xs text-grayBorder capitalize `}>
                Every 2 Weeks
              </Text>
            </View>
          </View>
        </View>
        <CheckBox
          style={tw`mb-6 items-start `}
          labelStyle={tw`bv-sans-sm `}
          label={
            'I have read and agreed to Beautiverse and ' +
            route.params.profileInfo.title +
            ' cancellation policy.'
          }
          isChecked={aggrementFlag}
          size={26}
          onPress={() => setAggrementFlag(!aggrementFlag)}
        />
        <Button primary title="Subscribe" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServiceSubscribe;
