import {KeyboardAvoidingView, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import tw from '../../../tailwind';
import {Button, VerticalSwipeable} from '../commons';

const Footer = (
  {
    firstButtonTitle,
    firstButtonIcon,
    firstButtonDisabled,
    onPressFirstButton = () => {},
    secondButtonTitle,
    secondButtonIcon,
    secondButtonDisabled,
    onPressSecondButton = () => {},
    style,
    type,
    swipeableSwipeHeight,
    swipeableButtonAvailable,
    swipableIconColor,
    swipaableIconSize,
    swipeableButtonType = '',
    swipeableClosedItems,
    swipeableOpenedItems,
    twoButton,
  },
  ref,
) => {
  const {bottom} = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView style={tw`bg-red-200`}  behavior="padding">
      {type === 'swipeable' ? (
        <VerticalSwipeable
          style={style}
          swipeHeight={swipeableSwipeHeight}
          iconColor={swipableIconColor}
          iconSize={swipaableIconSize}
          closedItems={swipeableClosedItems}
          openedItems={swipeableOpenedItems}
          buttonAvailable={swipeableButtonAvailable}
          twoButton={twoButton}
          buttonType={swipeableButtonType}
          firstButtonTitle={firstButtonTitle}
          firstButtonIcon={firstButtonIcon}
          onPressFirstButton={onPressFirstButton}
          secondButtonTitle={secondButtonTitle}
          secondButtonIcon={secondButtonIcon}
          onPressSecondButton={onPressSecondButton}
          firstButtonDisabled={firstButtonDisabled}
          secondButtonDisabled={secondButtonDisabled}
        />
      ) : (
        <View
          style={tw.style(
            ' z-1000  w-full bottom-0 pt-4 absolute justify-center items-center border-t border-t-black border-opacity-10 self-center',
            style,
            {paddingBottom: (bottom || 10) + 4},
          )}>
          {twoButton ? (
            <View style={tw`flex-row justify-between`}>
              <Button
                secondary
                disabled={secondButtonDisabled}
                containerStyle={tw`flex-1 mr-1`}
                style={tw`items-center px-0 h-12`}
                title={secondButtonTitle}
                titleStyle={tw`bv-heading-base`}
                icon={secondButtonIcon}
                onPress={onPressSecondButton}
              />
              <Button
                disabled={firstButtonDisabled}
                primary
                containerStyle={tw`flex-1 ml-1`}
                style={tw`items-center px-0 h-12`}
                title={firstButtonTitle}
                titleStyle={tw`bv-heading-base`}
                icon={firstButtonIcon}
                onPress={onPressFirstButton}
              />
            </View>
          ) : (
            <View style={tw`w-full`}>
              <Button
                primary
                disabled={firstButtonDisabled}
                containerStyle={tw`flex-1 ml-1`}
                style={tw`items-center px-0 h-12`}
                title={firstButtonTitle}
                titleStyle={tw`bv-heading-base text-white`}
                icon={firstButtonIcon}
                onPress={onPressFirstButton}
              />
            </View>
          )}
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export {Footer};
