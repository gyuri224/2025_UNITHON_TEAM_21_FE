import React, { useState, useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCenterLike } from '@/store/slice/likedCenterSlice';
import { RootState } from '@/store';

import { ChildrenCenterList } from '@/types/ChildrenCenter';
import { useCenter } from '@/hook/api/useCenter';

import { KakaoMapAddress } from '@/components/KakaoMap';
import { ColWrapper } from '@/components/layout/ContentWrapper';
import Layout from '@/components/Layout';
import DonationStatus from './components/DonationStatus';
import Loading from '@/components/Loading';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CenterDetail() {
  const navigation = useNavigation() as any;
  const route = useRoute();
  const dispatch = useDispatch();

  const { centerData, loading } = useCenter(180);
  const { id } = route.params as { id: string };
  const data = centerData?.find((item: ChildrenCenterList) => item.id === id);

  // 좋아요 리스트 가져오기
  const likedList = useSelector((state: RootState) => state.likedCenter.likedList);

  // 이 센터가 좋아요 상태인지 확인
  const isLiked = data
    ? likedList.some(item => item.centerName === data.centerName)
    : false;

  // 하트 버튼 클릭 처리
  const handleLikeToggle = () => {
    if (data) {
      dispatch(
        toggleCenterLike({
          ...data
        })
      );
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <View className="flex-row items-center justify-between px-4 py-4">
        <View className="flex-row items-center flex-1">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('@/assets/navi.png')}
              className="w-8 h-8"
            />
          </TouchableOpacity>
          <Text
            className="flex-1 text-xl font-bold text-font-black"
            numberOfLines={1}
          >
            {data?.centerName}
          </Text>
        </View>
        <TouchableOpacity onPress={handleLikeToggle}>
          {isLiked ? (
            <Ionicons name="heart" size={30} color={'#FFB257'} />
          ) : (
            <Ionicons name="heart-outline" size={30} color={'#FFB257'} />
          )}
        </TouchableOpacity>
      </View>

      <Layout>
        {data && (
          <KakaoMapAddress
            className="w-full h-[240px]"
            location={data.address}
            name={data.centerName}
          />
        )}

        <ColWrapper title="오시는 길">
          <Text className="text-base font-semibold text-font-black">
            {data?.address}
          </Text>
        </ColWrapper>

        <ColWrapper title="기부 현황">
          <DonationStatus />
        </ColWrapper>

        <ColWrapper title="센터소식">
          <Text className="text-base font-semibold text-font-black" numberOfLines={1}>
            2025.05.20 센터소식
          </Text>
          <Text className="text-base font-semibold text-font-black" numberOfLines={1}>
            2025.04.25 센터소식
          </Text>
          <Text className="text-base font-semibold text-font-black" numberOfLines={1}>
            2025.04.19 센터소식
          </Text>
        </ColWrapper>
      </Layout>

      <View className="flex flex-row justify-between px-8 py-6 border-t border-bg-gray">
        <TouchableOpacity
          className="w-[150px] bg-main-color py-3 rounded-xl flex flex-row items-center justify-center gap-2"
          onPress={() => navigation.navigate('remittance', { name: data?.centerName })}
        >
          <Image className="w-6 h-6" source={require('@/assets/getCash.png')} />
          <Text className="text-base font-bold text-center text-white">기부하기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-[150px] bg-font-black py-3 rounded-xl flex flex-row items-center justify-center gap-2"
          onPress={() => navigation.goBack()}
        >
          <Image className="w-6 h-6" source={require('@/assets/chatIcon.png')} />
          <Text className="text-base font-bold text-center text-white">채팅하기</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
