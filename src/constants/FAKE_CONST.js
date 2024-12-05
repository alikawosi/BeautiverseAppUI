import React from 'react';
import {
  Card,
  Magicpen,
  SearchStatus,
  Car,
  Glass,
  More2,
  Pet,
  Wifi,
  Clock,
  Flashy,
  Messages1,
  DollarCircle,
} from 'iconsax-react-native';
import dayjs from 'dayjs';

const CategoryCardData = [
  {
    id: 1,
    title: 'Hair Cut',
    image: require('../assets/media/Category1.png'),
  },
  {
    id: 2,
    title: 'Hair Cut',
    image: require('../assets/media/Category2.png'),
  },
  {
    id: 3,
    title: 'Hair Cut',
    image: require('../assets/media/Category3.png'),
  },
  {
    id: 4,
    title: 'Hair Cut',
    image: require('../assets/media/Category1.png'),
  },
  {
    id: 5,
    title: 'Hair Cut',
    image: require('../assets/media/Category1.png'),
  },
  {
    id: 6,
    title: 'Hair Cut',
    image: require('../assets/media/Category1.png'),
  },
  {
    id: 7,
    title: 'Hair Cut',
    image: require('../assets/media/Category1.png'),
  },
  {
    id: 8,
    title: 'Hair Cut',
    image: require('../assets/media/Category1.png'),
  },
  {
    id: 9,
    title: 'Hair Cut',
    image: require('../assets/media/Category1.png'),
  },
  {
    id: 10,
    title: 'Hair Cut',
    image: require('../assets/media/Category1.png'),
  },
  {
    id: 11,
    title: 'Hair Cut',
    image: require('../assets/media/Category1.png'),
  },
  {
    id: 12,
    title: 'Hair Cut',
    image: require('../assets/media/Category1.png'),
  },
  {
    id: 13,
    title: 'Hair Cut',
    image: require('../assets/media/Category1.png'),
  },
  {
    id: 14,
    title: 'Hair Cut',
    image: require('../assets/media/Category1.png'),
  },
  {
    id: 15,
    title: 'Hair Cut',
    image: require('../assets/media/Category1.png'),
  },
  {
    id: 16,
    title: 'Hair Cut',
    image: require('../assets/media/Category1.png'),
  },
];

const OfferCardData = [
  {
    id: 1,
    name: 'Ali Kavoosi',
    isVerify: true,
    isMaestro: true,
    address: '662 Annette St',
    distance: 3,
    category: 'Lashes',
    isMobile: true,
    isUnisex: true,
    numberOfCustomer: 12,
    satisfactionPercentage: 88,
    offerTitle: 'Classic Lashes Refill 1-Week',
    offPercentage: 18,
    newPrice: 90,
    oldPrice: 110,
    duration: 40,
  },
  {
    id: 2,
    name: 'John Smith',
    isVerify: false,
    isMaestro: false,
    address: '76 Wall St',
    distance: 5,
    category: 'Hair cut',
    isMobile: true,
    isUnisex: false,
    numberOfCustomer: 10,
    satisfactionPercentage: 97,
    offerTitle: 'Classic Lashes Refill 1-Week',
    offPercentage: 25,
    newPrice: 90,
    oldPrice: 110,
    duration: 40,
  },
];

const ProfessionalCardData = [
  {
    id: 1,
    name: 'Amir Hojati',
    isVerify: true,
    address: '662 Annette St',
    distance: 3,
    isMaestro: true,
    isMobile: true,
    isUnisex: true,
    numberOfCustomer: 12,
    satisfactionPercentage: 88,
  },
  {
    id: 2,
    name: 'Will Smith',
    isVerify: false,
    address: '76 Wall St',
    distance: 5,
    isMaestro: false,
    isMobile: true,
    isUnisex: false,
    numberOfCustomer: 10,
    satisfactionPercentage: 97,
  },
  {
    id: 3,
    name: 'Marry Smith',
    isVerify: true,
    address: '76 Coln St',
    distance: 10,
    isMaestro: true,
    isMobile: true,
    isUnisex: false,
    numberOfCustomer: 2,
    satisfactionPercentage: 75,
  },
];

