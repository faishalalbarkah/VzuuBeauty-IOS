import React from 'react'
import Svg, { Path } from 'react-native-svg'

const IcPlus = ({ filled, size, color }) =>
{
    if(filled === true)
    {
        return (
            <Svg
                width={size}
                height={size}
                viewBox="0 0 512 512"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
            >
                <Path d="M256 112v288M400 256H112"/>
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
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
        >
            <Path d="M256 112v288M400 256H112"/>
        </Svg>
    )
}

export default IcPlus