import React from 'react'
import Svg, { Path } from 'react-native-svg'

const IcAlertCircle = ({ filled, size, color }) =>
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
                <Path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm0 319.91a20 20 0 1120-20 20 20 0 01-20 20zm21.72-201.15l-5.74 122a16 16 0 01-32 0l-5.74-121.94v-.05a21.74 21.74 0 1143.44 0z"/>
            </Svg>
        )
    }

    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 512 512"
            fill="none"
            stroke={color}
            strokeWidth="32"
        >
            <Path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" strokeMiterlimit="10"/>
            <Path d="M250.26 166.05L256 288l5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 6z" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M256 367.91a20 20 0 1120-20 20 20 0 01-20 20z"/>
        </Svg>
    )
}

export default IcAlertCircle