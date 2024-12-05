import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import tw from '../../../tailwind';

const TabBarTest = ({children, style}) => {
  const [activeKey, setActiveKey] = useState(1);
  const [content, setContent] = useState(children[0].props.children);
  const onPress = item => {
    setActiveKey(item.options.key);
    setContent(item.children);
  };

  return (
    <View>
      <View
        style={tw.style(
          'flex-row justify-center p-2 bg-[#EDEDED] rounded-30',
          style,
        )}>
        {React.Children.map(children, child => {
          return (
            <View>
              <Pressable
                onPress={() => onPress(child.props)}
                style={tw.style(
                  'justify-center  py-2.5 px-3 rounded-2xl flex-row',
                  {
                    'bg-white': child.props.options.key === activeKey,
                    'shadow-md': child.props.options.key === activeKey,
                  },
                )}>
                {child.props.options.icon &&
                child.props.options.key === activeKey ? (
                  <View style={tw`mr-1`}>{child.props.options.icon}</View>
                ) : null}
                <Text
                  style={tw.style('tp-heading text-sm ', {
                    'text-primary': child.props.options.key === activeKey,
                  })}>
                  {child.props.options.title}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </View>
      <View>{content}</View>
    </View>
  );
};

export {TabBarTest};
