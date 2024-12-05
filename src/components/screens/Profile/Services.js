import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Pressable} from 'react-native';
import {Car} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../../tailwind';
import {CardTag} from '../../elements';
import {BookServiceCard} from './BookServiceCard';
import {UnderLineTabBar} from '../../commons';

const Services = ({data, initialValues, onChange = () => false}) => {
  const {navigate} = useNavigation();
  const [services, setServices] = useState(data.categories[0].services);
  const [selectedServices, setSelectedServices] = useState(initialValues);
  const [imageList, setImageList] = useState(data.categories[0].gallery);
  const [location, setLocation] = useState(data.categories[0].service_location);
  //const [gender, setGender] = useState(data.categories[0].gallery);
  //const [apps, setApps] = useState(data.categories[0].sex);

  useEffect(() => {
    onChange(selectedServices);
  }, [selectedServices]);

  const onCategorySelect = id => {
    var filteredList = data.categories.filter(item => item.id === id);
    setServices(filteredList[0].services);
    setImageList(filteredList[0].gallery);
    setLocation(filteredList[0].service_location);
  };

  const onSelectItem = (item, val) => {
    let selectedItem = {};
    let tempList = [...selectedServices];

    if (item.variations) {
      selectedItem = {
        variationId: val.variationId,
        variationTitle: val.title,
        serviceTitle: item.title,
        serviceId: item.id,
        price: val.price,
        duration: val.duration,
        discountedPrice: val.discountedPrice,
      };
    } else {
      selectedItem = {
        serviceTitle: item.title,
        serviceId: item.id,
        price: item.price,
        duration: item.duration,
      };
    }

    if (
      tempList.find(e => e.serviceId === selectedItem.serviceId) &&
      tempList.find(e => e.variationId === selectedItem.variationId)
    ) {
      var filteredList = tempList.filter(
        p => p.serviceId !== selectedItem.serviceId,
      );
      setSelectedServices(filteredList);
    } else {
      if (tempList.find(e => e.serviceId === selectedItem.serviceId)) {
        var filteredList = tempList.filter(
          p => p.serviceId !== selectedItem.serviceId,
        );
        filteredList.push(selectedItem);
        setSelectedServices(filteredList);
      } else {
        tempList.push(selectedItem);
        setSelectedServices(tempList);
      }
    }
  };

  return (
    <View>
      <UnderLineTabBar
        data={data.categories}
        onPressTab={id => onCategorySelect(id)}
        children={
          <ScrollView
            contentContainerStyle={tw`flex-row items-start my-3`}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {location === 'anywhere' ? (
              <Pressable
                onPress={() =>
                  navigate('InfoModal', {
                    title: 'Mobile Services',
                    desc1: (
                      <CardTag style={tw`mr-2`}>
                        <Car size={16} color="#5948AA" />
                        <Text style={tw`font-sans text-sm text-primary ml-1`}>
                          {location}
                        </Text>
                      </CardTag>
                    ),
                    desc2: (
                      <Text style={tw`bv-sans-sm text-grayBorder text-center`}>
                        This professional has completed
                        <Text style={tw`text-primary`}>+1500</Text>{' '}
                        appointments, and have a{' '}
                        <Text style={tw`text-primary`}>97%</Text> satisfaction
                        rate from customers in
                        <Text style={tw`text-primary`}>Manicure</Text>
                        category.
                      </Text>
                    ),
                  })
                }>
                <CardTag style={tw`mr-2`}>
                  <Car size={16} color="#5948AA" />
                  <Text style={tw`font-sans text-sm text-primary ml-1`}>
                    Mobile
                  </Text>
                </CardTag>
              </Pressable>
            ) : null}
          </ScrollView>
        }
      />

      {services.map((item, index) => (
        <BookServiceCard
          key={item.id}
          id={item.id}
          serviceTitle={item.title}
          desc={item.description}
          options={item.variations}
          priceRange={item.price_range}
          durationRange={item.duration}
          imageList={imageList}
          seprator={services.length !== index + 1}
          onPress={val => onSelectItem(item, val)}
          initialValue={
            initialValues.filter(p => p.serviceId === item.id)?.length > 0
              ? initialValues.filter(p => p.serviceId === item.id)
              : null
          }
          // isAddOn={item.variations.length > 0}
        />
      ))}
    </View>
  );
};

export {Services};
