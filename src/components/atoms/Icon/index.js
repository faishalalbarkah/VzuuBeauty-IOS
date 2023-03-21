import React from 'react'
import {
    IcAlertCircle,
    IcCalendar,
    IcCamera,
    IcCart,
    IcCheckmarkCircle,
    IcChevronBack,
    IcChevronForward,
    IcCloseCircle,
    IcFilter,
    IcHelpBuoy,
    IcHelpCircle,
    IcHistory,
    IcHome,
    IcKey,
    IcLock,
    IcLogout,
    IcLove,
    IcNotifications,
    IcOptions,
    IcPencil,
    IcPerson,
    IcPlus,
    IcPriceTag,
    IcSearch,
    IcSettings,
    IcShare,
    IcStar,
    IcStoreFront,
    IcSwapHorizontal,
    IcTime,
    IcTrashBin
} from '../../../assets'
import { colors } from '../../../utils/colors'

const Icon = ({ name, filled, size, color }) =>
{
    const currentSize = size ? size : '24'
    const currentColor = color ? color : filled ? colors.primary : '#999999'

    if(name === 'alert-circle') return <IcAlertCircle filled={filled} size={currentSize} color={currentColor} />
    if(name === 'calendar') return <IcCalendar filled={filled} size={currentSize} color={currentColor} />
    if(name === 'camera') return <IcCamera filled={filled} size={currentSize} color={currentColor} />
    if(name === 'cart') return <IcCart filled={filled} size={currentSize} color={currentColor} />
    if(name === 'checkmark-circle') return <IcCheckmarkCircle filled={filled} size={currentSize} color={currentColor} />
    if(name === 'chevron-back') return <IcChevronBack filled={filled} size={currentSize} color={currentColor} />
    if(name === 'chevron-forward') return <IcChevronForward filled={filled} size={currentSize} color={currentColor} />
    if(name === 'close-circle') return <IcCloseCircle filled={filled} size={currentSize} color={currentColor} />
    if(name === 'filter') return <IcFilter filled={filled} size={currentSize} color={currentColor} />
    if(name === 'help-buoy') return <IcHelpBuoy filled={filled} size={currentSize} color={currentColor} />
    if(name === 'help-circle') return <IcHelpCircle filled={filled} size={currentSize} color={currentColor} />
    if(name === 'history') return <IcHistory filled={filled} size={currentSize} color={currentColor} />
    if(name === 'home') return <IcHome filled={filled} size={currentSize} color={currentColor} />
    if(name === 'key') return <IcKey filled={filled} size={currentSize} color={currentColor} />
    if(name === 'lock') return <IcLock filled={filled} size={currentSize} color={currentColor} />
    if(name === 'logout') return <IcLogout filled={filled} size={currentSize} color={currentColor} />
    if(name === 'love') return <IcLove filled={filled} size={currentSize} color={currentColor} />
    if(name === 'notifications') return <IcNotifications filled={filled} size={currentSize} color={currentColor} />
    if(name === 'options') return <IcOptions filled={filled} size={currentSize} color={currentColor} />
    if(name === 'pencil') return <IcPencil filled={filled} size={currentSize} color={currentColor} />
    if(name === 'person') return <IcPerson filled={filled} size={currentSize} color={currentColor} />
    if(name === 'plus') return <IcPlus filled={filled} size={currentSize} color={currentColor} />
    if(name === 'price-tag') return <IcPriceTag filled={filled} size={currentSize} color={currentColor} />
    if(name === 'search') return <IcSearch filled={filled} size={currentSize} color={currentColor} />
    if(name === 'settings') return <IcSettings filled={filled} size={currentSize} color={currentColor} />
    if(name === 'share') return <IcShare filled={filled} size={currentSize} color={currentColor} />
    if(name === 'star') return <IcStar filled={filled} size={currentSize} color={currentColor} />
    if(name === 'store-front') return <IcStoreFront filled={filled} size={currentSize} color={currentColor} />
    if(name === 'swap-horizontal') return <IcSwapHorizontal filled={filled} size={currentSize} color={currentColor} />
    if(name === 'time') return <IcTime filled={filled} size={currentSize} color={currentColor} />
    if(name === 'trash-bin') return <IcTrashBin filled={filled} size={currentSize} color={currentColor} />

    return <IcHome filled={filled} size={currentSize} color={currentColor} />
}

export default Icon