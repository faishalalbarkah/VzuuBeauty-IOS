import React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'

const IcHelpCircle = ({ filled, size, color }) =>
{   
    if(filled === true)
    {
        return (
            <Svg
                width={size}
                height={size}
                viewBox="0 0 512 512"
                fill={color}
            >
                <Path d="M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64zm-6 304a20 20 0 1120-20 20 20 0 01-20 20zm33.44-102C267.23 276.88 265 286.85 265 296a14 14 0 01-28 0c0-21.91 10.08-39.33 30.82-53.26C287.1 229.8 298 221.6 298 203.57c0-12.26-7-21.57-21.49-28.46-3.41-1.62-11-3.2-20.34-3.09-11.72.15-20.82 2.95-27.83 8.59C215.12 191.25 214 202.83 214 203a14 14 0 11-28-1.35c.11-2.43 1.8-24.32 24.77-42.8 11.91-9.58 27.06-14.56 45-14.78 12.7-.15 24.63 2 32.72 5.82C312.7 161.34 326 180.43 326 203.57c0 33.83-22.61 49.02-42.56 62.43z"/>
            </Svg>
        )
    }

    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 512 512"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <Path d="M256 80a176 176 0 10176 176A176 176 0 00256 80z" fill="none" stroke={color} strokeMiterlimit="10" strokeWidth="32"/>
            <Path d="M200 202.29s.84-17.5 19.57-32.57C230.68 160.77 244 158.18 256 158c10.93-.14 20.69 1.67 26.53 4.45 10 4.76 29.47 16.38 29.47 41.09 0 26-17 37.81-36.37 50.8S251 281.43 251 296" fill="none" stroke={color} strokeMiterlimit="10" strokeWidth="28"/>
            <Circle cx="250" cy="348" r="20" fill={color} />
        </Svg>
    )
}

export default IcHelpCircle