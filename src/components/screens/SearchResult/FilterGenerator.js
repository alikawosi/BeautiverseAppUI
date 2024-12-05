import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import {ArrowUp2, ArrowDown2} from 'iconsax-react-native';

import tw from '../../../../tailwind';
import {CheckBox, RadioButton, Switch} from '../../commons';

const FilterGenerator = ({
  title,
  valueName,
  options,
  col = false,
  type,
  onChange = () => false,
  defaultValueRadioButton = 1,
  defaultValueCheckBox = [1, 5],
  defaultValueSldier = null,
  defaultValueSwitch = false,
}) => {
  const [isContentShow, setIsContentShow] = useState(false);
  const [isActive, setIsActive] = useState(defaultValueSwitch);
  const [activeRadioButton, setActiveRadioButton] = useState(
    defaultValueRadioButton,
  );
  const [activeCheckBox, setActiveCheckBox] = useState(defaultValueCheckBox);
  const [sliderValue, setSliderValue] = useState(
    defaultValueSldier || (type === 'slider' && options[0]),
  );

  const itemPressHandler = () => {
    if (type === 'switch') {
      setIsActive(!isActive);
    } else {
      setIsContentShow(!isContentShow);
    }
  };

  const checkBoxPressHandler = id => {
    let tempList = [...activeCheckBox];
    if (tempList.includes(id)) {
      tempList = tempList.filter(p => p !== id);
      setActiveCheckBox(tempList);
    } else {
      tempList.push(id);
      setActiveCheckBox(tempList);
    }
    onChange({
      filterType: valueName,
      value: options
        .filter(p => tempList.includes(p.id))
        .map(t => {
          return t.title;
        }),
      id: tempList,
    });
  };
  const contentGenerator = () => {
    if (type === 'switch') {
      return null;
    } else if (type === 'radio') {
      return options.map(item => (
        <RadioButton
          style={col ? tw`w-1/${col} justify-start` : null}
          key={item.id}
          label={item.title}
          isChecked={activeRadioButton === item.id ? true : false}
          onPress={() => {
            setActiveRadioButton(item.id);
            onChange({filterType: valueName, id: item.id, value: item.value});
          }}
        />
      ));
    } else if (type === 'check') {
      return options.map(item => (
        <CheckBox
          style={tw`w-1/2 justify-start`}
          key={item.id}
          label={item.title}
          isChecked={activeCheckBox.includes(item.id) ? true : false}
          onPress={() => {
            checkBoxPressHandler(item.id);
          }}
        />
      ));
    } else if (type === 'slider') {
      return (
        <Slider
          animateTransitions
          maximumTrackTintColor="#d3d3d3"
          step={1}
          maximumValue={options ? options[1]?.[1] : null}
          minimumTrackTintColor="#AB65F1"
          minimumValue={options ? options[1]?.[0] : null}
          value={sliderValue}
          onValueChange={v => {
            setSliderValue(v);
          }}
          containerStyle={tw`w-[98%] mx-auto`}
          onSlidingComplete={v => {
            onChange({filterType: valueName, value: v});
          }}
          renderAboveThumbComponent={i => (
            <View style={tw`flex-row w-20 -ml-10 justify-center`}>
              <Text style={tw`bv-med-base`}>{`${options[2] ? options[2] : ''} ${
                sliderValue[i] ? sliderValue[i] : sliderValue[0]
              } ${options[3] ? options[3] : ''}`}</Text>
            </View>
          )}
          renderThumbComponent={() => (
            <View style={tw`bg-primary h-4 w-4 rounded-full`} />
          )}
        />
      );
    }
    //return <Separator />;
  };
  const IconSafeArea = () => {
    return (
      <Pressable
        style={tw`items-center justify-center h-4 w-12`}
        onPress={itemPressHandler}>
        {isContentShow ? (
          <ArrowUp2 color="#717171" size="20" />
        ) : (
          <ArrowDown2 color="#717171" size="20" />
        )}
      </Pressable>
    );
  };
  const Separator = () => {
    return <View style={tw`border-t-2 border-black mt-4 opacity-10`} />;
  };

  return (
    <View style={tw`min-h-14 w-full justify-center`}>
      <Pressable
        onPress={itemPressHandler}
        style={tw`flex-row justify-between items-center min-h-6 my-4`}>
        <Text style={tw`font-heading text-base text-black`}>{title}</Text>
        {type !== 'switch' ? (
          <IconSafeArea />
        ) : (
          <Switch
            onPress={() => {
              setIsActive(!isActive);
              onChange({filterType: valueName, value: !isActive});
            }}
            isActive={isActive}
          />
        )}
      </Pressable>
      {isContentShow && (
        <View
          style={tw.style('p-3', {
            'flex-row items-center justify-between p-0': type !== 'slider',
            'flex-wrap h-22 content-around': type === 'check',
            'flex-wrap h-14 content-around': type === 'radio' && col !== false,
          })}>
          {contentGenerator()}
        </View>
      )}
      {isContentShow && <Separator />}
    </View>
  );
};

export {FilterGenerator};
