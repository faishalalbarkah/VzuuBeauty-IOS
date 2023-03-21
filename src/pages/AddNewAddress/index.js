import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AutoPicker, Button, Header, Input, MainLayout, PressableInput } from '../../components'
import { createAddressAction, getCitiesAction, getProvincesAction, getSubdistrictsAction } from '../../services'
import { CREATE_ADDRESS, showSuccess, useForm } from '../../utils'

const AddNewAddress = ({ navigation }) =>
{
    const [form, setForm] = useForm({
        type: '',
        name: '',
        phone: '',
        province_id: '',
        city_id: '',
        subdistrict_id: '',
        address: ''
    })

    const [temporaryForm, setTemporaryForm] = useForm({
        province_name: '',
        city_name: '',
        subdistrict_name: ''
    })

    const dispatch = useDispatch()
    const { data: provinces } = useSelector(state => state.provinces)
    const { data: cities } = useSelector(state => state.cities)
    const { data: subdistricts } = useSelector(state => state.subdistricts)
    const { errors } = useSelector(state => state.createAddress)

    const provincesRef = useRef()
    const citiesRef = useRef()
    const subdistrictsRef = useRef()

    const pickData = (code, value) =>
    {
        if(code === 'province')
        {
            setForm('province_id', value.id)
            setTemporaryForm('province_name', value.name)
            dispatch(getCitiesAction({ id: value.id }))
            provincesRef.current.close()
            value.reset()
        }

        if(code === 'city')
        {
            setForm('city_id', value.id)
            setTemporaryForm('city_name', value.name)
            dispatch(getSubdistrictsAction({ id: value.id }))
            citiesRef.current.close()
            value.reset()
        }

        if(code === 'subdistrict')
        {
            setForm('subdistrict_id', value.id)
            setTemporaryForm('subdistrict_name', value.name)
            subdistrictsRef.current.close()
            value.reset()
        }
    }

    const addAddressHandler = () =>
    {
        const res = {
            succeed: result =>
            {
                navigation.goBack()
                showSuccess((result && result.message && result.message.id) ? result.message.id : 'Success.')
            }
        }

        dispatch(createAddressAction(form, res))
    }

    useEffect(() =>
    {
        dispatch(getProvincesAction())
        return () => dispatch({ type: CREATE_ADDRESS.RESET })
    }, [])

    return (
        <MainLayout>
            <Header
                title="Tambah Alamat"
                goBack={navigation.goBack}
                goBackWidth={30}
            />
            <MainLayout.Content bg="transparent">
                <Input
                    label="Tipe Alamat"
                    placeholder="Contoh: alamat rumah, kantor, dan sebagainya"
                    value={form.type}
                    onChangeText={value => setForm('type', value)}
                    errorMessage={errors.type && errors.type.msg && errors.type.msg.id}
                    bottomSpace={15}
                />
                <Input
                    label="Nama Penerima"
                    placeholder="Masukkan nama penerima pesanan"
                    value={form.name}
                    onChangeText={value => setForm('name', value)}
                    errorMessage={errors.name && errors.name.msg && errors.name.msg.id}
                    bottomSpace={15}
                />
                <Input
                    label="Nomor HP"
                    placeholder="Masukkan nomor HP / telepon"
                    value={form.phone}
                    onChangeText={value => setForm('phone', value)}
                    keyboardType="numeric"
                    errorMessage={errors.phone && errors.phone.msg && errors.phone.msg.id}
                    bottomSpace={15}
                />
                <PressableInput
                    label="Provinsi"
                    placeholder="Masukkan nama provinsi"
                    value={temporaryForm.province_name}
                    onPress={() => provincesRef.current.open()}
                    errorMessage={errors.province_id && errors.province_id.msg && errors.province_id.msg.id}
                    bottomSpace={15}
                />
                {form.province_id !== '' && (
                    <PressableInput
                        label="Kota / Kabupaten"
                        placeholder="Masukkan nama kota / kabupaten"
                        value={temporaryForm.city_name}
                        onPress={() => citiesRef.current.open()}
                        errorMessage={errors.city_id && errors.city_id.msg && errors.city_id.msg.id}
                        bottomSpace={15}
                    />
                )}
                {form.city_id !== '' && (
                    <PressableInput
                        label="Kecamatan"
                        placeholder="Masukkan nama kecamatan"
                        value={temporaryForm.subdistrict_name}
                        onPress={() => subdistrictsRef.current.open()}
                        errorMessage={errors.subdistrict_id && errors.subdistrict_id.msg && errors.subdistrict_id.msg.id}
                        bottomSpace={15}
                    />
                )}
                <Input
                    label="Alamat Lengkap"
                    placeholder="Masukkan alamat lengkap (nama jalan, blok rumah, dan sebagainya)"
                    value={form.address}
                    onChangeText={value => setForm('address', value)}
                    multiline={true}
                    numberOfLines={5}
                    errorMessage={errors.address && errors.address.msg && errors.address.msg.id}
                    bottomSpace={35}
                />
                <Button
                    title="Tambah"
                    onPress={addAddressHandler}
                    bottomSpace={30}
                />
            </MainLayout.Content>
            <AutoPicker
                ref={provincesRef}
                title="Provinsi"
                inputPlaceholder="Telusuri nama provinsi"
                data={provinces}
                filterKeyExtractor={item => item.name}
                renderItem={(item, index) => (
                    <AutoPicker.SuggestionItem
                        name={item.name}
                        onPress={() => pickData('province', item)}
                        key={index}
                    />
                )}
            />
            {form.province_id !== '' && (
                <AutoPicker
                    ref={citiesRef}
                    title="Kota / Kabupaten"
                    inputPlaceholder="Telusuri nama kota / kabupaten"
                    data={cities}
                    filterKeyExtractor={item => item.name}
                    renderItem={(item, index) => (
                        <AutoPicker.SuggestionItem
                            name={item.name}
                            onPress={() => pickData('city', item)}
                            key={index}
                        />
                    )}
                />
            )}
            {form.city_id !== '' && (
                <AutoPicker
                    ref={subdistrictsRef}
                    title="Kecamatan"
                    inputPlaceholder="Telusuri nama kecamatan"
                    data={subdistricts}
                    filterKeyExtractor={item => item.name}
                    renderItem={(item, index) => (
                        <AutoPicker.SuggestionItem
                            name={item.name}
                            onPress={() => pickData('subdistrict', item)}
                            key={index}
                        />
                    )}
                />
            )}
        </MainLayout>
    )
}

export default AddNewAddress