const FullImageCardData = [
  {
    id: 1,
    name: 'Amir Hojati',
    isVerify: true,
    address: '662 Annette St',
    distance: 3,
    category: 'Lashes',
    numberOfCustomer: 12,
    satisfactionPercentage: 88,
  },
  {
    id: 2,
    name: 'Will Smith',
    isVerify: false,
    address: '76 Wall St',
    distance: 5,
    category: 'Hair cut',
    numberOfCustomer: 10,
    satisfactionPercentage: 99,
  },
  {
    id: 3,
    name: 'Marry Smith',
    isVerify: true,
    address: '76 Coln St',
    distance: 10,
    category: 'Hair Color',
    numberOfCustomer: 2,
    satisfactionPercentage: 44,
  },
];

const ServiceSubCardData = [
  {
    id: 1,
    offerTitle: 'Classic Lashes Refill 1-Week',
    offPercentage: 18,
    newPrice: 90,
    oldPrice: 110,
    duration: 40,
  },
  {
    id: 2,
    offerTitle: 'Classic Lashes 2-Week',
    offPercentage: 25,
    newPrice: 90,
    oldPrice: 110,
    duration: 80,
  },
  {
    id: 3,
    offerTitle: 'Classic Lashes 1-Week',
    offPercentage: 12,
    newPrice: 90,
    oldPrice: 100,
    duration: 30,
  },
];

const ServiceCardData = [
  {
    id: 1,
    imageList: [...new Array(6).keys()],
    name: 'Ali Kavoosi',
    isVerify: true,
    isAvailable: true,
    isMaestro: true,
    address: '662 Annette St',
    distance: 3,
    isMobile: true,
    isUnisex: true,
    numberOfCustomer: 12,
    satisfactionPercentage: 88,
    offerList: ServiceSubCardData,
  },
  {
    id: 2,
    imageList: [...new Array(6).keys()],
    name: 'John Smith',
    isVerify: false,
    isAvailable: true,
    isMaestro: false,
    address: '76 Wall St',
    distance: 5,
    isMobile: true,
    isUnisex: false,
    numberOfCustomer: 10,
    satisfactionPercentage: 97,
    offerList: ServiceSubCardData,
  },
];
const ProfessionalSearchResultData = [
  {
    id: 1,
    title: 'Dianne Russell',
    description: '8502 Preston Rd. Inglewood,',
    image: require('../assets/media/SearchResultProfilePictureSample.png'),
    tag: [{title: 'Lashes'}, {title: 'Haircut'}, {title: 'Makeup'}],
  },
  {
    id: 2,
    title: 'Albert Flores',
    description: 'mobile',
    image: require('../assets/media/SearchResultProfilePictureSample.png'),
    tag: [{title: 'Lashes'}, {title: 'Haircut'}, {title: 'Makeup'}],
  },
  {
    id: 3,
    title: 'Jane Cooper',
    description: '8502 Preston Rd. Inglewood,',
    image: require('../assets/media/SearchResultProfilePictureSample.png'),
    tag: [{title: 'Lashes'}, {title: 'Haircut'}, {title: 'Makeup'}],
  },
];
const ServiceSearchResultData = [
  {
    id: 1,
    title: 'Eyelash',
    categoryFlag: true,
    icon: <Magicpen size="22" color="#FFFFFF" />,
  },
  {
    id: 2,
    title: 'Eyelash Extention Classic',
    icon: <SearchStatus size="22" color="#5948AA" />,
  },
  {
    id: 3,
    title: 'Eyelash Extention Classic Full Set',
    icon: <SearchStatus size="22" color="#5948AA" />,
  },
];
const SavedLocationData = [
  {
    title: 'Home',
    description: '2464 Royal Ln. Mesa, New Jersey 45463',
    value: '',
    id: 1,
  },
  {
    title: 'Work Place',
    description: '6391 Elgin St. Celina, Delaware 10299',
    value: '',
    id: 2,
  },
  {
    title: 'Jim’s house',
    description: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
    value: '',
    id: 3,
  },
];

