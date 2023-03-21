import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { Card, Text } from '../../atoms'
import { ILAvatar } from '../../../assets'
import { colors, fonts } from '../../../utils'

const ProfileHeader = ({ name, email, bottomSpace }) =>
{
    return (
        <Card bg="#F3E1E1" bottomSpace={bottomSpace} flexDir="row" padding={20}>
            <Image source={ILAvatar} style={styles.image} />
            <View>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.email}>{email}</Text>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    image:
    {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        borderWidth: 3,
        borderColor: colors.white,
        marginRight: 15
    },
    name:
    {
        color: '#555555',
        fontFamily: fonts.primary[500],
        fontSize: 16,
        marginBottom: 2
    },
    email:
    {
        color: '#3b3c3d',
        fontSize: 12
    }
})

export default ProfileHeader