import { Ionicons } from '@expo/vector-icons';
import Colors from 'constants/Colors';
import { Stack } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function CallsLayout() {
  return <Stack>
    <Stack.Screen name="index" options={{
        title:'Calls',
        headerLargeTitle:true,
        headerShadowVisible:false,
        headerBlurEffect:'regular',
        headerStyle:{
            backgroundColor: Colors.background,
        },
        headerSearchBarOptions:{
            placeholder:'Search',
            headerIconColor:Colors.primary,
        },
        headerRight:()=>(
          <TouchableOpacity>
            <Ionicons name='call-outline' color={Colors.primary} size={23} className='p-2'/>
          </TouchableOpacity>
        )


        
    }}/>
  </Stack>
}