const DayData = [
  {key: 1, day: 'Sat', dayNum: '12', today: true},
  {key: 2, day: 'Sun', dayNum: '13'},
  {key: 3, day: 'Mon', dayNum: '14', disabled: true},
  {key: 4, day: 'Tue', dayNum: '15'},
  {key: 5, day: 'Wed', dayNum: '16'},
  {key: 6, day: 'Thu', dayNum: '17'},
];
const MorningTimeData = [
  {key: 1, time: '6:00 AM'},
  {key: 2, time: '6:30 AM'},
  {key: 3, time: '7:00 AM'},
  {key: 4, time: '7:30 AM'},
  {key: 5, time: '8:00 AM'},
  {key: 6, time: '8:30 AM'},
  {key: 7, time: '9:00 AM'},
  {key: 8, time: '9:30 AM'},
  {key: 9, time: '10:00 AM'},
  {key: 10, time: '10:30 AM'},
  {key: 11, time: '11:00 AM'},
  {key: 12, time: '11:30 AM'},
];

const EveningTimeData = [
  {key: 1, time: '6:00 PM'},
  {key: 2, time: '6:30 PM'},
  {key: 3, time: '7:00 PM'},
  {key: 4, time: '7:30 PM'},
  {key: 5, time: '8:00 PM'},
  {key: 6, time: '8:30 PM'},
  {key: 7, time: '9:00 PM'},
  {key: 8, time: '9:30 PM'},
  {key: 9, time: '10:00 PM'},
  {key: 10, time: '10:30 PM'},
  {key: 11, time: '11:00 PM'},
  {key: 12, time: '11:30 PM'},
];

const ProfessionalData = [
  {
    image: require('../assets/media/sampleProfileImage.png'),
    name: 'alice berton',
    address: '662 Annette St',
    verified: true,
    distance: '2 Km',
  },
];
const SelectedServiceDateTime = [
  {
    date: 'Thu, March 3, 2022',
    time: '6:00 PM',
  },
];
const SelectedServiceData = [
  {
    key: 1,
    title: 'volume lashes',
    description: '1 week touch up',
    price: ' 110$',
    duration: '45 m',
    discountedPrice: '$90',
    discountPercentage: '20%',
  },
  {
    key: 2,
    title: 'volume lashes',
    description: '1 week touch up',
    price: ' 110$',
    duration: '45 m',
  },
  {
    key: 3,
    title: 'volume lashes',
    description: '1 week touch up',
    price: ' 110$',
    duration: '45 m',
  },
];
const BankCardData = [
  {
    title: '**** **** **** 8742',
    icon: <Card size={22} color={'#5948AA'} />,
  },
  {
    title: '**** **** **** 8742',
    icon: <Card size={22} color={'#5948AA'} />,
  },
  {
    title: '**** **** **** 8742',
    icon: <Card size={22} color={'#5948AA'} />,
  },
];

const AmenitiesList = [
  {
    id: 1,
    title: 'Pets',
    icon: <Pet size={20} color="#414141" />,
  },
  {
    id: 2,
    title: 'Accessible People With Disabilities',
    icon: <Glass size={20} color="#414141" />,
  },
  {
    id: 3,
    title: 'Wi-Fi',
    icon: <Wifi size={20} color="#414141" />,
  },
  {
    id: 4,
    title: 'Parking',
    icon: <Car size={20} color="#414141" />,
  },
  {
    id: 5,
    title: 'Kids Keeper',
    icon: <More2 size={20} color="#414141" />,
  },
  {
    id: 6,
    title: 'Washroom',
    icon: <More2 size={20} color="#414141" />,
  },
];

