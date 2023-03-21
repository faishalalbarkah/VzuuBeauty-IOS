import { combineReducers } from 'redux'
import {
    changePasswordReducer,
    createAddressReducer,
    deleteAddressReducer,
    getAddressReducer,
    getCitiesReducer,
    getDefaultAddressReducer,
    getProfileReducer,
    getProvincesReducer,
    getSubdistrictsReducer,
    updateAddressReducer,
    updateProfileReducer
} from './account-settings'
import {
    loginReducer,
    logoutReducer,
    registerReducer,
    requestOTPReducer,
    resetPasswordReducer,
    verifyWithOTPReducer
} from './auth'
import {
    addOrSubtractCartReducer,
    getCartDataReducer,
    getTotalCartDataReducer,
    removeFromCartReducer
} from './general'
import { getHomeDataReducer } from './home'
import {
    addWishlistReducer,
    getProductDetailReducer,
    getProductsReducer,
    getWishlistsReducer,
    removeWishlistReducer
} from './product'
import {
    confirmReceiveReducer,
    getOrderDetailReducer,
    getTransactionsReducer,
    trackShipmentReducer
} from './transaction'

const reducers = combineReducers({
    addOrSubtractCart: addOrSubtractCartReducer,
    addressList: getAddressReducer,
    addWishlist: addWishlistReducer,
    changePassword: changePasswordReducer,
    cities: getCitiesReducer,
    confirmReceive: confirmReceiveReducer,
    createAddress: createAddressReducer,
    defaultAddress: getDefaultAddressReducer,
    deleteAddress: deleteAddressReducer,
    getCartData: getCartDataReducer,
    getTotalCartData: getTotalCartDataReducer,
    home: getHomeDataReducer,
    login: loginReducer,
    logout: logoutReducer,
    orderDetail: getOrderDetailReducer,
    productDetail: getProductDetailReducer,
    products: getProductsReducer,
    profile: getProfileReducer,
    provinces: getProvincesReducer,
    register: registerReducer,
    removeFromCart: removeFromCartReducer,
    removeWishlist: removeWishlistReducer,
    requestOtp: requestOTPReducer,
    resetPassword: resetPasswordReducer,
    subdistricts: getSubdistrictsReducer,
    trackShipment: trackShipmentReducer,
    transactions: getTransactionsReducer,
    updateAddress: updateAddressReducer,
    updateProfile: updateProfileReducer,
    verifyAccount: verifyWithOTPReducer,
    wishlists: getWishlistsReducer
})

export default reducers