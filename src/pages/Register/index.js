import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, FormLayout, Input, Link, Text } from '../../components'
import { useForm } from '../../utils'

const Register = ({ navigation }) =>
{
    const [form, setForm] = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
    })

    const registerHandler = () =>
    {
        alert('Register test')
    }

    return (
        <FormLayout
            title="Daftar"
            desc="Buat akun baru"
            topSpace={100}
        >
            <Input
                placeholder="Nama Lengkap"
                value={form.name}
                onChangeText={value => setForm('name', value)}
                autoCapitalize="none"
                bottomSpace={15}
            />
            <Input
                placeholder="E-mail"
                value={form.email}
                onChangeText={value => setForm('email', value)}
                autoCapitalize="none"
                bottomSpace={15}
            />
            <Input
                placeholder="Kata Sandi"
                value={form.password}
                onChangeText={value => setForm('password', value)}
                autoCapitalize="none"
                secureTextEntry={true}
                bottomSpace={15}
            />
            <Input
                placeholder="Konfirmasi Kata Sandi"
                value={form.password_confirmation}
                onChangeText={value => setForm('password_confirmation', value)}
                autoCapitalize="none"
                secureTextEntry={true}
                bottomSpace={15}
            />
            <Input
                placeholder="Nomor Ponsel / Telepon"
                value={form.phone}
                onChangeText={value => setForm('phone', value)}
                autoCapitalize="none"
                keyboardType="numeric"
                bottomSpace={35}
            />
            <Button
                title="Daftar"
                bottomSpace={15}
                onPress={registerHandler}
            />
            <View style={styles.textWrapper}>
                <Text style={styles.text}>Sudah punya akun? </Text>
                <Link
                    title="Login"
                    textSize={12}
                    onPress={() => navigation.navigate('Login')}
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
    text: { fontSize: 12 }
})

export default Register