const RulesData = [
  {
    id: 1,
    title: 'Cancellation Policy',
    options: [
      {
        id: 1,
        title:
          '"eyelash","haircut","hairstyling" appointments cancelled later than 15 minutes prior to the appointment are subject to 10% cancellation fee. ',
        bullet: true,
      },
    ],
  },
  {
    id: 2,
    title: 'No-Show Policy',
    options: [
      {
        id: 1,
        title: 'Free cancellation before Apr 3',
        bullet: true,
      },
      {
        id: 2,
        title: 'Lorem ipsum dolor sit amet, consectetur ',
        bullet: true,
      },
    ],
  },
  {
    id: 3,
    title: 'Studio Rules',
    options: [
      {
        id: 1,
        title: 'Covid-19 Standards',
        link: 'More Info',
        bullet: true,
      },
      {
        id: 2,
        title: 'No smoking',
        bullet: true,
      },
    ],
  },
];

const WeekDayData = [
  {
    id: 1,
    day: 'Monday',
    startTime: '10:00',
    endTime: '22:00',
  },
  {
    id: 2,
    day: 'Tuesday',
    startTime: '10:00',
    endTime: '22:00',
  },
  {
    id: 3,
    day: 'Wednesday',
    startTime: '10:00',
    endTime: '22:00',
  },
  {
    id: 4,
    day: 'Thursday',
    startTime: '10:00',
    endTime: '22:00',
  },
  {
    id: 5,
    day: 'Friday',
    startTime: '10:00',
    endTime: '22:00',
  },
  {
    id: 6,
    day: 'Saturday',
  },
  {
    id: 7,
    day: 'Sunday',
    startTime: '10:00',
    endTime: '22:00',
  },
];

const RatingData = [
  {
    id: 1,
    title: 'Satisfaction',
    rate: 4.8,
  },
  {
    id: 2,
    title: 'On-Time',
    rate: 4,
  },
  {
    id: 3,
    title: 'Friendliness',
    rate: 3.2,
  },
  {
    id: 4,
    title: 'Location',
    rate: 4.2,
  },
  {
    id: 5,
    title: 'Cleanliness',
    rate: 3,
  },
];

const ReviewData = [
  {
    id: 1,
    image: null,
    userName: 'Jenny Wilson',
    isUserVerified: true,
    category: 'Lashes',
    rate: 5,
    date: '12 Mar 2022',
    isReviewVerified: true,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tellus eros, auctor a mi quis, laoreet luctus risus. Aliquam lacinia leo vel lectus ultricies, egestas faucibus ',
  },
  {
    id: 2,
    image: null,
    userName: 'Jenny Wilson',
    isUserVerified: true,
    category: 'Lashes',
    rate: 4.2,
    date: '8 Jul 2020',
    isReviewVerified: false,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tellus eros, auctor a mi quis, laoreet luctus risus. Aliquam lacinia leo vel lectus ultricies, egestas faucibus ',
  },
];

const ProfileServiceData = [
  {
    id: 1,
    serviceTitle: 'volume lashes',
    priceRange: [90, 110],
    durationRange: ['45', '1h 45'],
    //desc: '1 week touch up',
    options: [
      {
        id: 1,
        title: 'full-set',
        oldPrice: 110,
        newPrice: 90,
        duration: 45,
        off: 20,
      },
      {
        id: 2,
        title: '1 week touch up',
        oldPrice: 110,
        //newPrice: 90,
        duration: 60,
        //off: 20,
      },
      {
        id: 3,
        title: 'full-set',
        oldPrice: 110,
        //newPrice: 90,
        duration: 45,
        //off: 20,
      },
    ],
  },
  {
    id: 2,
    serviceTitle: 'volume lashes',
    priceRange: [90, 110],
    durationRange: ['45', '1h 45'],
    desc: '1 week touch up',
  },
  {
    id: 3,
    serviceTitle: '2022 trend lashes',
    priceRange: [110],
    durationRange: ['45'],
    //desc: '1 week touch up',
    isAddOn: true,
  },
];

