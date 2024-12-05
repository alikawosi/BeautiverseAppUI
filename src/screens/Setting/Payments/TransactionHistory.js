import React from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';
import axios from 'axios';

import tw from '../../../../tailwind';
import {EmptyScreen} from '../../../components/commons';
import {TransactionHistoryCard} from '../../../components/screens/Setting';
import LoadingScreenLayout from '../../../components/commons/LoadingScreenLayout';
import dayjs from 'dayjs';

const TransactionHistory = ({}) => {
  const {navigate, goBack} = useNavigation();

  const getTransactions = useQuery({
    queryFn: () => axios.get('/user/transactions'),
    onError: () => goBack(),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    keepPreviousData: false,
  });

  return getTransactions.isLoading || getTransactions.isFetching ? (
    <LoadingScreenLayout style={tw`bg-background`} />
  ) : (
    <SafeAreaView edges={['bottom']} style={tw`flex bg-background flex-1 pb-4`}>
      {getTransactions.data.length === 0 ? (
        <EmptyScreen
          style={tw`flex-1 bg-background`}
          description={'you have no transaction yet...'}
        />
      ) : (
        <ScrollView contentContainerStyle={tw`justify-start flex-1 py-4 `}>
          {/* <Button
            style={tw`h-auto border border-basicGray rounded-10 py-2 px-3 w-18`}
            icon={<Sort color="#292D32" />}
            containerStyle={tw`mb-4`}
            title={'Sort'}
            titleStyle={tw`bv-sans-xs`}
            onPress={() =>
              navigate('SelectModal', {
                label: 'Sort By',
                options: SETTING_CONST.transactionHistorySortData,
              })
            }
          /> */}
          {getTransactions.data.map(item => {
            return (
              <TransactionHistoryCard
                key={item.id}
                price={item.amount}
                title={item.title}
                date={dayjs(item.created_date * 1000).format('DD MMMM YYYY')}
                type={item.type}
              />
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default TransactionHistory;
