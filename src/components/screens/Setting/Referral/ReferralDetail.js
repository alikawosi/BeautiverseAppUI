import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import {Copy} from 'iconsax-react-native';

import tw from '../../../../../tailwind';
import {ReferredUsersData, SETTING_CONST} from '../../../../constants';
import {ReferralFilterTag} from '../ReferralFilterTag';
import {ReferralUserCard} from '../ReferralUserCard';
import {Accordion, Button} from '../../../commons';

const ReferralDetail = () => {
  const [activeId, setActiveId] = useState(1);

  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text style={tw`bv-sans-base `}>Coming Soon!...</Text>
      {/* <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            <View style={tw`flex-row mb-6`}>
              <View
                style={tw`bg-[#5948AA14] flex-row p-2 justify-center items-center rounded-10 w-1/2 mr-1 `}>
                <Text style={tw`bv-sans-sm mr-1 `}>Sign-Ups:</Text>
                <Text style={tw`bv-sans-base text-primary`}>$0</Text>
              </View>
              <View
                style={tw`bg-[#5948AA14] flex-row p-2 justify-center items-center rounded-10 w-1/2 ml-1`}>
                <Text style={tw`bv-sans-sm mr-1`}>Completed:</Text>
                <Text style={tw`bv-sans-base text-primary`}>$0</Text>
              </View>
            </View>
            <Text style={tw`bv-heading-base mb-6`}>Your Referrals</Text>
            <View style={tw`flex-row`}>
              {SETTING_CONST.referralsFilterData.map(item => {
                return (
                  <ReferralFilterTag
                    key={item.key}
                    title={item.title}
                    activeFlag={item.key === activeId ? true : false}
                    onPress={() => setActiveId(item.key)}
                    style={tw`mb-4`}
                  />
                );
              })}
            </View>
          </View>
        )}
        data={ReferredUsersData}
        renderItem={({item}) => (
          <ReferralUserCard
            key={item.key}
            title={item.title}
            date={item.date}
            point={item.point}
            style={tw`mb-3`}
          />
        )}
      /> 
      <Accordion title={'Rulls'} style={tw`pb-6 pt-2`}>
        <Text style={tw`bv-med-sm`}>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet.
        </Text>
      </Accordion>
      <View
        style={tw`flex-row justify-between border-t border-lightGray w-full`}>
        <Button
          title="Copy"
          secondary
          containerStyle={tw`w-[49%] mr-[1%]`}
          icon={<Copy size="20" color="#5948AA" />}
        />
        <Button title="Share Link" primary containerStyle={tw`w-1/2`} />
      </View> */}
    </View>
  );
};

export {ReferralDetail};
