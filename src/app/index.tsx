import React from "react";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";

import { Link } from "expo-router";
import welcomeImage from '../../assets/images/welcome.png';
const welcome_image = Image.resolveAssetSource(welcomeImage)

export default function Page() {

  const openLink = () => {
      Linking.openURL("")
  }

  return (
    <View className="flex flex-1 items-center py-10  bg-white  ">
      <Image source={welcome_image} className=" my-20 w-full h-1/2 " />
      <Text className="font-bold  text-3xl">Welcome to Honny</Text>
      <Text className="text-gray-500 text-center px-10 py-5">Read our <Text className=" text-primary" onPress={openLink}>Privacy Policy</Text>. Tap "Agree & Continue" to accept the <Text className=" text-primary" onPress={openLink}>Terms of Service.</Text>
      </Text>

{/* The replace will not let the screen to go back  */}
      {/* <Link href={'/otp'} replace asChild> */}
      <Link href={'/otp'}  asChild>
        <TouchableOpacity>
          <Text className="bg-white text-primary text-2xl font-bold text-center rounded-lg px-4 py-2 mt-10">Agree & Continue</Text>
        </TouchableOpacity>
      </Link>


    </View>
  );
}