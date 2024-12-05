import {View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import tw from '../../../tailwind';
import {Button} from '../commons';

const BookingFooter = ({
  style,
  children,
  twoButton,
  firstButoonTitle,
  secondButtonTitle,
  onPressFirstButton = () => {},
  onPressSecondButton = () => {},
}) => {
  const {bottom} = useSafeAreaInsets();

  return (
    <View
      style={tw.style(
        'w-full absolute bottom-0 pt-3.5 px-5 rounded-t-20 shadow-xl bg-white self-center',
        style,
        {paddingBottom: (bottom || 10) + 4},
      )}>
      <View>{children}</View>
      <View
        style={tw.style('flex-row justify-center', {
          'justify-between': twoButton,
        })}>
        {twoButton ? (
          <Button
            title={secondButtonTitle}
            onPress={onPressSecondButton}
            secondary
          />
        ) : null}
        <Button
          title={firstButoonTitle}
          onPress={onPressFirstButton}
          primary
          containerStyle={tw.style({
            'w-full': !twoButton,
          })}
        />
      </View>
    </View>
  );
};

export {BookingFooter};
