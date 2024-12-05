import React from 'react';
import {
  Briefcase,
  Calendar,
  Call,
  Cards,
  ClipboardTick,
  MoneyChange,
  ProfileCircle,
  Setting2,
  SmsEdit,
  Wallet3,
} from 'iconsax-react-native';
import { GENERAL_CONST } from './GENERAL_CONST';

const SETTING_CONST = {
  settingMenuData: [
    {
      key: 1,
      title: 'Appointments',
      description: 'Appointments history, Favorites, Your Address...',
      icon: <Calendar color="#414141" size="24" />,
      route: 'AppointmentsSetting',
      rootRoute: 'SettingScreens',
    },
    {
      key: 2,
      title: 'Payments',
      description: 'Upcoming Payments, Transaction History....',
      icon: <Cards color="#414141" size="24" />,
      route: 'PaymentsSetting',
      rootRoute: 'SettingScreens',
    },
    // {
    //   key: 3,
    //   title: 'Beautiverse Wallet',
    //   description: 'Wallet Balance, Coupons, Gift Cards...',
    //   icon: <Wallet3 color="#414141" size="24" />,
    //   route: 'WalletSetting',
    //   rootRoute: 'SettingScreens',
    // },
    {
      key: 4,
      title: 'Account Setting',
      description: 'Personal information, notification, login and...',
      icon: <Setting2 color="#414141" size="24" />,
      route: 'AccountSetting',
      rootRoute: 'SettingScreens',
    },
    {
      key: 5,
      title: 'Support',
      description: 'Lorem ipsum dolor sit amet, conNam tellus ',
      icon: <Call color="#414141" size="24" />,
      route: 'Support',
      rootRoute: 'SettingScreens',
      link: 'https://beautiverse.ca/api/beautiverse/contact-us/',
    },
    {
      key: 6,
      title: 'Legal',
      description: 'Security feature for mobile services - for the clients',
      icon: <ClipboardTick color="#414141" size="24" />,
      route: 'Legal',
      rootRoute: 'SettingScreens',
      link: 'https://beautiverse.ca/api/beautiverse/privacy-policy/',
    },
    {
      key: 8,
      title: 'Give Us Feedback',
      description: 'Lorem ipsum dolor sit amet, conNam tellus ',
      icon: <SmsEdit color="#414141" size="24" />,
      route: 'Feedback',
      rootRoute: 'SettingScreens',
      link: 'https://beautiverse.ca/api/beautiverse/contact-us/',
    },
  ],
  identityTypeData: [
    {
      key: 1,
      title: 'Drivers License',
      value: 'driversLicense',
      isActive: true,
    },
    {
      key: 2,
      title: 'Passport',
      value: 'passport',
      isActive: false,
    },
    {
      key: 3,
      title: 'Identity Card',
      value: 'identityCard',
      isActive: false,
    },
  ],

  identityVerificationFormData: [
    {
      name: 'countryRegion',
      type: 'select',
      options: GENERAL_CONST.provinceData,
      iconShow: true,
      label: 'Country / Region',
      //suffix: <ArrowDown2 size="24" color="#C9C2DD" />,
      itemStyle: 'mt-4',
      validation: 'required',
      required: true,
    },
    {
      name: 'type',
      type: 'radio',
      options: [
        {
          id: 'driver',
          title: 'Driver`s License',
          value: 'driver',
        },
        {
          id: 'passport',
          title: 'Passport',
          value: 'passport',
        },
        {
          id: 'Id_card',
          title: 'Identity Card',
          value: 'Id_card',
        },
      ],
      row: false,
      required: true,
      size: 14,
      label: 'Document Type',
      containerStyle: 'h-25 justify-between',
      validation: 'required',
    },
  ],

  verificationSteps: {
    1: {
      type: 'takePhoto',
      title: 'Front of ID',
      description:
        'Fill the front of your ID within the\nframe --- check for goodlighting.',
    },
    2: {
      type: 'check',
      title: 'is the front of your ID clear?',
      description: 'make sure it’s, clear,\nand nothing is cut off.',
    },
    3: {
      type: 'continue',
      icon: <MoneyChange size="80" color="#fff" />,
      title: 'Next, flip to the back of your ID',
      description: 'make sure it’s, clear,\nand nothing is cut off.',
    },
    4: {
      type: 'takePhoto',
      title: 'is the back of your ID clear?',
      description: 'make sure it’s, clear,\nand nothing is cut off.',
    },
    5: {
      type: 'check',
      title: 'is the back of your ID clear?',
      description: 'make sure it’s, clear,\nand nothing is cut off.',
    },
    6: {
      type: 'continue',
      icon: <ProfileCircle size="80" color="#fff" />,
      title: 'Next, take a photo of yourself',
      description: 'we’ll match this photo with the one \non your ID.',
    },
    7: {
      type: 'takePhoto',
      title: 'Take a photo of yourself',
      description: 'Hold your device',
    },
    8: {
      type: 'check',
      title: 'Review your photo',
      description:
        'make sure it’s will-lit, clear, and\nmatching the person in the ID.',
    },
  },
  appointmentsMenuData: [
    {
      key: 1,
      title: 'Your Appointments',
      route: 'Appointments',
      rootRoute: 'AppointmentsSetting',
    },
    {
      key: 2,
      title: 'Favorites',
      route: 'Favorites',
      rootRoute: 'AppointmentsSetting',
    },
    {
      key: 3,
      title: 'Saved Address',
      route: 'SavedAddress',
      rootRoute: 'AppointmentsSetting',
    },
  ],
  paymentsMenuData: [
    {
      key: 1,
      title: 'Transaction History',
      route: 'TransactionHistory',
      rootRoute: 'PaymentsSetting',
    },
    {
      key: 2,
      title: 'Payment Methods',
      route: 'PaymentMethods',
      rootRoute: 'PaymentsSetting',
    },
  ],
  accountMenuData: [
    {
      key: 1,
      title: 'Personal Information',
      route: 'PersonalInformation',
      rootRoute: 'AccountSetting',
    },
    // {
    //   key: 2,
    //   title: 'Logins And Security',
    //   route: 'LoginsAndSecurity',
    //   rootRoute: 'AccountSetting',
    // },
    // {
    //   key: 3,
    //   title: 'Notifications',
    //   route: 'Notifications',
    //   rootRoute: 'AccountSetting',
    // },
  ],
  walletMenuData: [
    {
      key: 1,
      title: 'Beauty Card',
      route: 'BeautyCard',
      rootRoute: 'WalletSetting',
    },
    {
      key: 2,
      title: 'Beauty Coins',
      route: 'BeautyCoins',
      rootRoute: 'WalletSetting',
    },
    {
      key: 3,
      title: 'Gift Cards',
      route: 'GiftCards',
      rootRoute: 'WalletSetting',
    },
    {
      key: 4,
      title: 'Coupons',
      route: 'Coupons',
      rootRoute: 'WalletSetting',
    },
  ],
  beautyCardCarouselData: [
    {
      id: 1,
      image: require('../assets/media/BeautyCard.png'),
    },
    {
      id: 2,
      image: require('../assets/media/GiftCardBlue.png'),
    },
    {
      id: 3,
      image: require('../assets/media/GiftCard.png'),
    },
  ],
  giftCardCarouselData: [
    {
      id: 1,
      image: require('../assets/media/GiftCard.png'),
    },
    {
      id: 2,
      image: require('../assets/media/GiftCard2.png'),
    },
    {
      id: 3,
      image: require('../assets/media/GiftCard3.png'),
    },
  ],
  giftCardAmountData: [
    {
      id: 1,
      title: '$50',
      value: '$50',
    },
    {
      id: 2,
      title: '$100',
      value: '$100',
    },
    {
      id: 3,
      title: '$150',
      value: '$150',
    },
    {
      id: 4,
      title: '$200',
      value: '$200',
    },
    {
      id: 5,
      title: 'Custom',
      value: '',
    },
  ],
  giftCardSendMethod: [
    {
      id: 1,
      title: 'Email',
      value: 'Email',
    },
    {
      id: 2,
      title: 'SMS',
      value: 'SMS',
    },
    {
      id: 3,
      title: 'Both',
      value: 'Both',
    },
  ],
  buyGiftCardFormData: [
    {
      name: 'recipientInformation',
      type: 'header',
      title: 'recipient information',
    },
    {
      name: 'recipientName',
      type: 'input',
      label: 'recipient name',

      validation: 'required',
    },
    {
      name: 'recipientEmail',
      type: 'input',
      label: 'recipient email',

      validation: 'required',
    },
    {
      name: 'customMessage',
      type: 'header',
      title: 'custom message',
    },
    {
      name: 'giftMessage',
      type: 'input',
      label: 'Gift Message',
      inputType: 'textArea',
    },
    {
      name: 'senderInformation',
      type: 'header',
      title: 'Sender Information',
    },
    {
      name: 'senderName',
      type: 'input',
      label: 'sender name',
    },
    {
      name: 'submitTime',
      type: 'header',
      title: 'Submit Time',
    },
    {
      name: 'date',
      type: 'datePicker',
      label: 'Submit Time',
    },
  ],
  transactionHistorySortData: [
    {
      key: 1,
      title: 'Latest',
      value: 'Latest',
    },
    {
      key: 2,
      title: 'Last 7 Days',
      value: 'Last7Days',
    },
    {
      key: 3,
      title: 'Last 30 Days',
      value: 'Last30Days',
    },
    {
      key: 4,
      title: 'All',
      value: 'All',
    },
  ],
  referralsFilterData: [
    {
      key: 1,
      title: 'Pending',
      value: 'Pending',
      isActive: true,
    },
    {
      key: 2,
      title: 'Completed',
      value: 'Completed',
      isActive: false,
    },
    {
      key: 3,
      title: 'Expired',
      value: 'Expired',
      isActive: false,
    },
    {
      key: 4,
      title: 'All',
      value: 'All',
      isActive: false,
    },
  ],
};

export {SETTING_CONST};
