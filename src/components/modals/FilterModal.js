import React, {useRef} from 'react';
import {ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';
import {FilterModalData} from '../../constants';
import {Button, ModalWrapper} from '../commons';
import {FilterGenerator} from '../screens/SearchResult';

const FilterModal = ({route}) => {
  const {goBack} = useNavigation();
  const {title, onSubmit = () => false, initialSearchOptions} = route.params;
  const defaultValue = route.params.defaultValue;
  const searchResult = useRef(defaultValue.current);
  const filterParameter = useRef(initialSearchOptions);

  const filterSearchedResult = p => {
    const prevParameter = filterParameter.current;
    const {filterType, value, id} = p;
    searchResult.current = {
      ...searchResult.current,
      [filterType]: {value, id},
    };

    switch (p.filterType) {
      case 'price':
        filterParameter.current = {
          ...prevParameter,
          price_from: parseInt(p.value[0], 10),
          price_to: parseInt(p.value[1], 10),
        };
        break;
      case 'distance':
        filterParameter.current = {
          ...prevParameter,
          distance_from: parseInt(p.value[0], 10),
          distance_to: parseInt(p.value[1], 10),
        };
        break;
      case 'apps':
        filterParameter.current = {
          ...prevParameter,
          apps: parseInt(p.value[0], 10),
        };
        break;
      case 'rtns':
        filterParameter.current = {
          ...prevParameter,
          rtns_from: parseInt(p.value[0], 10),
          rtns_to: parseInt(p.value[1], 10),
        };
        break;
      default:
        filterParameter.current = {
          ...prevParameter,
          [p.filterType]: p.value,
        };
        break;
    }
  };

  const handleSubmit = () => {
    route.params.defaultValue.current = searchResult.current;
    onSubmit(filterParameter.current);
    goBack();
  };

  return (
    <ModalWrapper
      titleSeparator
      type="fromBottom"
      title={title}
      style={tw`max-h-[80%]`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {FilterModalData.map(item => (
          <FilterGenerator
            {...item}
            key={item.id}
            onChange={p => filterSearchedResult(p)}
            defaultValueSwitch={
              item.type === 'switch' &&
              defaultValue.current[item.valueName]?.value
            }
            defaultValueSldier={
              item.type === 'slider' &&
              defaultValue.current[item.valueName]?.value
            }
            defaultValueCheckBox={
              item.type === 'check' && defaultValue.current[item.valueName]?.id
            }
            defaultValueRadioButton={
              item.type === 'radio' && defaultValue.current[item.valueName]?.id
            }
          />
        ))}
      </ScrollView>
      <Button
        primary
        title="Add Filters"
        onPress={handleSubmit}
        containerStyle={tw`mb-auto mt-6`}
      />
    </ModalWrapper>
  );
};

export {FilterModal};
