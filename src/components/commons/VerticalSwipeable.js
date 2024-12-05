import {LayoutAnimation, PanResponder, View} from 'react-native';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ArrowDown2, ArrowUp2, Minus} from 'iconsax-react-native';

import tw from '../../../tailwind';
import {Button} from './Button';

const VerticalSwipeable = ({
  style,
  swipeHeight = 60,
  iconSize = 26,
  iconColor = '#717171',
  closedItems,
  openedItems,
  buttonAvailable = false,
  twoButton,
  buttonType,
  firstButtonTitle,
  firstButtonIcon,
  onPressFirstButton = () => {},
  secondButtonTitle,
  secondButtonIcon,
  onPressSecondButton = () => {},
  firstButtonDisabled,
  secondButtonDisabled,
}) => {
  const [icon, setIcon] = useState(
    openedItems !== null && undefined ? (
      <ArrowUp2 size={iconSize} color={iconColor} />
    ) : closedItems !== null ? (
      <Minus size={iconSize} color={iconColor} />
    ) : null,
  );
  const [collapsed, setCollapsed] = useState(true);
  const {bottom} = useSafeAreaInsets();
  const CustomAnimation = {
    duration: 500,
    create: {
      type: LayoutAnimation.Types.spring,
      property: LayoutAnimation.Properties.opacity,
      springDamping: 0.8,
    },
    update: {
      type: LayoutAnimation.Types.spring,
      property: LayoutAnimation.Properties.opacity,
      springDamping: 0.8,
    },
  };
  const updateNativeProps = () => {
    LayoutAnimation.configureNext(CustomAnimation);
  };

  const onPanResponderMove = (event, gestureState) => {
    if (gestureState.dy > 0 && !collapsed) {
      setIcon(<ArrowUp2 size={iconSize} color={iconColor} />);
      setCollapsed(true);
      updateNativeProps();
    } else if (collapsed && gestureState.dy < -swipeHeight) {
      setIcon(<ArrowDown2 size={iconSize} color={iconColor} />);
      setCollapsed(false);
      updateNativeProps();
    }
  };
  const onPanResponderRelease = (event, gestureState) => {
    if (gestureState.dy === 0) {
      if (collapsed) {
        showFull();
      } else {
        showMini();
      }
    } else {
      if (gestureState.dy < 0) {
        showFull();
      } else {
        showMini();
      }
    }
  };
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (x, y) => true,
      onPanResponderMove,
      onPanResponderRelease,
    }),
  ).current;
  const showFull = () => {
    setIcon(<ArrowDown2 size={iconSize} color={iconColor} />);
    updateNativeProps();
    setCollapsed(false);
  };
  const showMini = () => {
    setIcon(<ArrowUp2 size={iconSize} color={iconColor} />);
    updateNativeProps();
    setCollapsed(true);
  };

  return (
    <View
      {...panResponder.panHandlers}
      style={[
        tw.style(
          ' w-full absolute bottom-0 pt-4 px-5 rounded-t-20 shadow-xl bg-white items-center',

          style,
        ),
        {paddingBottom: (bottom || 10) + 4},
      ]}>
      {icon}
      {closedItems}
      {!collapsed ? openedItems : null}
      {buttonAvailable ? (
        <View style={tw`w-full`}>
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
                primary
                disabled={firstButtonDisabled}
                containerStyle={tw`flex-1 ml-1`}
                style={tw`items-center px-0 h-12`}
                title={firstButtonTitle}
                titleStyle={tw`bv-heading-base`}
                icon={firstButtonIcon}
                onPress={onPressFirstButton}
              />
            </View>
          ) : (
            <Button
              primary={buttonType === 'primary' ? true : false}
              disabled={firstButtonDisabled}
              secondary={buttonType === 'secondary' ? true : false}
              containerStyle={tw`ml-1`}
              style={tw`items-center px-0 h-12`}
              title={firstButtonTitle}
              titleStyle={tw`bv-heading-base`}
              icon={firstButtonIcon}
              onPress={onPressFirstButton}
            />
          )}
        </View>
      ) : null}
    </View>
  );
};

export {VerticalSwipeable};
