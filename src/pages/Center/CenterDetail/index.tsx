import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {toggleCenterLike} from '@/store/slice/likedCenterSlice';

import {ChildrenCenterList} from '@/types/ChildrenCenter';
import {useCenter} from '@/hook/api/useCenter';
import {useVolunteerCenterName} from '@/hook/api/useVolunteerData';

import {KakaoMapAddress} from '@/components/KakaoMap';
import {ColWrapper} from '@/components/layout/ContentWrapper';
import Layout from '@/components/Layout';
import DonationStatus from './components/DonationStatus';
import HeaderBackButton from '@/components/button/HeaderBackButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loading from '@/components/Loading';
import List from './components/List';
import Activity from './components/Activity';

export default function CenterDetail() {
    const navigation = useNavigation() as any;
    const route = useRoute();
    const dispatch = useDispatch();

    const {centerData, loading} = useCenter(180);
    const {id} = route.params as {id: string};

    const data = centerData.find((item: ChildrenCenterList) => item.id === id);
    const likedList = useSelector((state: any) => state.likedCenter.likedList);
    const {items, loading: activityLoading} = useVolunteerCenterName(data?.centerName);

    const isLiked = data ? likedList.some((item: ChildrenCenterList) => data.centerName === item.centerName) : false;
    const handleLikeToggle = () => {
        if (data) {
            dispatch(
                toggleCenterLike({
                    ...data,
                }),
            );
        }
    };
    if (loading || activityLoading) return <Loading />;

    return (
        <>
            <View className="flex flex-row justify-between items-center px-4">
                <HeaderBackButton className="flex-1">{data?.centerName}</HeaderBackButton>
                <TouchableOpacity
                    className={`flex flex-row items-center px-2 py-1 rounded-2xl ${isLiked ? 'bg-main-color' : 'border border-main-color'}`}
                    onPress={handleLikeToggle}>
                    <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={20} color={isLiked ? '#FFFFFF' : '#FFB257'} />
                    <Text className={`ml-1 font-semibold ${isLiked ? 'text-white' : 'text-main-color'}`}>팔로우</Text>
                </TouchableOpacity>
            </View>

            <Layout>
                {data && <KakaoMapAddress className="w-full h-[240px]" location={data.address} name={data.centerName} />}

                <ColWrapper title="오시는 길">
                    <Text className="text-base font-semibold text-font-black">
                        {data?.address}
                        {data?.distance !== Infinity && data?.distance
                            ? ` (${data.distance >= 1000 ? `${(data.distance / 1000).toFixed(1)}km` : `${data.distance.toFixed(0)}m`})`
                            : ''}
                    </Text>
                </ColWrapper>

                <DonationStatus />

                <Activity items={items} />
                <List />
            </Layout>

            <View className="flex flex-row justify-between px-8 py-6 border-t border-bg-gray">
                <TouchableOpacity
                    className="w-[150px] bg-main-color py-3 rounded-xl flex flex-row items-center justify-center gap-2"
                    onPress={() => navigation.navigate('remittance', {name: data?.centerName})}>
                    <Image className="w-6 h-6" source={require('@/assets/getCash.png')} />
                    <Text className="text-base font-bold text-center text-white">기부하기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="w-[150px] bg-font-black py-3 rounded-xl flex flex-row items-center justify-center gap-2"
                    onPress={() => navigation.goBack()}>
                    <Image className="w-6 h-6" source={require('@/assets/chatIcon.png')} />
                    <Text className="text-base font-bold text-center text-white">채팅하기</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}
