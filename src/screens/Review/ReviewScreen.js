import React, {useState} from 'react';
import {
  Image,
  View,
  Text,
  ScrollView,
  TextInput,
  FlatList,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CloseCircle, GalleryAdd, Shop, Verify} from 'iconsax-react-native';
import {AirbnbRating} from 'react-native-ratings';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';
import {CardTag} from '../../components/elements';
import {Accordion, Button} from '../../components/commons';
import {ReasonSection} from '../../components/screens/Review';
import {REVIEW_CONST} from '../../constants';
import ImageCropPicker from 'react-native-image-crop-picker';
import {BlurView} from '@react-native-community/blur';

const ReviewScreen = ({
  name = 'Alice Berton',
  isVerify = true,
  isMaestro = true,
  image,
  address = '662 Annette St',
  distance = '2',
  category,
  time,
  date,
  dueDate,
  offerTitle,
  offPercentage,
  newPrice,
  oldPrice,
  duration,
  isUpcoming,
}) => {
  const {navigate} = useNavigation();
  const [imageList, setImageList] = useState([]);

  const openImagePickerFromGallery = () => {
    ImageCropPicker.openPicker({
      writeTempFile: true,
      width: 300,
      height: 300,
      cropping: true,
    }).then(photo => {
      let tempList = [...imageList];
      tempList.push({id: tempList.length + 1, image: photo.path});

      setImageList(tempList);
    });
    //onSubmit(image);
  };

  const removeImage = id => {
    let tempList = [...imageList];
    var filteredList = tempList.filter(p => p.id !== id);

    setImageList(filteredList);
  };

  const Separator = props => {
    const {style} = props;
    return (
      <View style={tw.style('w-full h-px bg-black/10 mb-4 mt-6', style)} />
    );
  };

  return (
    <KeyboardAvoidingView
      style={tw`flex-1`}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView edges={['bottom']} style={tw`flex-1 px-5 bg-white`}>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <View style={tw`flex-row mt-5`}>
            <View style={tw`items-center`}>
              <Image
                style={tw`w-18 h-18 rounded-full`}
                source={
                  image ? image : require('../../assets/media/UserDefault.png')
                }
              />
              {true ? (
                <View
                  style={tw`rounded-10 bg-basicYellow w-15 px-1 py-0.5 items-center absolute top-15`}>
                  <Text style={tw`bv-sans-xs`}>Maestro</Text>
                </View>
              ) : null}
            </View>
            <View style={tw`w-9/12 justify-around ml-4`}>
              <View style={tw`flex-row items-center justify-between`}>
                <View style={tw`flex-row items-center`}>
                  <Text style={tw`bv-heading-lg mr-1`}>
                    {name ? name : 'unknown'}
                  </Text>
                  {isVerify ? (
                    <Verify size={16} color="#5948AA" variant="Bold" />
                  ) : null}
                </View>
              </View>
              {address || distance ? (
                <View style={tw`flex-row items-center`}>
                  {address ? (
                    <View style={tw`flex-row`}>
                      <Shop size={16} color="#5948AA" />
                      <Text style={tw`bv-sans-sm text-primary ml-1`}>
                        {address}
                      </Text>
                    </View>
                  ) : null}
                  {distance ? (
                    <View style={tw`flex-row`}>
                      <Text style={tw`bv-sans-sm text-gray-300 mx-1`}>
                        {'|'}
                      </Text>
                      <Text style={tw`bv-sans-sm text-primary`}>
                        {distance} km
                      </Text>
                    </View>
                  ) : null}
                </View>
              ) : null}
            </View>
          </View>
          <Separator />
          <View style={tw`w-full items-center mb-7`}>
            <CardTag style={tw`rounded-10 h-6`}>
              <Text style={tw`bv-sans-sm text-primary`}>Lashes</Text>
            </CardTag>
            <AirbnbRating
              size={24}
              showRating={false}
              selectedColor="#FF9100"
              unSelectedColor="#C9D2DD"
              defaultRating={4}
              isDisabled={false}
              ratingContainerStyle={tw`my-4`}
            />
            <Button
              style={tw`h-auto`}
              title={'Detailed Rating'}
              defaultColor="#5948AA"
              titleStyle={tw`font-sans`}
              onPress={() => navigate('DetailedReview')}
            />
          </View>
          <ReasonSection
            sectionTitle={'Reason For Good'}
            data={REVIEW_CONST.ReasonForGoodData}
          />
          <Separator />
          <ReasonSection
            sectionTitle={'Reason For Bad'}
            data={REVIEW_CONST.ReasonForBadData}
            countStyle={tw`text-grayBorder`}
          />
          <Separator />
          <Text style={tw`bv-heading-xl`}>Your Review *</Text>
          <Accordion
            title={'Add A Note/Attach Photos'}
            titleStyle={tw`bv-sans-sm`}
            style={tw`border border-basicGray rounded-xl justify-center p-3`}>
            <TextInput
              style={tw`p-0 mb-8`}
              multiline={true}
              placeholder="Example: I like my service to be the attached photo...."
            />
            <FlatList
              style={tw`mb-3`}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={imageList}
              renderItem={({item}) => (
                <View style={tw`rounded-xl`}>
                  <Image
                    style={tw`h-20 w-20 rounded-xl`}
                    source={{uri: item.image}}
                  />
                  {Platform.OS === 'ios' ? (
                    <BlurView
                      blurType="light"
                      blurAmount={5}
                      style={tw.style`w-20 h-6 absolute bottom-0 rounded-xl`}
                    />
                  ) : (
                    <View
                      style={tw`w-20 h-6 bg-white/30 absolute bottom-0 rounded-b-xl`}
                    />
                  )}
                  <Button
                    containerStyle={tw`absolute bottom-0 self-center w-full`}
                    style={tw`h-6`}
                    icon={<CloseCircle size={20} color={'white'} />}
                    onPress={() => removeImage(item.id)}
                  />
                </View>
              )}
              ItemSeparatorComponent={() => <View style={tw`w-1`} />}
              keyExtractor={(item, index) => String(item.id || index)}
            />
            <Button
              title={'add photo'}
              defaultColor={'#5948AA'}
              icon={<GalleryAdd size={16} color={'#5948AA'} />}
              style={tw`border border-basicGray h-8 rounded-lg`}
              onPress={() => openImagePickerFromGallery()}
            />
          </Accordion>
          <Separator style={tw`my-4`} />
          <Button
            primary
            title={'Submit'}
            size={'small'}
            onPress={() => navigate('TipModal')}
          />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ReviewScreen;
