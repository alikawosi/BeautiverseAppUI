import React, {useRef} from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Animated,
  Easing,
} from 'react-native';
import Color from 'color';
import LinearGradient from 'react-native-linear-gradient';
import tw from '../../../tailwind';

const Button = ({
  style,
  containerStyle,
  loading,
  reverse,
  disabled,
  primary,
  onPress,
  icon,
  iconSize,
  iconStyle,
  title,
  titleStyle,
  defaultColor,
  bgColor,
  children,
}) => {
  const viewAnim = useRef(new Animated.Value(0)).current;
  let backgroundColor = bgColor || 'transparent';
  let textColor = defaultColor || 'AB65F1';
  let iconColor = defaultColor || 'AB65F1';

  if (primary) {
    backgroundColor = ['#AB65F1', '#5E4BA5'];
    textColor = iconColor = '#FFFFFF';
    if (disabled) {
      backgroundColor = 'gray';
      //Color(STYLES.Color.gray).alpha(0.2).toString();
      textColor = iconColor = 'gray';
    }
  }

  useUpdate(() => {
    rnUtils.layoutAnimation(true);
  }, [loading]);

  const runAnimation = pressed => {
    Animated.timing(viewAnim, {
      toValue: pressed ? 1 : 0,
      duration: 350,
      easing: Easing.out(Easing.exp),
      useNativeDriver: false,
    }).start();

    if (primary) {
      return {
        backgroundColor: viewAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [
            backgroundColor,
            Color(backgroundColor)
              .darken(0.2)
              .alpha(Color(backgroundColor).alpha() + 0.1)
              .toString(),
          ],
        }),
      };
    }
    return {
      opacity: viewAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.6],
      }),
    };
  };

  return (
    <Pressable
      disabled={disabled || loading}
      onPress={onPress}
      style={tw.style('w-auto', style)}>
      <LinearGradient
        useAngle={true}
        angle={90.6}
        colors={['#AB65F1', '#5E4BA5']}
        >
        {loading ? (
          <View style={tw`items-center justify-center`}>
            <ActivityIndicator size="small" color={iconColor} />
          </View>
        ) : null}
        {title && (icon || loading) ? <View style={tw`w-2`} /> : null}
        {title ? (
          <Text
            style={tw.style(
              //'tp-lead1',
              {
                color: textColor,
              },
              titleStyle,
            )}>
            {title}
          </Text>
        ) : null}
        {children && title ? <View style={tw`w-2`} /> : null}
        {children}
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  primary: {
    borderRadius: 20,
    //backgroundColor: '#AB65F1',
    paddingHorizontal: 50,
    paddingVertical: 16,
  },
  primaryTextStyle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Gilroy-SemiBold',
  },
  secondary: {
    borderRadius: 20,
    //padding:1,
    // backgroundColor: '#FFFFFF',
    // paddingHorizontal: 50,
    // paddingVertical: 16,
    // borderStyle: 'solid',
    // borderWidth: 1,
  },
  secondaryTextStyle: {
    margin: 6,
    // paddingHorizontal: 50,
    // paddingVertical: 16,
    textAlign: 'center',
    backgroundColor: 'white',
    color: '#5948AA',
    fontSize: 20,
    fontFamily: 'Gilroy-SemiBold',
  },
  circleGradient: {
    margin: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  disabled: {
    // backgroundColor: 'gray',
    // color: 'white',
    // paddingHorizontal: 50,
    // paddingVertical: 10,
    opacity: 0.5,
  },
});

// Button.defaultProps = {
//   onPress: () => false,
//   loading: false,
//   iconSize: 20,
//   primary: true,
//   disabled: false,
// };

export {Button};
//linear-gradient(90.6deg, #AB65F1 3.42%, #5E4BA5 110.22%);
