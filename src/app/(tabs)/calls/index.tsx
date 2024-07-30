import { Ionicons } from '@expo/vector-icons';
import Colors from 'constants/Colors';
import { defaultStyles } from 'constants/Styles';
import { formatDate } from 'date-fns';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import calls from '../../../../assets/data/calls.json';

export default function CallsScreen() {

  const [items, setItems] = useState(calls)

  const [isEditing, setIsEditing] = useState(false)
  const onEdit = () => {
    let editingNew = !isEditing
    setIsEditing(editingNew)

  }
  return (
    <View className='flex-1 bg-background'>
      <Stack.Screen options={
        {
          headerLeft: () => (
            <TouchableOpacity onPress={onEdit}>
              <Text className=' text-primary text-xl px-2'>
                {isEditing ? 'Done' : 'Edit'}
              </Text>
            </TouchableOpacity>
          )
        }
      } />

      <ScrollView contentInsetAdjustmentBehavior='automatic' className='pb-4'>

        <View style={defaultStyles.block} >
          <FlatList
            data={items}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View className='flex-row p-3 gap-4'>
                <Image source={{ uri: item.img }} className='w-10 h-10 rounded-full' />

                <View className=' flex-1 gap-2'>
                  <Text style={{ fontSize: 14, color: item.missed ? Colors.red : '#000' }}>
                    {item.name}
                  </Text>


                  <View style={{ flexDirection: 'row', gap: 4 }}>
                    <Ionicons
                      name={item.video ? 'videocam' : 'call'}
                      size={16}
                      color={Colors.gray}
                    />
                    <Text style={{ color: Colors.gray, flex: 1 }}>
                      {item.incoming ? 'Incoming' : 'Outgoing'}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    gap: 6,
                    alignItems: 'center',
                  }}>
                  <Text style={{ color: Colors.gray }}>{formatDate(item.date, 'MM.dd.yy')}</Text>
                  <Ionicons
                    name="information-circle-outline"
                    size={24}
                    color={Colors.primary}
                  />
                </View>


              </View>
            )} />
        </View>


              <View style={defaultStyles.block}/>
      </ScrollView>
    </View>
  );
}
