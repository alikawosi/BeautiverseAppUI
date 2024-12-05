import React, {useState} from 'react';
import {View} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';
import {Button, ModalWrapper} from '../commons';

const AddPhotoModal = ({route}) => {
  const {onSubmit = () => false, multiple = true} = route.params;
  const {goBack} = useNavigation();

  const openImagePickerFromGallery = () => {
    ImageCropPicker.openPicker({
      writeTempFile: true,
      width: 300,
      height: 300,
      cropping: true,
      multiple: multiple,
      maxFiles: 10,
      includeBase64: true,
    }).then(selectedPhotoList => {
      let photoList = selectedPhotoList.map(item => {
        const base64 = `data:${item.mime};base64,${item.data}`;
        return {id: null, url: base64};
      });
      onSubmit(photoList);
      goBack();
    });

  };

  const openImagePickerFromCamera = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
    }).then(photo => {
      const base64 = `data:${photo.mime};base64,${photo.data}`;
      let img = {id: null, url: base64};
      onSubmit(img);
    });
  };
  return (
    <ModalWrapper
      titleSeparator
      type="fromBottom"
      title={'Add Photo'}
      style={tw`h-auto`}>
      <View style={tw`justify-center items-center`}>
        <Button
          title={'Choose From Gallery'}
          containerStyle={tw`border border-[#C9D2DD] rounded-2xl w-full mb-4`}
          titleStyle={tw`font-heading text-lg`}
          onPress={openImagePickerFromGallery}
        />
        <Button
          title={'Take A Photo'}
          containerStyle={tw`border border-[#C9D2DD] rounded-2xl w-full`}
          titleStyle={tw`font-heading text-lg`}
          onPress={openImagePickerFromCamera}
        />
      </View>
    </ModalWrapper>
  );
};

export {AddPhotoModal};
