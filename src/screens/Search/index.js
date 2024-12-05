import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ServiceSearch from './ServiceSearch';
import SearchResult from './SearchResult';
import MapSearchResult from './MapSearchResult';

const Stack = createNativeStackNavigator();

const Search = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ServiceSearch" component={ServiceSearch} />
      <Stack.Screen name="SearchResult" component={SearchResult} />
      <Stack.Screen name="MapSearchResult" component={MapSearchResult} />
    </Stack.Navigator>
  );
};

export default Search;
