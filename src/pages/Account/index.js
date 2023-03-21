import { GoogleSignin } from '@react-native-google-signin/google-signin'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ConfirmationDialog, MainLayout, MenuList, ProfileHeader } from '../../components'
import { getProfileAction, logoutAction } from '../../services'

const Account = ({ navigation }) =>
{
    const dispatch = useDispatch()
    const { data: profile } = useSelector(state => state.profile)
    const { data: updateProfile } = useSelector(state => state.updateProfile)

    const confirmationRef = useRef()

    const logoutHandler = async () =>
    {
        dispatch(logoutAction())
        await GoogleSignin.signOut()
    }

    useEffect(() =>
    {
        dispatch(getProfileAction())
    }, [updateProfile.status === 200])

    return (
        <MainLayout>
            <MainLayout.Content bg="transparent" scrollable={false}>
                <ProfileHeader
                    name={profile.name}
                    email={profile.email}
                    bottomSpace={25}
                />
                <MenuList title="Umum" bottomSpace={25}>
                    <MenuList.Item
                        icon="settings"
                        label="Pengaturan"
                        borderBottom
                        next
                        onPress={() => navigation.navigate('Settings')}
                    />
                    <MenuList.Item
                        icon="love"
                        label="Daftar Keinginan"
                        borderBottom
                        next
                        onPress={() => navigation.navigate('Wishlists')}
                    />
                    <MenuList.Item
                        icon="history"
                        label="Riwayat Pesanan"
                        next
                        onPress={() => navigation.navigate('Transactions')}
                    />
                </MenuList>
                <MenuList>
                    <MenuList.Item
                        icon="logout"
                        label="Keluar Akun"
                        onPress={() => confirmationRef.current.open()}
                    />
                </MenuList>
            </MainLayout.Content>

            <ConfirmationDialog
                ref={confirmationRef}
                message={`Apa kamu yakin keluar dari sesi ini? \nUntuk berikutnya kamu perlu login kembali.`}
                onSubmit={{
                    text: 'Keluar',
                    onPress: logoutHandler
                }}
            />
        </MainLayout>
    )
}

export default Account