const AboutProfessionalData = [
  {
    id: 1,
    title: 'Open now 10 am - 12pm',
    icon: <Clock size={20} color="#414141" />,
  },
  {
    id: 2,
    title: 'Instant Booking',
    icon: <Flashy size={20} color="#414141" />,
  },
  {
    id: 3,
    title: 'Free Consultation',
    icon: <Messages1 size={20} color="#414141" />,
  },
  {
    id: 4,
    title: 'In App Payment',
    icon: <DollarCircle size={20} color="#414141" />,
  },
];

const AppointmentCardData = [
  {
    id: 1,
    name: 'Alice Berton',
    isVerify: true,
    isMaestro: false,
    address: '662 Annette St',
    distance: 3,
    category: 'Lashes',
    time: '10:00 AM',
    date: '09 Mar 2022',
    dueDate: 'In 3 Days',
    offerTitle: 'Classic Lashes Refill 1-Week',
    offPercentage: 18,
    newPrice: 90,
    oldPrice: 110,
    duration: 40,
  },
  {
    id: 2,
    name: 'Ali Kavoosi',
    isVerify: false,
    isMaestro: true,
    address: '662 Annette St',
    distance: 2,
    category: 'Lashes',
    time: '10:00 AM',
    date: '09 Mar 2022',
    dueDate: 'In 3 Days',
    offerTitle: 'Classic Lashes Refill 1-Week',
    offPercentage: 18,
    newPrice: 90,
    oldPrice: 110,
    duration: 40,
  },
];

const SubscriptionCardData = [
  {
    id: 1,
    name: 'Alice Berton',
    isVerify: true,
    isMaestro: false,
    address: '662 Annette St',
    distance: 3,
    category: 'Lashes',
    availableCredit: 230,
    nextPayment: '11 July',
    progress: 55,
    sessionsPassed: '7/12',
  },
  {
    id: 2,
    name: 'Ali Kavoosi',
    isVerify: false,
    isMaestro: true,
    address: '662 Annette St',
    distance: 2,
    category: 'Haircut',
    availableCredit: 180,
    nextPayment: '18 October',
    progress: 77,
    sessionsPassed: '7/9',
  },
];

const UserProfileData = [
  {
    name: 'Jane Robertson',
    about: 'Lorem Ipsum is simply dummy text of the printing and .',
    location: 'Toronto,Canada',
    work: 'Teacher',
    joinedDate: 'Aug 2022',
    isVerified: false,
  },
];

const AppointmentsList = [
  {
    key: 1,
    name: 'Alice Berton',
    isVerify: true,
    address: '662 Annette St',
    distance: 3,
    category: 'Lashes',
    time: '10:00 AM',
    date: '09 Mar 2022',
    offerTitle: 'Classic Lashes Refill 1-Week',
    offPercentage: 18,
    newPrice: 90,
    oldPrice: 110,
    duration: 40,
  },
  {
    key: 2,
    name: 'Ali Kavoosi',
    isVerify: false,
    address: '662 Annette St',
    distance: 2,
    category: 'Lashes',
    time: '10:00 AM',
    date: '09 Mar 2022',
    offerTitle: 'Classic Lashes Refill 1-Week',
    offPercentage: 18,
    newPrice: 90,
    oldPrice: 110,
    duration: 40,
  },
  {
    key: 3,
    name: 'Alice Berton',
    isVerify: true,
    address: '662 Annette St',
    distance: 3,
    category: 'Lashes',
    time: '10:00 AM',
    date: '09 Mar 2022',
    offerTitle: 'Classic Lashes Refill 1-Week',
    offPercentage: 18,
    newPrice: 90,
    oldPrice: 110,
    duration: 40,
  },
  {
    key: 4,
    name: 'Ali Kavoosi',
    isVerify: false,
    address: '662 Annette St',
    distance: 2,
    category: 'Lashes',
    time: '10:00 AM',
    date: '09 Mar 2022',
    offerTitle: 'Classic Lashes Refill 1-Week',
    offPercentage: 18,
    newPrice: 90,
    oldPrice: 110,
    duration: 40,
  },
  {
    key: 5,
    name: 'Alice Berton',
    isVerify: true,
    address: '662 Annette St',
    distance: 3,
    category: 'Lashes',
    time: '10:00 AM',
    date: '09 Mar 2022',
    offerTitle: 'Classic Lashes Refill 1-Week',
    offPercentage: 18,
    newPrice: 90,
    oldPrice: 110,
    duration: 40,
  },
  {
    key: 6,
    name: 'Ali Kavoosi',
    isVerify: false,
    address: '662 Annette St',
    distance: 2,
    category: 'Lashes',
    time: '10:00 AM',
    date: '09 Mar 2022',
    offerTitle: 'Classic Lashes Refill 1-Week',
    offPercentage: 18,
    newPrice: 90,
    oldPrice: 110,
    duration: 40,
  },
];

