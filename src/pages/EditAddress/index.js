import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AutoPicker, Button, Header, Input, MainLayout, PressableInput } from '../../components'
import { getCitiesAction, getProvincesAction, getSubdistrictsAction, updateAddressAction } from '../../services'
import { showSuccess, UPDATE_ADDRESS } from '../../utils'

const EditAddress = ({ navigation, route }) =>
{
    const { address } = route.params

    const [form, setForm] = useState({
        id: address.id,
        type: address.type,
        name: address.name,
        phone: address.phone_number,
        province_id: address.province_id,
        city_id: address.city_id,
        subdistrict_id: address.subdistrict_id,
        address: address.address
    })

    const [provinceName, setProvinceName] = useState('')
    const [cityName, setCityName] = useState('')
    const [subdistrictName, setSubdistrictName] = useState('')

    const dispatch = useDispatch()
    const { data: provinces } = useSelector(state => state.provinces)
    const { data: cities } = useSelector(state => state.cities)
    const { data: subdistricts } = useSelector(state => state.subdistricts)
    const { errors } = useSelector(state => state.updateAddress)

    const provincesRef = useRef()
    const citiesRef = useRef()
    const subdistrictsRef = useRef()

    const getRegionDetailHandler = () =>
    {
        const provinceRes = {
            succeed: result =>
            {
                const province = result.filter(province => province.id === address.province_id)
                setProvinceName(province[0].name)
            }
        }

        const cityRes = {
            succeed: result =>
            {
                const city = result.filter(city => city.id === address.city_id)
                setCityName(city[0].name)
            }
        }

        const subdistrictRes = {
            succeed: result =>
            {
                const subdistrict = result.filter(subdistrict => subdistrict.id === address.subdistrict_id)
                setSubdistrictName(subdistrict[0].name)
            }
        }

        dispatch(getProvincesAction(null, provinceRes))
        dispatch(getCitiesAction({ id: address.province_id }, cityRes))
        dispatch(getSubdistrictsAction({ id: address.city_id }, subdistrictRes))
    }

    const onChange = (formType, formValue) =>
    {
        setForm({
            ...form,
            [formType]: formValue
        })
    }

    const pickData = (code, value) =>
    {
        if(code === 'province')
        {
            setForm({
                ...form,
                province_id: value.id,
                city_id: '',
                subdistrict_id: '',
            })
            setCityName('')

            setProvinceName(value.name)
            dispatch(getCitiesAction({ id: value.id }))
            provincesRef.current.close()
            value.reset()
        }

        if(code === 'city')
        {
            setForm({
                ...form,
                city_id: value.id,
                subdistrict_id: '',
            })
            setSubdistrictName('')

            setCityName(value.name)
            dispatch(getSubdistrictsAction({ id: value.id }))
            citiesRef.current.close()
            value.reset()
        }

        if(code === 'subdistrict')
        {
            setForm({ ...form, subdistrict_id: value.id })
            setSubdistrictName(value.name)
            subdistrictsRef.current.close()
            value.reset()
        }
    }

    const updateAddressHandler = () =>
    {
        const res = {
            succeed: result =>
            {
                navigation.goBack()
                showSuccess((result && result.message && result.message.id) ? result.message.id : 'Success.')
            }
        }

        dispatch(updateAddressAction(form, res))
    }

    useEffect(() =>
    {
        getRegionDetailHandler()
        return () => dispatch({ type: UPDATE_ADDRESS.RESET })
    }, [])

    return (
        <MainLayout>
            <Header
                title="Ubah Alamat"
                goBack={navigation.goBack}
                goBackWidth={30}
            />
            <MainLayout.Content bg="transparent">
                <Input
                    label="Tipe Alamat"
                    placeholder="Contoh: alamat rumah, kantor, dan sebagainya"
                    defaultValue={form.type}
                    onChangeText={value => onChange('type', value)}
                    errorMessage={errors.type && errors.type.msg && errors.type.msg.id}
                    bottomSpace={15}
                />
                <Input
                    label="Nama Penerima"
                    placeholder="Masukkan nama penerima pesanan"
                    defaultValue={form.name}
                    onChangeText={value => onChange('name', value)}
                    errorMessage={errors.name && errors.name.msg && errors.name.msg.id}
                    bottomSpace={15}
                />
                <Input
                    label="Nomor HP"
                    placeholder="Masukkan nomor HP / telepon"
                    defaultValue={form.phone}
                    onChangeText={value => onChange('phone', value)}
                    keyboardType="numeric"
                    errorMessage={errors.phone && errors.phone.msg && errors.phone.msg.id}
                    bottomSpace={15}
                />
                <PressableInput
                    label="Provinsi"
                    placeholder="Masukkan nama provinsi"
                    value={provinceName}
                    onPress={() => provincesRef.current.open()}
                    errorMessage={errors.province_id && errors.province_id.msg && errors.province_id.msg.id}
                    bottomSpace={15}
                />
                {form.province_id !== '' && (
                    <PressableInput
                        label="Kota / Kabupaten"
                        placeholder="Masukkan nama kota / kabupaten"
                        value={cityName}
                        onPress={() => citiesRef.current.open()}
                        errorMessage={errors.city_id && errors.city_id.msg && errors.city_id.msg.id}
                        bottomSpace={15}
                    />
                )}
                {form.city_id !== '' && (
                    <PressableInput
                        label="Kecamatan"
                        placeholder="Masukkan nama kecamatan"
                        value={subdistrictName}
                        onPress={() => subdistrictsRef.current.open()}
                        errorMessage={errors.subdistrict_id && errors.subdistrict_id.msg && errors.subdistrict_id.msg.id}
                        bottomSpace={15}
                    />
                )}
                <Input
                    label="Alamat Lengkap"
                    placeholder="Masukkan alamat lengkap (nama jalan, blok rumah, dan sebagainya)"
                    defaultValue={form.address}
                    onChangeText={value => onChange('address', value)}
                    multiline={true}
                    numberOfLines={5}
                    errorMessage={errors.address && errors.address.msg && errors.address.msg.id}
                    bottomSpace={35}
                />
                <Button
                    title="Simpan"
                    onPress={updateAddressHandler}
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

export default EditAddress