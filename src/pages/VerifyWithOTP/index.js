import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ILVerifyAccount } from '../../assets'
import { Button, FormLayout, Link, Text } from '../../components'
import { useForm } from '../../utils'

const VerifyWithOTP = ({ navigation }) =>
{
    const [form, setForm] = useForm({
        email: '',
        password: ''
    })

    const verifyAccountHandler = () =>
    {
        alert('Login test')
    }

    return (
        <FormLayout
            svgImage={{ 
                component: <ILVerifyAccount width={155} height={155} />,
                wrapperStyle: styles.svgImageWrapper
            }}
            title="Verifikasi Akunmu"
            desc={`Silakan masukkan 6 digit kode yang dikirimkan ke akun@email.com`}
        >
            <Button
                title="Konfirmasi"
                bottomSpace={15}
                onPress={verifyAccountHandler}
            />
            <View style={styles.textWrapper}>
                <Text style={styles.text}>Tidak menerima kodenya? </Text>
                <Link
                    title="Kirim ulang"
                    textSize={12}
                    onPress={() => alert('Test ok')}
                />
            </View>
        </FormLayout>
    )
}

const styles = StyleSheet.create({
    textWrapper:
    {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    text: { fontSize: 12 },
    svgImageWrapper: { paddingVertical: 25 }
})

export default VerifyWithOTP