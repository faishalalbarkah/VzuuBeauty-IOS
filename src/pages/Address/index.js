import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, BottomSection, Button, ConfirmationDialog, EmptyData, Gap, Header, Icon, Loading, MainLayout, SelectableCardList, Text } from '../../components'
import { deleteAddressAction, getAddressAction, getDefaultAddressAction, updateAddressAction } from '../../services'
import { colors, fonts, showError, showSuccess, truncate } from '../../utils'

const Address = ({ navigation }) =>
{
    const [addressList, setAddressList] = useState(null)
    const [isFirstLoad, setIsFirstLoad] = useState(true)
    const [form, setForm] = useState(null)

    const dispatch = useDispatch()
    const { isLoading } = useSelector(state => state.addressList)
    const { data: defaultAddress } = useSelector(state => state.defaultAddress)
    const { data: createAddress } = useSelector(state => state.createAddress)
    const { data: updateAddress } = useSelector(state => state.updateAddress)
    const { data: deleteAddress } = useSelector(state => state.deleteAddress)

    const confirmationRef = useRef()

    const onChange = value =>
    {
        if(value.id === defaultAddress[0].id) return setForm(null)

        setForm({
            id: value.id,
            type: value.type,
            name: value.name,
            phone: value.phone_number,
            province_id: value.province_id,
            city_id: value.city_id,
            subdistrict_id: value.subdistrict_id,
            address: value.address,
            main_address: 'true'
        })
    }

    const openDeleteConfirmation = (id, type, name) =>
    {
        confirmationRef.current.open()
        setForm({ id, type, name })
    }

    const getAddressListHandler = () =>
    {
        const res = {
            succeed: result =>
            {
                setAddressList(result)
                if(isFirstLoad) setIsFirstLoad(false)
            }
        }

        dispatch(getAddressAction(null, res))
        dispatch(getDefaultAddressAction())
    }

    const setAddressHandler = () =>
    {
        const res = {
            succeed: result =>
            {
                showSuccess((result && result.message && result.message.id) ? result.message.id : 'Success.')
                setForm(null)
            },
            failed: error =>
            {
                showError((error && error.message && error.message.id) ? error.message.id : 'Failed.')
                setForm(null)
            }
        }
    
        dispatch(updateAddressAction(form, res))
    }

    const deleteAddressHandler = () =>
    {
        const res = {
            succeed: result =>
            {
                confirmationRef.current.close()
                showSuccess((result && result.message && result.message.id) ? result.message.id : 'Success.')
            },
            failed: error =>
            {
                confirmationRef.current.close()
                showError((error && error.message && error.message.id) ? error.message.id : 'Failed.')
            }
        }
    
        dispatch(deleteAddressAction({ id: form.id }, res))
    }

    useEffect(() =>
    {
        getAddressListHandler()
    }, [createAddress.code === 200, updateAddress.code === 200, deleteAddress.statusCode === 200])

    return (
        <MainLayout>
            <Header
                title="Daftar Alamat"
                goBack={navigation.goBack}
                goBackWidth={30}
            />
            {(isLoading && isFirstLoad) && (<Loading type="inner" bg="transparent" />)}
            {addressList && (
                <>
                    <MainLayout.Content bg="transparent" scrollable={addressList.length > 0 ? true : false}>
                        {addressList.length > 0 ? (
                            <SelectableCardList
                                data={addressList}
                                currentActive={defaultAddress && defaultAddress[0].id}
                                renderItem={(item, index) => (
                                    <SelectableCardList.Item
                                        value={item}
                                        bottomSpace={(index+1) !== addressList.length ? 15 : 0}
                                        onPress={val => onChange(val)}
                                        key={index}
                                    >
                                        <View style={styles.content}>
                                            <View style={styles.wrapper}>
                                                <Text style={styles.label}>{item.type}</Text>
                                                {item.default === 'true' && <Badge text="Utama" variant="small" leftSpace={10} />}
                                            </View>
                                            <Text style={styles.headerText} bottomSpace={3}>{item.name}</Text>
                                            <Text style={styles.text} bottomSpace={3}>{item.phone_number}</Text>
                                            <Text style={styles.text}>{truncate(item.address, 35)}</Text>
                                        </View>
                                        <View style={styles.actionGroup}>
                                            <TouchableOpacity
                                                style={styles.button}
                                                onPress={() =>
                                                {
                                                    delete item.setActive
                                                    navigation.navigate('EditAddress', { address: item })
                                                }}
                                            >
                                                <Icon name="pencil" size={18} />
                                            </TouchableOpacity>
                                            <Gap height={10} />
                                            {item.default !== 'true' && (
                                                <TouchableOpacity
                                                    style={styles.button}
                                                    onPress={() => openDeleteConfirmation(item.id, item.type, item.name)}
                                                >
                                                    <Icon name="trash-bin" size={18} />
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                    </SelectableCardList.Item>
                                )}
                            />
                        ) : (
                            <View style={styles.emptyData}>
                                <EmptyData
                                    type="address"
                                    message="Alamat belum ditambahkan."
                                    topSpace={-150}
                                    bottomSpace={25}
                                />
                                <View style={styles.callToAction}>
                                    <Button
                                        title="+ Tambah Alamat"
                                        onPress={() => navigation.navigate('AddNewAddress')}
                                    />
                                </View>
                            </View>
                        )}
                    </MainLayout.Content>
                    {addressList.length > 0 && (
                        <BottomSection>
                            <TouchableOpacity
                                style={styles.buttonAdd}
                                onPress={() => navigation.navigate('AddNewAddress')}
                            >
                                <Icon name="plus" color="white" />
                            </TouchableOpacity>
                            <View style={styles.buttonWrapper}>
                                <Button
                                    title="Set Alamat Utama"
                                    disabled={form === null}
                                    onPress={setAddressHandler}
                                />
                            </View>
                        </BottomSection>
                    )}
                </>
            )}
            <ConfirmationDialog
                ref={confirmationRef}
                title="Hapus Alamat?"
                message={`Apa kamu yakin ingin menghapus \ndata alamat "${form && form.type} - ${form && form.name}"?`}
                onClose={() => setForm(null)}
                onSubmit={deleteAddressHandler}
            />
        </MainLayout>
    )
}

const styles = StyleSheet.create({
    content: { flex: 1 },
    wrapper:
    {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    label:
    {
        fontFamily: fonts.primary[500],
        fontSize: 12
    },
    headerText:
    {
        fontFamily: fonts.primary[500],
        fontSize: 14,
        lineHeight: 21
    },
    text:
    {
        fontFamily: fonts.primary[400],
        fontSize: 12,
        lineHeight: 19
    },
    actionGroup:
    {
        width: 50,
        alignItems: 'flex-end'
    },
    button:
    {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 5,
        backgroundColor: colors.textInput.enable.background,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyData:
    {
        flex: 1,
        justifyContent: 'center'
    },
    callToAction:
    {
        width: 200,
        alignSelf: 'center'
    },
    buttonAdd:
    {
        width: 45,
        height: 45,
        borderRadius: 45 / 2,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -55,
        right: 15
    },
    buttonWrapper: { flex: 1 },
})

export default Address