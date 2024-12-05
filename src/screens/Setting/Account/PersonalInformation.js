import React from 'react';
import {Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import dayjs from 'dayjs';
import {useMutation} from 'react-query';
import axios from 'axios';

import tw from '../../../../tailwind';
import {SectionWrapper} from '../../../components/elements';
import {GENERAL_CONST} from '../../../constants';
import {useAuth} from '../../../hooks/useAuth';

import LoadingScreenLayout from '../../../components/commons/LoadingScreenLayout';

const PersonalInformation = () => {
  const auth = useAuth();
  const userInfo = auth.userInfo;
  const updateUser = useMutation({
    mutationFn: data => {
      return axios.post('https://beautiverse.ca/api/beautiverse/user/update', {
        data: JSON.stringify(data),
      });
    },
    onSuccess: () => auth.refetchUser(),
  });
  const {navigate} = useNavigation();

  return (
    <SafeAreaView
      edges={['bottom']}
      style={tw`flex bg-background flex-1 pb-4  `}>
      {updateUser.isLoading ? (
        <LoadingScreenLayout style={tw`bg-background`} />
      ) : (
        <>
          <SectionWrapper
            title="Full Name"
            description="Edit"
            descriptionStyle={tw`underline`}
            onDescriptionPress={() =>
              navigate('FormModal', {
                title: 'Edit Name',
                isEditMode:
                  userInfo.first_name || userInfo.last_name ? true : false,
                formData: [
                  {
                    name: 'firstName',
                    type: 'input',
                    label: 'First Name',
                    validation: 'required',
                    required: true,
                    inputValue: userInfo.first_name,
                    labelFix: userInfo.first_name ? true : false,
                  },
                  {
                    name: 'lastName',
                    type: 'input',
                    required: true,
                    label: 'Last Name',
                    validation: 'required',
                    inputValue: userInfo.first_name,
                    labelFix: userInfo.last_name ? true : false,
                  },
                ],
                defaultValues:
                  userInfo.first_name || userInfo.last_name
                    ? {
                        firstName: userInfo.first_name,
                        lastName: userInfo.last_name,
                      }
                    : null,
                onUpdate: val => {
                  updateUser.mutate({
                    first_name: val.firstName,
                    last_name: val.lastName,
                  });
                },
                onSubmit: val => {
                  updateUser.mutate({
                    first_name: val.firstName,
                    last_name: val.lastName,
                  });
                },
              })
            }
            style={tw`mb-2 bg-white rounded-2xl px-5`}
            seperator={false}
            >
            <Text style={tw`bv-med-sm mb-4 text-grayBorder`}>
              {userInfo.first_name + ' ' + userInfo.last_name}
            </Text>
          </SectionWrapper>

          <SectionWrapper
            title="Gender"
            description="Edit"
            descriptionStyle={tw`underline`}
            onDescriptionPress={() =>
              navigate('SelectModal', {
                type: 'fromBottom',
                options: GENERAL_CONST.GenderData,
                label: 'Gender',
                validation: 'required',
                onSubmit: (val, flag) => {
                  updateUser.mutate({
                    gender: val,
                  });
                },
              })
            }
            style={tw`mb-2 bg-white rounded-2xl px-5`}
            seperator={false}
            >
            <Text style={tw`bv-med-sm mb-4 text-grayBorder capitalize`}>
              {userInfo.gender}
            </Text>
          </SectionWrapper>
          <SectionWrapper
            title="Date Of Birth"
            description="Edit"
            descriptionStyle={tw`underline`}
            onDescriptionPress={() =>
              navigate('DatePickerModal', {
                type: 'center',
                title: 'Date Of Birth',
                value: dayjs(userInfo.birthday).toDate(),
                validation: 'required',
                onSubmit: val => {
                  updateUser.mutate({
                    birthday: val,
                  });
                },
              })
            }
            style={tw`mb-2 bg-white rounded-2xl px-5`}
            seperator={false}>
            <Text style={tw`bv-med-sm mb-4 text-grayBorder`}>
              {dayjs(userInfo.birthday).format('MMM/DD/YYYY')}
            </Text>
          </SectionWrapper>

          {/* <SectionWrapper
        title="Goverment ID"
        description="Edit"
        descriptionStyle={tw`underline`}
        onDescriptionPress={() =>
          navigate('FormModal', {
            title: 'Goverment ID ',
            isEditMode: userInfo.govermentId ? true : false,
            formData: [
              {
                name: 'govermentId',
                type: 'input',
                label: 'Goverment ID ',
                validation: 'none',
                inputValue: userInfo.govermentId,
                labelFix: userInfo.govermentId ? true : false,
                onSubmit: val => {
                  updateUser.mutate({
                    goverment_id: val,
                  });
                },
              },
            ],
          })
        }
        style={tw`mb-2 bg-white rounded-2xl px-5`}
            seperator={false}>
        <Text style={tw`bv-med-sm  text-grayBorder`}>
          {userInfo.govermentId}
        </Text>
      </SectionWrapper> */}
          <SectionWrapper
            title="Email"
            // description="Edit"
            descriptionStyle={tw`underline`}
            // onDescriptionPress={() =>
            //   navigate('FormModal', {
            //     title: 'Email Address',
            //     isEditMode: userInfo.email ? true : false,
            //     defaultValues: userInfo.email
            //       ? {emailAddress: userInfo.email}
            //       : null,
            //     formData: [
            //       {
            //         name: 'emailAddress',
            //         type: 'input',
            //         label: 'Email Address',
            //         validation: 'required',
            //         inputValue: userInfo.email,
            //         labelFix: userInfo.email ? true : false,
            //       },
            //     ],
            //     onUpdate: val => {
            //       updateUser.mutate({
            //         user_email: val.emailAddress,
            //       });
            //     },
            //   })
            // }
            style={tw`mb-2 bg-white rounded-2xl px-5`}
            seperator={false}>
            <Text style={tw`bv-med-sm mb-4 text-grayBorder`}>
              {userInfo.email}
            </Text>
          </SectionWrapper>
          <SectionWrapper
            title="Phone Number"
            // description="Edit"
            descriptionStyle={tw`underline`}
            // onDescriptionPress={() =>
            //   navigate('FormModal', {
            //     title: 'Phone Number ',
            //     isEditMode: userInfo.phone ? true : false,
            //     defaultValues: userInfo.phone
            //       ? {phoneNumber: userInfo.phone}
            //       : null,
            //     formData: [
            //       {
            //         name: 'phoneNumber',
            //         type: 'input',
            //         label: 'Phone Number ',
            //         keyboardType: 'phone-pad',
            //         mask: [
            //           '(',
            //           /\d/,
            //           /\d/,
            //           /\d/,
            //           ')',
            //           ' ',
            //           /\d/,
            //           /\d/,
            //           /\d/,
            //           '-',
            //           /\d/,
            //           /\d/,
            //           /\d/,
            //           /\d/,
            //         ],
            //         maxLength: 14,
            //         validation: 'required',
            //         inputValue: userInfo.phone,
            //         labelFix: userInfo.phone ? true : false,
            //         preffix: (
            //           <Text style={tw`bv-heading-sm mb-4 text-primary mr-2 -mb-1`}>
            //             +1
            //           </Text>
            //         ),
            //       },
            //     ],
            //     onUpdate: val => {
            //       updateUser.mutate({
            //         phone: val.phoneNumber,
            //       });
            //     },
            //   })
            // }
            style={tw`mb-2 bg-white rounded-2xl px-5`}
            seperator={false}>
            <Text style={tw`bv-med-sm mb-4 text-grayBorder`}>
              {userInfo.country_code + userInfo.phone}
            </Text>
          </SectionWrapper>
        </>
      )}
    </SafeAreaView>
  );
};

export default PersonalInformation;
