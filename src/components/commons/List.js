import React, {useState} from 'react';
import {View, ActivityIndicator, Image, Text} from 'react-native';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';

import tw from '../../../tailwind';

const List = ({
  style,
  containerStyle,
  data = [],
  isLoading,
  isEmpty,
  refresh,
  renderItem = () => null,
  fetchNextPage = () => false,
  refetch = () => false,
  ...props
}) => {
  const [refreshing, setRefresh] = useState(false);

  // const renderEmpty = () => {
  //   if (!isEmpty) {
  //     return null;
  //   }
  //   return (
  //     <View style={tw`items-center justify-center my-12 w-full`}>
  //       <Image
  //         source={require('../../assets/media/empty.png')}
  //         style={tw`w-32 h-32 mb-7`}
  //         resizeMode="contain"
  //       />
  //       <Text style={tw`tp-lead2 opacity-60`}>Empty</Text>
  //     </View>
  //   );
  // };

  // const renderLoading = () => {
  //   if (!isLoading) {
  //     return null;
  //   }
  //   return (
  //     <View style={tw`w-full items-center justify-center py-8`}>
  //       <ActivityIndicator size="large" color={'#CED2FF'} />
  //     </View>
  //   );
  // };

  const onRefresh = () => {
    if (!refresh) {
      return;
    }
    setRefresh(true);
    handleRefrech();
  };

  const handleRefrech = () => {
    refetch(() => setRefresh(false));
  };

  return (
    <KeyboardAwareFlatList
      removeClippedSubviews
      onEndReachedThreshold={0.5}
      style={tw.style('flex-1 w-full', style)}
      contentContainerStyle={containerStyle}
      keyExtractor={(item, index) => String(item.id || index)}
      data={data}
      refreshing={refreshing}
      onRefresh={onRefresh}
      // ListFooterComponent={renderLoading()}
      // ListEmptyComponent={renderEmpty()}
      onEndReached={fetchNextPage}
      renderItem={renderItem}
      {...props}
    />
  );
};

export {List};
