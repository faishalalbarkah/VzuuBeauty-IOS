import React, { forwardRef } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { colors, fonts } from '../../../utils'
import { Button, Gap, Text } from '../../atoms'

const ConfirmationDialog = forwardRef(({ title, message, onClose, onSubmit }, ref) =>
{
    return (
        <RBSheet
            ref={ref}
            height={200}
            closeOnDragDown={true}
            closeOnPressMask={true}
            onClose={onClose}
            customStyles={{ container: styles.container }}
        >
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>{title ? title : 'Konfirmasi'}</Text>
            </View>
            <ScrollView style={styles.wrapper}>
                {message && <Text style={styles.message}>{message}</Text>}
                <View style={styles.buttonWrapper}>
                    <View style={styles.button}>
                        <Button
                            title="Batal"
                            variant="small"
                            onPress={() => ref.current.close()}
                        />
                    </View>
                    <Gap width={10} />
                    <View style={styles.button}>
                        <Button
                            title={typeof onSubmit === 'function' ? 'Ya' : onSubmit.text}
                            variant="small-outlined"
                            onPress={typeof onSubmit === 'function' ? onSubmit : onSubmit.onPress}
                        />
                    </View>
                </View>
            </ScrollView>
        </RBSheet>
    )
})

const styles = StyleSheet.create({
    container:
    {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    titleWrapper:
    {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 10,
        paddingHorizontal: 5,
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.border
    },
    title:
    {
        fontFamily: fonts.primary[500],
        fontSize: 16
    },
    wrapper: { padding: 15 },
    message:
    {
        color: colors.text.label,
        fontSize: 14,
        lineHeight: 19,
        marginBottom: 15,
        textAlign: 'center'
    },
    buttonWrapper:
    {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button: { width: '42%' }
})

export default ConfirmationDialog