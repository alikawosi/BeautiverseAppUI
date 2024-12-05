import React from 'react';
import {ArrowDown2, Man, PercentageCircle, Woman} from 'iconsax-react-native';
import {View} from 'react-native';

import tw from '../../tailwind';

const FilterSelectModalData = [
  {
    id: 1,
    title: 'Recommended',
    value: 'recommended-default',
  },
  {
    id: 2,
    title: 'Nearest',
    value: 'recommended-nearest',
  },
  {
    id: 3,
    title: 'Highest Rating',
    value: 'recommended-highest_rating',
  },
  {
    id: 4,
    title: 'Most Popular',
    value: 'recommended-most_popular',
  },
];
const searchScreenTabBarData = [
  {
    key: 1,
    title: 'Service',
  },
  {
    key: 2,
    title: 'Professionals',
  },
];
const addLocationFormData = [
  {
    name: 'name',
    type: 'input',
    label: 'Name',
    validation: 'required',
  },
  {
    name: 'address',
    type: 'input',
    label: 'Address',
    validation: 'required',
  },
];

const FilterModalData = [
  {
    id: 1,
    title: 'Gender',
    valueName: 'gender',
    type: 'radio',
    options: [
      {
        id: 1,
        title: 'All',
        value: 'all',
      },
      {
        id: 2,
        title: 'Female',
        value: 'female',
      },
      {
        id: 3,
        title: 'Male',
        value: 'male',
      },
      {
        id: 4,
        title: 'Unisex',
        value: 'unisex',
      },
    ],
    content: 'genderFilterContent',
  },
  {
    id: 2,
    type: 'slider',
    options: [[0, 80], [0, 500], '$', false], //{defaultValue,range,prefix,sufix}
    title: 'Price',
    valueName: 'price',
    content: 'priceFilterContent',
  },
  {
    id: 3,
    title: 'Distance',
    valueName: 'distance',
    type: 'slider',
    options: [[0, 15], [0, 40], false, 'km'],
    content: 'distanceFilterContent',
  },
  {
    id: 4,
    title: 'Satisfaction Rate',
    valueName: 'rtns',
    type: 'slider',
    options: [[70, 100], [0, 100], false, '%'],
    content: 'satisfactionRateFilterContent',
  },
  {
    id: 5,
    title: 'Appointment Number',
    valueName: 'apps',
    type: 'slider',
    options: [[200], [0, 1000], '+', false],
    content: 'appointmentNumberFilterContent',
  },
  {
    id: 6,
    type: 'switch',
    title: 'Only verified Professionals',
    valueName: 'verified',
    content: null,
  },
  {
    id: 7,
    title: 'Location Type',
    valueName: 'locationType',
    type: 'radio',
    options: [
      {
        id: 1,
        title: 'Show All',
        value: 'all',
      },
      {
        id: 2,
        title: 'Home-Studio',
        value: 'home',
      },
      {
        id: 3,
        title: 'Studio/ Salon',
        value: 'studio',
      },
    ],
    content: 'locationTypeFilterContent',
  },
  {
    id: 8,
    title: 'Amenities',
    valueName: 'amenities',
    type: 'check',
    options: [
      {
        id: 1,
        title: 'Pets',
      },
      {
        id: 2,
        title: 'Accessible People With Disabilities ',
      },
      {
        id: 3,
        title: 'Wi-Fi',
      },
      {
        id: 4,
        title: 'Air Conditioning',
      },
      {
        id: 5,
        title: 'Parking',
      },
      {
        id: 6,
        title: 'Kids Keeper',
      },
    ],
    content: 'amenitiesFilterContent',
  },
  {
    id: 9,
    title: 'Payment Type',
    valueName: 'payment_Type',
    type: 'check',
    options: [
      {
        id: 1,
        title: 'Cash',
      },
      {
        id: 2,
        title: 'E-Transfer',
      },
      {
        id: 3,
        title: 'In App',
      },
      {
        id: 4,
        title: 'Tap Payment',
      },
    ],
    content: 'paymentTypeFilterContent',
  },
];

const ServiceCardTabData = [
  {
    id: 1,
    title: 'Eyelash',
    //icon: true,
    activeColor: '#5948AA',
  },
  {
    id: 2,
    title: 'Eyelashes',
    activeColor: '#5948AA',
  },
  {
    id: 3,
    title: 'Monicur',
    activeColor: '#5948AA',
  },
  {
    id: 4,
    title: 'Hair Color',
    activeColor: '#5948AA',
  },
  {
    id: 5,
    title: 'Hair Cut',
    activeColor: '#5948AA',
  },
];

const SelectGenderData = [
  {
    key: 1,
    title: 'Female',
    icon: <Woman size="18" color="#FF74A4" />,
    value: 'Female',
  },
  {
    key: 2,
    title: 'Male',
    icon: <Man size="18" color="#1481BA" />,
    value: 'Male',
  },
  {
    key: 3,
    title: 'Other',
    icon: (
      <View style={tw`flex-row`}>
        <Woman size="16" color="#FF74A4" />
        <Man size="16" color="#1481BA" />
      </View>
    ),
    value: 'Other',
  },
];

const SortBarData = [
  {
    id: 1,
    title: 'Offers',
    value: 'offers',
    icon: <PercentageCircle size={16} />,
    reverse: false,
  },

  {
    id: 2,
    title: 'Recommended',
    icon: null,
    reverse: false,
    options: FilterSelectModalData,
  },
  {
    id: 3,
    title: 'Available',
    value: 'available',
    icon: null,
    reverse: false,
  },
];

const FlexibleTimeData = [
  {
    id: 1,
    value: 'mornings',
    title: 'mornings',
  },
  {
    id: 2,
    value: 'afternoons',
    title: 'Afternoons',
  },
  {
    id: 3,
    value: '5pm',
    title: 'After 5 PM',
  },
  {
    id: 4,
    value: 'tomorrow',
    title: 'Tomorrow',
  },
  {
    id: 5,
    value: 'weekends',
    title: 'Weekends',
  },
];

export {FilterSelectModalData};
export {searchScreenTabBarData};
export {addLocationFormData};
export {FilterModalData};
export {ServiceCardTabData};
export {SortBarData};
export {SelectGenderData};
export {FlexibleTimeData};
