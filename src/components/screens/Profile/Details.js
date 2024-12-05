import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {
  ArrowDown2,
  ArrowUp2,
  CalendarTick,
  ClipboardText,
  Location,
  ShieldTick,
} from 'iconsax-react-native';

import tw from '../../../../tailwind';
import {WorkHours, RulesAndPolicy, LocationAndAmenities} from '.';

const Details = ({locationData, rulesAndPolicyData, workHoursData}) => {
  const DetailItem = props => {
    const {title, icon, desc, component, propsList} = props;
    const [isContentShow, setIsContentShow] = useState(false);

    return (
      <View style={tw`w-full mb-7 flex-1`}>
        <View style={tw`border border-lightGray mb-3`} />
        <Pressable
          onPress={() => setIsContentShow(!isContentShow)}
          style={tw`flex-row`}>
          <View style={tw`w-1/12 items-center pt-1`}>
            {React.createElement(icon, {color: '#414141', size: 20})}
          </View>
          <View style={tw`w-10/12`}>
            <Text style={tw`bv-heading-lg mb-3 capitalize`}>{title}</Text>
            {!isContentShow && (
              <Text style={tw`bv-sans-xs text-grayBorder`}>{desc}</Text>
            )}
          </View>
          <View style={tw`w-1/12 items-center`}>
            {isContentShow ? (
              <ArrowUp2 color="#717171" />
            ) : (
              <ArrowDown2 color="#717171" />
            )}
          </View>
        </Pressable>
        {isContentShow && component
          ? React.createElement(component, propsList)
          : null}
      </View>
    );
  };

  return (
    <View style={tw`flex-1`}>
      <DetailItem
        title={'location and amenities'}
        icon={Location}
        desc={'Address, Direction, Amenities, WorkSpace Pics.'}
        component={LocationAndAmenities}
        propsList={{
          address: '2118 Thornridge Cir. Syrac',
          locationRadius: 15,
          amenities: locationData.amenities,
          workSpaceImages: locationData.location.gallery.filter(
            item => typeof item.url !== 'boolean',
          ),
          lng: parseFloat(locationData.location.lng),
          lat: parseFloat(locationData.location.lat),
        }}
      />
      <DetailItem
        title={'rules and policy'}
        icon={ClipboardText}
        desc={'cancelation policy, studio rules'}
        component={RulesAndPolicy}
        propsList={{
          data: rulesAndPolicyData,
        }}
      />
      <DetailItem
        title={'work hours'}
        icon={CalendarTick}
        desc={'Includes maximum weekly working hours'}
        component={WorkHours}
        propsList={{
          data: workHoursData.times.days,
        }}
      />
      {/* <DetailItem
        title={'health and safety'}
        icon={ShieldTick}
        desc={'regulations and procedures intended to ....'}
      /> */}
    </View>
  );
};

export {Details};
