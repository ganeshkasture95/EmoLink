import Colors from 'constants/Colors';
import { Stack } from 'expo-router';
import React from 'react';

export default function componentName() {
  return <Stack>
    <Stack.Screen name='index'options={{
        title:'Settings',
        headerLargeTitle:true,
        headerShadowVisible:false,
        headerStyle:{
            backgroundColor: Colors.background,

        },
        headerSearchBarOptions:{
            placeholder:'Search',
            headerIconColor:Colors.primary,
            
        }

        
    }}/>
  </Stack>
}
