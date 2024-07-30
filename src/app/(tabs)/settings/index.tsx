import React from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';

import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import BoxedIcon from 'components/BoxedIcon';
import Colors from 'constants/Colors';
import { defaultStyles } from 'constants/Styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function SettingsScreen() {

  const devices = [
    {
      name: 'Broadcast Lists',
      icon: 'megaphone',
      backgroundColor: Colors.green,
    },
    {
      name: 'Starred Messages',
      icon: 'star',
      backgroundColor: Colors.yellow,
    },
    {
      name: 'Linked Devices',
      icon: 'laptop-outline',
      backgroundColor: Colors.green,
    },
  ];
  const items = [
    {
      name: 'Account',
      icon: 'key',
      backgroundColor: Colors.blue,
    },
    {
      name: 'Privacy',
      icon: 'lock-closed',
      backgroundColor: Colors.purple,
    },
    {
      name: 'Chats',
      icon: 'chatbubbles',
      backgroundColor: Colors.orange,
    },
    {
      name: 'Notifications',
      icon: 'notifications',
      backgroundColor: Colors.pink,
    },
    {
      name: 'Data and storage',
      icon: 'cloud',
      backgroundColor: Colors.gray,
    },
  
  ];

  const support =[
    {
      name: 'Help',
      icon: 'help-circle',
      backgroundColor: Colors.green,
    },
    {
      name: 'About',
      icon: 'information-circle',
      backgroundColor: Colors.yellow,
    },
  ]

  const { signOut } = useAuth()


  return (
    <View className='flex-1 bg-background'>
      <ScrollView contentInsetAdjustmentBehavior='automatic'>
        <View style={defaultStyles.block} >
          <FlatList 
          data={devices} 
          scrollEnabled={false}
          ItemSeparatorComponent={()=><View style={defaultStyles.separator}/>}
          renderItem={({ item }) => (
            <View style={defaultStyles.item}>
              <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor}/>
              <Text className=' flex-1 text-xl'> {item.name}</Text>
              <Ionicons name='chevron-forward' size={20} color={Colors.gray}/>
            </View>
          )} />
        </View>

        <View style={defaultStyles.block} >
          <FlatList 
          data={items} 
          scrollEnabled={false}
          ItemSeparatorComponent={()=><View style={defaultStyles.separator}/>}
          renderItem={({ item }) => (
            <View style={defaultStyles.item}>
              <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor}/>
              <Text className=' flex-1 text-xl'> {item.name}</Text>
              <Ionicons name='chevron-forward' size={20} color={Colors.gray}/>
            </View>
          )} />
        </View>

        <View style={defaultStyles.block} >
          <FlatList 
          data={support} 
          scrollEnabled={false}
          ItemSeparatorComponent={()=><View style={defaultStyles.separator}/>}
          renderItem={({ item }) => (
            <View style={defaultStyles.item}>
              <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor}/>
              <Text className=' flex-1 text-xl'> {item.name}</Text>
              <Ionicons name='chevron-forward' size={20} color={Colors.gray}/>
            </View>
          )} />
        </View>

        <TouchableOpacity onPress={()=>signOut()}>
          <Text className='text-primary text-xl text-center py-10 '>
            Log Out
          </Text>

        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}
