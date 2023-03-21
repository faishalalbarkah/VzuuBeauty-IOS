import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Header, Input, MainLayout } from '../../components'
import { updateProfileAction } from '../../services'
import { showSuccess, UPDATE_PROFILE } from '../../utils'

const EditProfile = ({ navigation }) =>
{
    const [form, setForm] = useState({
        name: '',
        phone: ''
    })

    const [isSubmitDisable, setIsSubmitDisable] = useState(true)

    const dispatch = useDispatch()
    const { data: profile } = useSelector(state => state.profile)
    const { errors } = useSelector(state => state.updateProfile)

    const onChange = (formType, formValue) =>
    {
        setForm({
            ...form,
            [formType]: formValue
        })

        if((formType === 'name' && formValue === profile.name) || (formType === 'phone' && formValue === profile.phone_number)) setIsSubmitDisable(true)
        else setIsSubmitDisable(false)
    }

    const updateProfileHandler = () =>
    {
        const res = {
            succeed: () => showSuccess('Profil berhasil diperbarui.')
        }

        dispatch(updateProfileAction(form, res))
    }

    useEffect(() =>
    {
        setForm({
            name: profile.name,
            phone: profile.phone_number
        })

        return () => dispatch({ type: UPDATE_PROFILE.RESET })
    }, [])

    return (
        <MainLayout>
            <Header
                title="Ubah Profil"
                goBack={navigation.goBack}
                goBackWidth={30}
            />
            <MainLayout.Content bg="transparent" scrollable={false}>
                <Input
                    label="E-mail"
                    placeholder="Masukkan e-mail"
                    defaultValue={profile.email}
                    disable
                    bottomSpace={15}
                />
                <Input
                    label="Nama"
                    placeholder="Masukkan nama"
                    defaultValue={profile.name}
                    onChangeText={value => onChange('name', value)}
                    autoCapitalize="none"
                    errorMessage={errors.name && errors.name.msg && errors.name.msg.id}
                    bottomSpace={15}
                />
                <Input
                    label="Nomor HP"
                    placeholder="Masukkan nomor HP"
                    defaultValue={profile.phone_number}
                    onChangeText={value => onChange('phone', value)}
                    autoCapitalize="none"
                    keyboardType="numeric"
                    errorMessage={errors.phone && errors.phone.msg && errors.phone.msg.id}
                    bottomSpace={35}
                />
                <Button
                    title="Simpan"
                    disabled={isSubmitDisable}
                    onPress={updateProfileHandler}
                />
            </MainLayout.Content>
        </MainLayout>
    )
}

export default EditProfile