import React from 'react';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const iconMap: {[key: string]: any} = {
    '0100': require('@/assets/buttonIcons/0100.png'),
    '0200': require('@/assets/buttonIcons/0200.png'),
    '0300': require('@/assets/buttonIcons/0300.png'),
    '0400': require('@/assets/buttonIcons/0400.png'),
    '0500': require('@/assets/buttonIcons/0500.png'),
    '0600': require('@/assets/buttonIcons/0600.png'),
    '0700': require('@/assets/buttonIcons/0700.png'),
    '0800': require('@/assets/buttonIcons/0800.png'),
    '0900': require('@/assets/buttonIcons/0900.png'),
    '1000': require('@/assets/buttonIcons/1000.png'),
    '1100': require('@/assets/buttonIcons/1100.png'),
    '1200': require('@/assets/buttonIcons/1200.png'),
    '1300': require('@/assets/buttonIcons/1300.png'),
    '1500': require('@/assets/buttonIcons/1500.png'),
    '1700': require('@/assets/buttonIcons/1700.png'),
};

const buttonData = [
    {title: '생활편의', iconKey: '0100'},
    {title: '주거환경', iconKey: '0200'},
    {title: '상담/멘토링', iconKey: '0300'},
    {title: '교육', iconKey: '0400'},
    {title: '보건/의료', iconKey: '0500'},
    {title: '농어촌봉사', iconKey: '0600'},
    {title: '문화/체육/예술/관광', iconKey: '0700'},
    {title: '환경/생태계 보호', iconKey: '0800'},
    {title: '사무행정', iconKey: '0900'},
    {title: '지역안전/보호', iconKey: '1000'},
    {title: '인권/공익', iconKey: '1100'},
    {title: '재난/재해', iconKey: '1200'},
    {title: '국제협력/해외봉사', iconKey: '1300'},
    {title: '기타', iconKey: '1500'},
    {title: '자원봉사 기본교육', iconKey: '1700'},
];

function Button({title, iconKey}: {title: string; iconKey: string}) {
    const navigation = useNavigation() as any;
    const handlePress = () => {
        navigation.navigate('volunteerCategory', {category: title, iconKey});
    };

    return (
        <TouchableOpacity className="flex items-center" onPress={handlePress}>
            <View className="items-center justify-center w-12 h-12 rounded-xl bg-bg-gray my-0.0500">
                <Image className="w-8 h-8" source={iconMap[iconKey]} />
            </View>
            <Text className="w-16 text-xs text-center mt-0.5">{title}</Text>
        </TouchableOpacity>
    );
}

function RecommendButtons() {
    const rows = [0, 1, 2].map(row => buttonData.slice(row * 5, row * 5 + 5));
    return (
        <>
            {rows.map((row, i) => (
                <View key={i} className="flex flex-row justify-between px-4 py-0.5">
                    {row.map(btn => (
                        <Button key={btn.iconKey} title={btn.title} iconKey={btn.iconKey} />
                    ))}
                </View>
            ))}
        </>
    );
}

export default function Category() {
    return (
        <BottomSheet
            index={0}
            snapPoints={['12%', '35%']}
            handleIndicatorStyle={{backgroundColor: '#E0E0E0'}}
            style={{
                backgroundColor: '#F5F5F5',
                shadowColor: '#000',
                shadowRadius: 3.84,
                elevation: 30,
            }}>
            <BottomSheetView>
                <RecommendButtons />
            </BottomSheetView>
        </BottomSheet>
    );
}
