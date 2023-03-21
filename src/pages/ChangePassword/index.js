import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Header, Input, MainLayout } from '../../components'
import { changePasswordAction, logoutAction } from '../../services'
import { CHANGE_PASSWORD, showSuccess } from '../../utils'

const ChangePassword = ({ navigation }) =>
{
    const [form, setForm] = useState({
        old_password: '',
        new_password: '',
        password_confirmation: ''
    })

    const [isSubmitDisable, setIsSubmitDisable] = useState(true)

    const dispatch = useDispatch()
    const { data: profile } = useSelector(state => state.profile)
    const { errors } = useSelector(state => state.changePassword)

    const onChange = (formType, formValue) =>
    {
        setForm({
            ...form,
            [formType]: formValue
        })

        if(formType === 'password_confirmation' && formValue !== '' && form.old_password !== '' && form.new_password !== '') setIsSubmitDisable(false)
        else setIsSubmitDisable(true)
    }

    const changePasswordHandler = () =>
    {
        const res = {
            succeed: () =>
            {
                showSuccess('Kata sandi berhasil diubah.')
                dispatch(logoutAction())
            }
        }

        dispatch(changePasswordAction(form, res))
    }

    useEffect(() =>
    {
        return () => dispatch({ type: CHANGE_PASSWORD.RESET })
    }, [])

    return (
        <MainLayout>
            <Header
                title="Ubah Kata Sandi"
                goBack={navigation.goBack}
                goBackWidth={30}
            />
            <MainLayout.Content bg="transparent" scrollable={false}>
                {profile.is_password === 'true' &&
                    <Input
                        placeholder="Kata sandi"
                        value={form.old_password}
                        onChangeText={value => onChange('old_password', value)}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        errorMessage={errors.old_password && errors.old_password.msg && errors.old_password.msg.id}
                        bottomSpace={15}
                    />
                }
                <Input
                    placeholder="Kata sandi baru"
                    value={form.new_password}
                    onChangeText={value => onChange('new_password', value)}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    errorMessage={errors.new_password && errors.new_password.msg && errors.new_password.msg.id}
                    bottomSpace={15}
                />
                <Input
                    placeholder="Konfirmasi kata sandi baru"
                    value={form.password_confirmation}
                    onChangeText={value => onChange('password_confirmation', value)}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    errorMessage={errors.password_confirmation && errors.password_confirmation.msg && errors.password_confirmation.msg.id}
                    bottomSpace={35}
                />
                <Button
                    title="Simpan"
                    disabled={isSubmitDisable}
                    onPress={changePasswordHandler}
                />
            </MainLayout.Content>
        </MainLayout>
    )
}

export default ChangePassword