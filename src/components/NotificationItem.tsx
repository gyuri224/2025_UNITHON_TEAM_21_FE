import React from 'react';
import { View, Text, Image } from 'react-native';

interface NotificationItemProps {
  type: string;
  message: string;
  time: string;
  icon: string; // 예: 'gift', 'calendar', 'note'
  subtext?: string;
}

const ICON_MAP: Record<string, any> = {
  추천봉사: require('@/assets/recommend.png'),
  봉사일정: require('@/assets/calender.png'),
  기부: require('@/assets/thanksdonate.png'),
};

export default function NotificationItem({ type, message, time, subtext }: NotificationItemProps) {
  return (
    <View className="flex-row items-start mb-4">
      {/* 아이콘 */}
      <Image source={ICON_MAP[type]} className="w-8 h-8 mr-3" />

      {/* 메시지 */}
      <View className="flex-1">
        <View className="flex-row justify-between items-start">
          <Text className="text-[13px] text-gray-400">{type}</Text>
          <Text className="text-[12px] text-gray-400">{time}</Text>
        </View>
        <Text className="text-[14px] mt-1">{message}</Text>
        {subtext && <Text className="text-[12px] font-bold mt-1">{subtext}</Text>}
      </View>
    </View>
  );
}
