import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';




export default function HomePage() {
    const CELL_COUNT = 6;
    const { phone, signin } = useLocalSearchParams<{ phone: string, signin: string }>()
    const [code, setCode] = useState('')
    const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: code,
        setValue: setCode,
    });

    useEffect(() => {
        if (code.length === 6) {
           
            if(signin ==='true'){
                verifySignIn()
            }else{
                verifyCode()
            }

        }
    }, [code])

    const verifyCode = async () => {
    }
    const verifySignIn = async () => {

    }
    const resendCode = async () => {

    }




    return (
        <View className='flex-1 p-4 pt-4 items-center bg-background gap-4 mx-1'>

            <Stack.Screen options={{ title: phone }} />

            <Text className=' text-xl' >We have sent you an SMS with a code to the number above.</Text>
            <Text className='text-xl'>TO complete your phone number verification. please enter the 6-digit activation code.
            </Text>


            <CodeField
                ref={ref}
                {...props}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={code}
                onChangeText={setCode}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
                testID="my-code-input"
                renderCell={({ index, symbol, isFocused }) => (
                    <View
                        key={index}
                        style={[styles.cellRoot, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                            <Text style={styles.cellText}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    </View>
                )}
            />


            <TouchableOpacity onPress={resendCode}>
                <Text className='text-xl font-semibold text-primary'> Don't receive a verification code?</Text>
            </TouchableOpacity>


        </View>
    )
}

const styles = StyleSheet.create({
    loading: {
        zIndex: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    root: { flex: 1, padding: 20 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { marginTop: 20, 
        gap:8
    },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#1063FD',
    },
    cellRoot: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    cellText: {
        color: '#6E6E73',
        fontSize: 36,
        textAlign: 'center',
    },
    // focusCell: {
    //     paddingBottom: 4,
    //     borderBottomColor: '#000',
    //     borderBottomWidth: 2,
    // },
}); 