const PersonalInfo = [
  {
    key: 1,
    firstName: 'Wade',
    lastName: 'Warren',
    gender: 'Male',
    dateOfBirth: dayjs().format('MMM/DD/YYYY'),
    emailAddress: 'jackson.graham@example.com',
    phoneNumber: '(270) 555 - 0117',
    govermentId: null,
  },
];

const TransactionHistoryData = [
  {
    key: 1,
    serviceTitle: 'Volume Lashes',
    serviceType: '1 Week Touch Up',
    time: '10:00 AM',
    date: '09 Mar 2022',
    amount: '-$44',
  },
  {
    key: 2,
    serviceTitle: 'Giftcard Redmee',
    serviceType: null,
    time: '10:00 AM',
    date: '09 Mar 2022',
    amount: '+$31',
  },
  {
    key: 3,
    serviceTitle: 'Refund',
    serviceType: null,
    time: '10:00 AM',
    date: '09 Mar 2022',
    amount: '+$31',
  },
];

const PaymentMethodsData = [
  {
    key: 1,
    preffix: <Card size="20" color="#5948AA" />,
    value: '****   ****   ****   8742 ',
    primary: false,
  },
  {
    key: 2,
    preffix: <Card size="20" color="#5948AA" />,
    value: '****   ****   ****   8742 ',
    primary: true,
  },
  {
    key: 3,
    preffix: <Card size="20" color="#5948AA" />,
    value: '****   ****   ****   8742 ',
    primary: false,
  },
];
const ReferredUsersData = [
  {
    key: 1,
    title: 'Guy Hawkins',
    date: '20 Sep 2022',
    point: '150 Bv',
  },
  {
    key: 2,
    title: 'Guy Hawkins',
    date: '20 Sep 2022',
    point: '150 Bv',
  },
  {
    key: 3,
    title: 'Guy Hawkins',
    date: '20 Sep 2022',
    point: '150 Bv',
  },
  {
    key: 4,
    title: 'Guy Hawkins',
    date: '20 Sep 2022',
    point: '150 Bv',
  },
  {
    key: 5,
    title: 'Guy Hawkins',
    date: '20 Sep 2022',
    point: '150 Bv',
  },
  {
    key: 6,
    title: 'Guy Hawkins',
    date: '20 Sep 2022',
    point: '150 Bv',
  },
  {
    key: 7,
    title: 'Guy Hawkins',
    date: '20 Sep 2022',
    point: '150 Bv',
  },
];

const GiftcardData = [{key: 1, name: 'MOHAMADAMIN NOURANI', amount: '$50'}];

const CouponData = [
  {
    key: 1,
    title: '15% OFF',
    description: 'First Time Service with a new professional manicure',
    code: 'Sghwryh',
    value: '15%',
  },
  {
    key: 2,
    title: '15% OFF',
    description: 'First Time Service with a new professional manicure',
    code: 'Sghwryh',
    value: '15%',
  },
  {
    key: 3,
    title: '15% OFF',
    description: 'First Time Service with a new professional manicure',
    code: 'Sghwryh',
    value: '15%',
  },
  {
    key: 4,
    title: '15% OFF',
    description: 'First Time Service with a new professional manicure',
    code: 'Sghwryh',
    value: '15%',
  },
  {
    key: 5,
    title: '15% OFF',
    description: 'First Time Service with a new professional manicure',
    code: 'Sghwryh',
    value: '15%',
  },
];

