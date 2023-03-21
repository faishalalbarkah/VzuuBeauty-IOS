import React, { useState } from 'react'
import { ILLogo } from '../../assets'
import { Button, FormLayout, Input } from '../../components'
import { showSuccess } from '../../utils'

const RequestResetPassword = ({ navigation }) =>
{
    const [email, setEmail] = useState('')

    const resetPasswordHandler = () =>
    {
        showSuccess('Halo')
    }

    return (
        <FormLayout
            image={ILLogo}
            title="Reset Kata Sandi"
            desc="Masukkan e-mail terdaftar untuk menerima instruksi reset"
        >
            <Input
                placeholder="E-mail"
                value={email}
                onChangeText={value => setEmail(value)}
                bottomSpace={35}
            />
            <Button
                title="Kirim"
                onPress={resetPasswordHandler}
            />
        </FormLayout>
    )
}

export default RequestResetPassword