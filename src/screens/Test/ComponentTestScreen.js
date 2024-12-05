import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Input,
  DatePicker,
  Select,
  Button,
  Form,
} from '../../components/commons';
import tw from '../../../tailwind';
import {SearchCard} from '../../components/screens/Search/SearchCard';
import {Location} from 'iconsax-react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {MyTabBar} from '../../components/screens/Search/SearchScreenTabBar';
import Home from '../Home';
import ServiceSearch from '../Search/ServiceSearch';
import Index from './Test';
const data = [
  {key: '0', name: 'Male', value: 'Male'},
  {key: '1', name: 'Female', value: 'Female'},
  {key: '2', name: 'Other', value: 'Other'},
];
const formData = [
  {name: 'Male', type: 'input', label: 'firstName', validation: 'required'},
  {
    name: 'date',
    type: 'datePicker',
    label: 'Birth Date',
    validation: 'required',
  },
  {
    name: 'Gender',
    type: 'selectItem',
    options: data,
    label: 'Gender',
    validation: 'required',
  },
];
const tabDetail = [
  {key: '0', name: 'Services', route: 'Test'},
  {key: '1', name: 'Professionals', route: 'Home'},
];

const ComponentTestScreen = ({navigation}) => {
  return (
    <SafeAreaView
      style={tw`flex flex-1 items-center justify-center bg-white p-10`}>
      {/* <Input label="First Name" />
      <Form fields={formData} />
      <Text>ComponentTestScreen</Text>
      <DatePicker label="Birth Date" title="Birthday" />
      <Button
        secondary
        title={'Open Modal'}
        onPress={() =>
          navigation.navigate('SetPhotoModal', {type: 'fromBottom'})
        }
      />
      <Select label="Gender" options={data} />
      <SearchCard
        icon={<Location size={22} color="#5948AA" />}
        title={'Location'}
        description={'My Location'}
        style={tw`mb-10`}
      /> */}
      <Index />
    </SafeAreaView>
  );
};

export default ComponentTestScreen;
