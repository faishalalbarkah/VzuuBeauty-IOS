import React from 'react'
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { ILDeliveryCar } from '../../../assets'
import { colors, fonts } from '../../../utils'
import { Gap, Icon, PriceLabel } from '../../atoms'

const SelectCourier = ({ courier, onPress, serviceType, error, errorAnimation, bottomSpace }) =>
{
    return (
        <Animated.View style={styles.container(error, errorAnimation, bottomSpace)}>
            <Pressable
                style={styles.selectCourier}
                onPress={onPress}
            >
                {(typeof courier === 'object' && courier.image !== null && courier.serviceProvide !== null) ? (
                    <View style={styles.textWrapper}>
                        <Image
                            style={styles.image}
                            source={courier.image}
                        />
                        <Text style={styles.text}>
                            {courier.serviceProvider}
                        </Text>
                    </View>
                ) : (
                    <View style={styles.textWrapper}>
                        <Image
                            style={styles.image}
                            source={ILDeliveryCar}
                        />
                        <Text style={styles.text}>
                            Pilih Pengiriman
                        </Text>
                    </View>
                )}
                <Icon name="chevron-forward" size={18} />
            </Pressable>
            {(typeof serviceType === 'object' && serviceType.code !== null && serviceType.cost !== null && serviceType.estimation !== null) && (
                <Pressable
                    style={styles.selectServiceType}
                    onPress={serviceType.onPress}
                >
                    <View>
                        <View style={styles.textWrapper}>
                            <Text style={styles.text}>{serviceType.code}</Text>
                            <Gap width={5} />
                            <PriceLabel value={serviceType.cost} color={colors.text.label} />
                        </View>
                        <Gap height={3} />
                        <Text style={styles.desc}>
                            Estimasi tiba {serviceType.estimation} hari
                        </Text>
                    </View>
                    <Icon name="chevron-forward" size={18} />
                </Pressable>
            )}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: (error, errorAnimation, bottomSpace) => ({
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: error ? colors.error : colors.white,
        borderRadius: 8,
        transform: error ? [{ translateX: errorAnimation }] : undefined,
        marginBottom: typeof bottomSpace === 'number' ? bottomSpace : 0
    }),
    selectCourier:
    {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    image:
    {
        width: 30,
        height: 30,
        marginRight: 15
    },
    textWrapper:
    {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text:
    {
        color: colors.text.label,
        fontFamily: fonts.primary[500],
        fontSize: 12
    },
    desc:
    {
        color: colors.text.label,
        fontFamily: fonts.primary[400],
        fontSize: 12
    },
    selectServiceType:
    {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        borderTopWidth: 1,
        borderTopColor: colors.border
    }
})

export default SelectCourier