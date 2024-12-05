import {
  View,
  Text,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {ArrowRight2, TickCircle} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import {SafeAreaView} from 'react-native-safe-area-context';

import tw from '../../../../tailwind';
import {SETTING_CONST} from '../../../constants';
import {Tag} from '../../../components/elements';
import {Button, Form, RadioButton} from '../../../components/commons';

const width = Dimensions.get('window').width;

const BuyGiftCard = () => {
  const [selectedImage, setSelectedImage] = useState(
    require('../../../assets/media/GiftCard3.png'),
  );
  const [selectedCard, setSelectedCard] = useState(3);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [selectedRadioButton, setSelectedRadioButton] = useState(0);

  const {navigate} = useNavigation();

  return (
    <SafeAreaView edges={['bottom']} style={tw`flex bg-white flex-1`}>
      <ScrollView style={tw`flex-1 `}>
        <Image
          style={tw` h-44 self-center mb-6 mx-6 rounded-15`}
          source={selectedImage}
        />
        <Carousel
          width={width * 0.4}
          height={80}
          scrollAnimationDuration={1000}
          style={tw` w-auto justify-center items-center mb-6`}
          data={SETTING_CONST.giftCardCarouselData}
          renderItem={index => (
            <Pressable
              key={index.item.id}
              onPress={() => {
                setSelectedImage(index.item.image);
                setSelectedCard(index.item.id);
              }}>
              <Image
                style={tw`w-36 h-20 rounded-15  `}
                source={index.item.image}
              />
              {index.item.id === selectedCard ? (
                <View
                  style={tw`absolute items-center justify-center w-36 h-20 bg-[#00000033] rounded-15`}>
                  <TickCircle size="28" color="#FFFFFF" variant="Bold" />
                  <Text style={tw`bv-sans-sm text-white`}>Selected</Text>
                </View>
              ) : null}
            </Pressable>
          )}
        />
        <View style={tw` px-6 `}>
          <Text style={tw`bv-heading-base capitalize mb-4`}>Choose Amount</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={tw`mb-6`}>
            {SETTING_CONST.giftCardAmountData.map(item => {
              return (
                <Tag
                  onPress={() => {
                    item.title === 'Custom'
                      ? navigate('FormModal', {
                          title: 'Custom',
                          EditMode: false,
                          formData: [
                            {
                              name: 'customGiftCardAmount',
                              type: 'input',
                              label: 'Custom',
                              keyboardType: 'numeric',
                            },
                          ],
                        })
                      : null;
                    setSelectedAmount(item.id);
                  }}
                  title={item.title}
                  selected={selectedAmount === item.id ? true : false}
                />
              );
            })}
          </ScrollView>
          <Text style={tw`bv-heading-base capitalize mb-4`}> send method</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={tw`mb-6 flex-1`}
            contentContainerStyle={tw`justify-between flex-1 items-center `}>
            {SETTING_CONST.giftCardSendMethod.map(item => {
              return (
                <RadioButton
                  key={item.id}
                  size={14}
                  style={tw`mr-12`}
                  label={item.title}
                  isChecked={selectedRadioButton === item.id ? true : false}
                  onPress={() => setSelectedRadioButton(item.id)}
                />
              );
            })}
          </ScrollView>
          <Form fields={SETTING_CONST.buyGiftCardFormData} />
          <Pressable
            style={tw`flex-row justify-between pb-6 border-b border-lightGray mb-6 `}
            onPress={() => {
              navigate('InfoModal', {
                title: 'FAQs',
                desc1: (
                  <Text style={tw`bv-sans-sm text-grayBorder `}>
                    Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
                    ullamco cillum dolor. Voluptate exercitation incididunt
                    aliquip deserunt repre tempor enim. Elit aute irure tempor
                    cupidatat incididunt sint deserunt ut voluptate aute id
                    deserunt nisi.at nostrud irure ex duis ea quis id quis ad
                    et. Sunt qui esse pariatur duis deserunt mollit dolore
                    cillum minim tempor enim. Elit ese
                  </Text>
                ),
              });
            }}>
            <Text style={tw`bv-heading-base`}>FAQ's</Text>
            <ArrowRight2 color="#717171" size={22} />
          </Pressable>
          <Button primary title="buy gift card" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BuyGiftCard;
