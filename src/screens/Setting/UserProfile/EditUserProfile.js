import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useMutation} from 'react-query';
import axios from 'axios';

import tw from '../../../../tailwind';
import {useAuth} from '../../../hooks';
import {SectionWrapper} from '../../../components/elements';
import LoadingScreenLayout from '../../../components/commons/LoadingScreenLayout';

const EditUserProfile = () => {
  const {navigate, goBack} = useNavigation();
  const profileData = useAuth();
  const updateUser = useMutation({
    mutationFn: data => {
      return axios.post('https://beautiverse.ca/api/beautiverse/user/update', {
        data: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      return profileData.refetchUser();
    },
    onError: () => goBack(),
  });

  return (
    <SafeAreaView
      edges={['bottom']}
      style={tw`flex bg-background flex-1 pb-4 `}>
      {updateUser.isLoading ? (
        <LoadingScreenLayout style={tw`bg-background`} />
      ) : profileData.userInfo ? (
        <>
          <View style={tw`items-center px-7 mb-5`}>
            <Image
              source={{uri: profileData.userInfo.avatar_url}}
              style={tw`rounded-full w-23 h-23 mb-4 `}
            />
            <Pressable
              onPress={() =>
                navigate('SetPhotoModal', {
                  type: 'fromBottom',
                  isLoading: updateUser.isLoading,
                  isSuccess: updateUser.isSuccess,
                  image: profileData.userInfo.avatar_url,
                  onSubmit: image => {
                    updateUser.mutate({
                      avatar: image,
                    });
                  },
                })
              }>
              <Text style={tw`bv-sans-sm text-primary`}>Edit Profile</Text>
            </Pressable>
          </View>
          <SectionWrapper
            title="About Me"
            description="Edit"
            descriptionStyle={tw`underline`}
            seperator={false}
            onDescriptionPress={() =>
              navigate('FormModal', {
                title: 'About Me',
                description:
                  'tell us about your self, so your future pros can get to know you',
                isEditMode: profileData.userInfo.about_me ? true : false,
                defaultValues: profileData.userInfo.about_me
                  ? {aboutMe: profileData.userInfo.about_me}
                  : null,
                formData: [
                  {
                    name: 'aboutMe',
                    type: 'input',
                    //label: 'Enter Description',
                    inputValue: profileData.userInfo.about_me,
                    inputType: 'textArea',
                    validation: 'required',
                    isMultiline: true,
                    labelFix: profileData.userInfo.about_me ? true : false,
                  },
                ],
                onSubmit: val => {
                  updateUser.mutate({
                    about_me: val.aboutMe,
                  });
                },
                onUpdate: val => {
                  updateUser.mutate({
                    about_me: val.aboutMe,
                  });
                },
              })
            }
            style={tw`px-5 py-4 border-0 bg-white rounded-t-2xl`}>
            <Text style={tw`bv-med-sm mb-4 text-grayBorder`}>
              {profileData.userInfo.about_me}
            </Text>
          </SectionWrapper>
          <SectionWrapper
            title="Location"
            description="Edit"
            descriptionStyle={tw`underline`}
            seperator={false}
            onDescriptionPress={() => {
              navigate('SearchModal', {
                title: 'Search',
                placeholder: 'Location',
                type: 'location',
                onSubmit: val =>
                  updateUser.mutate({
                    location: val.title,
                  }),
              });
            }}
            style={tw`px-5 py-4 border-0 bg-white`}>
            <Text style={tw`bv-med-sm mb-4 text-grayBorder`}>
              {profileData.userInfo.location}
            </Text>
          </SectionWrapper>
          <SectionWrapper
            title="Work"
            description="Add"
            descriptionStyle={tw`underline`}
            seperator={false}
            onDescriptionPress={() =>
              navigate('FormModal', {
                title: 'Work',
                description: null,
                isEditMode: profileData.userInfo.work ? true : false,
                defaultValues: profileData.userInfo.work
                  ? {work: profileData.userInfo.work}
                  : null,
                formData: [
                  {
                    name: 'work',
                    type: 'input',
                    label: 'Enter Work',
                    validation: 'required',
                    inputValue: profileData.userInfo.work,
                    labelFix: profileData.userInfo.work ? true : false,
                  },
                ],
                onSubmit: val => {
                  updateUser.mutate({
                    work: val.work,
                  });
                },
                onUpdate: val => {
                  updateUser.mutate({
                    work: val.work,
                  });
                },
              })
            }
            style={tw`px-5 py-4 border-0 bg-white rounded-b-2xl`}>
            <Text style={tw`bv-med-sm mb-4 capitalize text-grayBorder`}>
              {profileData.userInfo.work}
            </Text>
          </SectionWrapper>
        </>
      ) : null}
    </SafeAreaView>
  );
};

export default EditUserProfile;
