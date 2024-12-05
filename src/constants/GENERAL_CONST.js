import {Man, Woman} from 'iconsax-react-native';
import React from 'react';
import {View} from 'react-native';
import tw from '../../tailwind';

const GENERAL_CONST = {
  GenderData: [
    {
      // key: 1,
      id: 1,
      title: 'Female',
      icon: <Woman size="18" color="#FF74A4" />,
      value: 'female',
    },
    {
      // key: 2,
      id: 2,
      title: 'Male',
      icon: <Man size="18" color="#1481BA" />,
      value: 'male',
    },
    {
      // key: 3,
      id: 3,
      title: 'Unisex',
      icon: (
        <View style={tw`flex-row `}>
          <Woman size="16" color="#FF74A4" />
          <Man size="16" color="#1481BA" />
        </View>
      ),
      value: 'unisex',
    },
  ],
  orLineProps: {
    useAngle: true,
    angle: 90,
    colors: [
      'rgba(241, 241, 241, 0)',
      'rgba(241, 241, 241, 1)',
      'rgba(241, 241, 241, 0)',
    ],
    style: tw`w-20 h-0.5`,
  },
  addCreditCardFormData: [
    {
      name: 'cardHolderFullName',
      type: 'input',
      label: 'Full Name',
      validation: 'required',
    },
    {
      name: 'cardNumber',
      type: 'input',
      label: 'Card number',
      keyboardType: 'numeric',
      validation: 'required',
      mask: [
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' - ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' - ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' - ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ],

      maxLength: 25,
    },
    {
      name: 'expiryDate',
      type: 'input',
      itemStyle: 'w-[48%] mr-[2%] ',
      label: 'Expiry Date (MM/YY)',
      mask: [/\d/, /\d/, '/', /\d/, /\d/],
      validation: 'required',
      keyboardType: 'numeric',
      maxLength: 5,
    },
    {
      name: 'cvc',
      type: 'input',
      label: 'CVC',
      itemStyle: 'w-[48%]  ml-[2%] ',
      keyboardType: 'numeric',
      validation: 'required',
      maxLength: 4,
    },
    {
      name: 'postalCode',
      type: 'input',
      label: 'Postal Code',
      validation: 'required',
      maxLength: 15,
    },
  ],
  provinceData: [
    {
      id: 1,
      title: 'Alberta',
      value: 'AB',
      abbreviation: 'AB',
    },
    {
      id: 2,
      title: 'British Columbia',
      value: 'BC',
      abbreviation: 'BC',
    },
    {
      id: 3,
      title: 'Manitoba',
      value: 'MB',
      abbreviation: 'MB',
    },
    {
      id: 4,
      title: 'New Brunswick',
      value: 'NB',
      abbreviation: 'NB',
    },
    {
      id: 5,
      title: 'Newfoundland and Labrador',
      value: 'NL',
      abbreviation: 'NL',
    },
    {
      id: 6,
      title: 'Northwest Territories',
      value: 'NT',
      abbreviation: 'NT',
    },
    {
      id: 7,
      title: 'Nova Scotia',
      value: 'NS',
      abbreviation: 'NS',
    },
    {
      id: 8,
      title: 'Nunavut',
      value: 'NU',
      abbreviation: 'NU',
    },
    {
      id: 9,
      title: 'Ontario',
      value: 'ON',
      abbreviation: 'ON',
    },
    {
      id: 10,
      title: 'Prince Edward Island',
      value: 'PE',
      abbreviation: 'PE',
    },
    {
      id: 11,
      title: 'Quebec',
      value: 'QC',
      abbreviation: 'QC',
    },
    {
      id: 12,
      title: 'Saskatchewan',
      value: 'SK',
      abbreviation: 'SK',
    },
    {
      id: 13,
      title: 'Yukon Territory',
      value: 'YT',
      abbreviation: 'YT',
    },
  ],
  weekDays: [
    {id: 1, title: 'Monday'},
    {id: 2, title: 'Tuesday'},
    {id: 3, title: 'Wednesday'},
    {id: 4, title: 'Thursday'},
    {id: 5, title: 'Friday'},
    {id: 6, title: 'Saturday'},
    {id: 7, title: 'Sunday'},
  ],
};

export {GENERAL_CONST};