const FAQs = [
  {
    key: 1,
    title: 'buyGiftCardFAQs',
    description:
      'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt repre tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.at nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit ese',
  },
];

const PopularCategoryData = [
  {
    id: 1,
    title: 'Hair Cut',
    image: require('../assets/media/Category1.png'),
  },
  {
    id: 2,
    title: 'Hair Cut',
    image: require('../assets/media/Category2.png'),
  },
  {
    id: 3,
    title: 'Hair Cut',
    image: require('../assets/media/Category3.png'),
  },
  {
    id: 4,
    title: 'Hair Cut',
    image: require('../assets/media/Category1.png'),
  },
  {
    id: 5,
    title: 'Hair Cut',
    image: require('../assets/media/Category1.png'),
  },
  {
    id: 6,
    title: 'Hair Cut',
    image: require('../assets/media/Category1.png'),
  },
  {
    id: 7,
    title: 'Hair Cut',
    image: require('../assets/media/Category1.png'),
  },
  {
    id: 8,
    title: 'Hair Cut',
    image: require('../assets/media/Category1.png'),
  },
  {
    id: 9,
    title: 'Hair Cut',
    image: require('../assets/media/Category1.png'),
  },
  {
    id: 10,
    title: 'Hair Cut',
    image: require('../assets/media/Category1.png'),
  },
  {
    id: 11,
    title: 'Hair Cut',
    image: require('../assets/media/Category1.png'),
  },
  {
    id: 12,
    title: 'Hair Cut',
    image: require('../assets/media/Category1.png'),
  },
  {
    id: 13,
    title: 'Hair Cut',
    image: require('../assets/media/Category1.png'),
  },
  {
    id: 14,
    title: 'Hair Cut',
    image: require('../assets/media/Category1.png'),
  },
  {
    id: 15,
    title: 'Hair Cut',
    image: require('../assets/media/Category1.png'),
  },
  {
    id: 16,
    title: 'Hair Cut',
    image: require('../assets/media/Category1.png'),
  },
];

const ServiceSubscribeTime = [
  {
    key: 1,
    title: '2 Times A Week',
    value: '2 Times A Week',
  },
  {
    key: 2,
    title: 'Every 2 Weeks',
    value: 'Every 2 Weeks',
  },
  {
    key: 3,
    title: 'Every Month',
    value: 'Every Month',
  },
  {
    key: 4,
    title: 'Every 2 Months',
    value: 'Every 2 Months',
  },
  {
    key: 5,
    title: 'Every 3 Months',
    value: 'Every 3 Months',
  },
  {
    key: 6,
    title: 'Custom',
    value: 'Custom',
  },
];

export {CategoryCardData};
export {OfferCardData};
export {ProfessionalCardData};
export {FullImageCardData};
export {ServiceSubCardData};
export {ServiceCardData};
export {ProfessionalSearchResultData};
export {ServiceSearchResultData};
export {SavedLocationData};
export {DayData};
export {MorningTimeData};
export {EveningTimeData};
export {ProfessionalData};
export {SelectedServiceDateTime};
export {SelectedServiceData};
export {BankCardData};
export {AmenitiesList};
export {RulesData};
export {WeekDayData};
export {RatingData};
export {ReviewData};
export {ProfileServiceData};
export {AboutProfessionalData};
export {AppointmentCardData};
export {SubscriptionCardData};
export {UserProfileData};
export {AppointmentsList};
export {PersonalInfo};
export {TransactionHistoryData};
export {PaymentMethodsData};
export {ReferredUsersData};
export {GiftcardData};
export {CouponData};
export {FAQs};
export {PopularCategoryData};
export {ServiceSubscribeTime};
