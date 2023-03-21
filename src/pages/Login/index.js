import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ILLogo } from '../../assets'
import { Button, FormLayout, Input, Link, Loading, Text } from '../../components'
import { loginAction } from '../../services'
import { colors, useForm } from '../../utils'

const Login = ({ navigation }) =>
{
    const [form, setForm] = useForm({
        email: '',
        password: ''
    })

    const dispatch = useDispatch()
    const { errors, isLoading } = useSelector(state => state.login)

    const loginHandler = () =>
    {
        const res = { succeed: () => setForm('reset') }

        dispatch(loginAction(form, res))
    }

    const googleSigninHandler = async () =>
    {
        try
        {
            await GoogleSignin.hasPlayServices()
            const userInfo = await GoogleSignin.signIn()

            const userAccount = {
                google_code: userInfo.user.id,
                name: userInfo.user.name,
                email: userInfo.user.email,
                type: 'google-signin'
            }

            dispatch(loginAction(userAccount))
        }
        catch(error)
        {
            if(error.code === statusCodes.SIGN_IN_CANCELLED)
            {
                console.log('User cancelled the login flow.')
            }
            else if(error.code === statusCodes.IN_PROGRESS)
            {
                console.log('Operation (e.g. sign in) is in progress already.')
            }
            else if(error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE)
            {
                console.log('Play services not available or outdated.')
            }
            else
            {
                console.log('Error:', error)
                console.log('Some other error happened.')
            }
        }
    }

    const signOut = async () =>
    {
        try
        {
            await GoogleSignin.revokeAccess()
            await GoogleSignin.signOut()
        }
        catch(error)
        {
            console.error(error)
        }
    }

    const getCurrentUser = async () =>
    {
        const currentUser = await GoogleSignin.getCurrentUser()

        if(currentUser && currentUser.user) signOut()
    }

    useEffect(() =>
    {
        GoogleSignin.configure({
            scopes: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
            ],
            ClientId: '872852720653-tucbsoc4t76sggqi7r8hun5mcgp8h71t.apps.googleusercontent.com',
            iosClientId: '872852720653-02l4mpmijqurqm1erfve68p4eel5cbfe.apps.googleusercontent.com'
        })

        getCurrentUser()
    }, [])

    return (
        <>
            <FormLayout
                image={ILLogo}
                title="Login"
                desc="Pesan dan dapatkan harga reseller"
            >
                <Input
                    placeholder="E-mail"
                    value={form.email}
                    onChangeText={value => setForm('email', value)}
                    autoCapitalize="none"
                    errorMessage={errors.email && errors.email.msg && errors.email.msg.id}
                    bottomSpace={15}
                />
                <Input
                    placeholder="Kata Sandi"
                    value={form.password}
                    onChangeText={value => setForm('password', value)}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    errorMessage={errors.password && errors.password.msg && errors.password.msg.id}
                    bottomSpace={10}
                />
                <Link
                    title="Lupa kata sandi"
                    textSize={12}
                    bottomSpace={35}
                    onPress={() => navigation.navigate('RequestResetPassword')}
                />
                <Button
                    title="Login"
                    bottomSpace={15}
                    onPress={loginHandler}
                />
                <View style={styles.separator}>
                    <View style={styles.lineSeparator} />
                    <Text style={styles.textSepartor}>Atau</Text>
                </View>
                <Button
                    variant="google-button"
                    bottomSpace={30}
                    onPress={googleSigninHandler}
                />
                <View style={styles.textWrapper}>
                    <Text style={styles.text}>Belum punya akun? </Text>
                    <Link
                        title="Daftar"
                        textSize={12}
                        onPress={() => navigation.navigate('Register')}
                    />
                </View>
            </FormLayout>
            {isLoading && <Loading />}
        </>
    )
}

const styles = StyleSheet.create({
    separator:
    {
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginBottom: 15
    },
    lineSeparator:
    {
        borderBottomWidth: 1,
        borderBottomColor: colors.border
    },
    textSepartor:
    {
        position: 'absolute',
        top: 7,
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        alignSelf: 'center'
    },
    textWrapper:
    {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    text: { fontSize: 12 }
})

export default Login