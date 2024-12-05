import React from 'react';
import {View, Text, Pressable} from 'react-native';

import tw from '../../../../tailwind';

const RulesAndPolicy = ({data}) => {
  const Item = ({desc}) => {
    return (
      <View style={tw`my-1.5`}>
        <View style={tw`flex-1 flex-row justify-center py-3 px-4`}>
          <View style={tw`pt-3.5 mr-2`}>
            {desc ? (
              <View style={tw`h-1 w-1 bg-grayBorder rounded-full`} />
            ) : null}
          </View>
          <Text style={tw`bv-sans-sm my-1.5`}>{desc}</Text>
        </View>
      </View>
    );
  };
  return (
    <View>
      <View>
        {data.cancellations.length > 0 ? (
          <>
            <Text style={tw`bv-heading-base text-primary mb-3`}>
              Cancelation Policy
            </Text>
            {data.cancellations.map(item => (
              <Item key={item.id} desc={item.text} />
            ))}
          </>
        ) : null}
      </View>
      <View>
        {data.no_show.length > 0 ? (
          <>
            <Text style={tw`bv-heading-base text-primary mb-3`}>
              No-Show Policy
            </Text>
            {data.no_show?.map(item => (
              <Item key={item.id} desc={item.text} />
            ))}
          </>
        ) : null}
      </View>
      <View>
        {data.rules.length > 0 ? (
          <>
            <Text style={tw`bv-heading-base text-primary mb-3`}>Rules</Text>
            {data.rules?.map(item => (
              <Item key={item.id} desc={item.text} />
            ))}
          </>
        ) : null}
      </View>
    </View>
  );
};

export {RulesAndPolicy};
