import { isClerkAPIResponseError, useSignUp } from '@clerk/clerk-expo';
import { useSignIn } from '@clerk/clerk-react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
// import { StyleSheet } from 'nativewind';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaskInput from 'react-native-mask-input';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function Page() {

    const [loading, setLoading] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const router = useRouter()

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0
    const { bottom } = useSafeAreaInsets()

    const { signUp, setActive } = useSignUp()
    const { signIn } = useSignIn()

    const openLink = () => {
        Linking.openURL("")
    }

    // const sendOTP = async () => {
    //     console.log('sendOTP', phoneNumber);
    //     setLoading(true)
    //     try {

    //         await signUp!.create({
    //             phoneNumber
    //         })

    //         signUp!.preparePhoneNumberVerification();

    //         router.push(`/verify/${phoneNumber}?signin=true`)

    //         setLoading(false)

    //     } catch (err) {
    //         console.log(err)

    //         if (isClerkAPIResponseError(err)) {
    //             if (err.errors[0].code === 'form_identifiet_exists') {
    //                 console.log('use exists')
    //                 await trySignIn();
    //             }
    //             else {
    //                 setLoading(false)
    //                 Alert.alert('Error', err.errors[0].message)

    //             }
    //         }

    //     }
    // }


    const sendOTP = async () => {
        console.log('sendOTP', phoneNumber);
        setLoading(true);

        try {
            await signUp!.create({
                phoneNumber,
            });
            console.log('TESafter createT: ', signUp!.createdSessionId);

            signUp!.preparePhoneNumberVerification();

            console.log('after prepare: ');
            router.push(`/verify/${phoneNumber}`);
        } catch (err) {
            console.log('error', JSON.stringify(err, null, 2));

            if (isClerkAPIResponseError(err)) {
                if (err.errors[0].code === 'form_identifier_exists') {
                    // User signed up before
                    console.log('User signed up before');
                    await trySignIn();
                } else {
                    setLoading(false);
                    Alert.alert('Error', err.errors[0].message);
                }
            }
        }
    };

    const trySignIn = async () => {

        console.log('trySignIn', phoneNumber);

        const { supportedFirstFactors } = await signIn!.create({
            identifier: phoneNumber

        })
        const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => {
            return factor.strategy === 'phone_code'
        });

        const { phoneNumberId } = firstPhoneFactor

        await signIn!.prepareFirstFactor({
            strategy: 'phone_code',
            phoneNumberId
        })

        router.push(`/verify/${phoneNumber}?signin=true`)
        setLoading(false)
    }


    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset} className='flex flex-col'>
            <View className='items-center p-4 gap-3'>

                {loading && (
                    <View className='bg-white my-8 justify-center items-center'>
                        <ActivityIndicator size='large' className=' text-primary z-10 '
                            style={[StyleSheet.absoluteFill, styles.loading]} />
                    </View>
                )}

                <Text>WhatsApp will need to verify your account. Carrier changes may apply.</Text>
                <View className='flex gap-2 bg-white w-full p-4 rounded-md '>
                    <View className='flex-row justify-between px-2'>
                        <Text className=' text-2xl text-primary'>India</Text>
                        <Ionicons name='chevron-forward' size={24} className=' opacity-50' />
                    </View>
                    <View className='h-[3px] w-full bg-gray opacity-40 rounded-lg ' />

                    <MaskInput
                        value={phoneNumber}
                        keyboardType='numeric'
                        autoFocus
                        onChangeText={(masked, unmasked) => {
                            setPhoneNumber(masked); // you can use the unmasked value as well

                            // assuming you typed "9" all the way:
                            // console.log(masked); // (99) 99999-9999
                            // console.log(unmasked); // 99999999999
                        }}
                        mask={['+', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                        placeholder='+91 Your Phone Number Here'
                        className=' w-full h-10 text-xl'
                    />

                </View>
                <Text className="text-gray-500 text-center px-10 py-5">You must be <Text className=" text-primary" onPress={openLink}>at least 16 years old </Text>to register. Learn how Honny works with the<Text className=" text-primary" onPress={openLink}> GKMeta Companies</Text>
                </Text>

                {/* <View className='flex-1'/> */}

                <TouchableOpacity onPress={sendOTP} style={[
                    styles.button,
                    phoneNumber !== '' ? styles.enabled : null,
                    { marginBottom: bottom }
                ]}>
                    <Text className=' text-gray font-bold text-2xl' style={[

                        phoneNumber !== '' ? styles.enabled : null
                    ]}>
                        Next
                    </Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    );


}

const styles = StyleSheet.create({
    enabled: {
        backgroundColor: '#1063FD',
        color: 'white'
    },
    button: {

        width: '100%',
        alignItems: 'center',
        backgroundColor: '#DCDCE2',
        padding: 10,
        borderRadius: 10,

    },
    loading: {
        zIndex: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },

});