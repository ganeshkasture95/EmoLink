import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

export type BoxedIconProps ={
    name:typeof Ionicons.defaultProps;
    backgroundColor:string;
}

export default function BoxedIcon({name,backgroundColor}:BoxedIconProps) {
  return (
    <View style={{backgroundColor,padding:4,borderRadius:6}}>
      <Ionicons name={name} size={23} color='white'/>
     </View>
  );
}
