import React from 'react'
import Svg, { Path } from 'react-native-svg'

const IcChevronBack = ({ filled, size, color }) =>
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
                strokeWidth="48"
            >
                <Path d="M328 112L184 256l144 144"/>
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
            strokeWidth="48"
        >
            <Path d="M328 112L184 256l144 144"/>
        </Svg>
    )
}

export default IcChevronBack