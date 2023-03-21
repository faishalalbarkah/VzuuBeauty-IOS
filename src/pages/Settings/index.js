import React from 'react'
import { Header, MainLayout, MenuList } from '../../components'

const Settings = ({ navigation }) =>
{
    return (
        <MainLayout>
            <Header
                title="Pengaturan"
                goBack={navigation.goBack}
                goBackWidth={30}
            />
            <MainLayout.Content bg="transparent" scrollable={false}>
                <MenuList>
                    <MenuList.Item
                        icon="pencil"
                        label="Ubah Profil"
                        borderBottom
                        next
                        onPress={() => navigation.navigate('EditProfile')}
                    />
                    <MenuList.Item
                        icon="key"
                        label="Ubah Kata Sandi"
                        borderBottom
                        next
                        onPress={() => navigation.navigate('ChangePassword')}
                    />
                    <MenuList.Item
                        icon="store-front"
                        label="Daftar Alamat"
                        next
                        onPress={() => navigation.navigate('Address')}
                    />
                </MenuList>
            </MainLayout.Content>
        </MainLayout>
    )
}

export default Settings