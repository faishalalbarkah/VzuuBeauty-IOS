import React, { useCallback, useEffect, useRef, useState } from 'react'
import { RefreshControl } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { EmptyData, FilterProduct, Header, Loading, MainLayout, ProductItem } from '../../components'
import { getProductsAction } from '../../services'
import { useForm, wait } from '../../utils'

const Products = ({ route }) =>
{
    const initialState = {
        order: '',
        min: '',
        max: ''
    }

    const [form, setForm] = useForm(initialState)
    const [refreshing, setRefreshing] = useState(false)

    const dispatch = useDispatch()
    const { data: { datas: products }, isLoading } = useSelector(state => state.products)

    const filterRef = useRef()

    const onRefresh = useCallback(() =>
    {
        const res = {
            succeed: () =>
            {
                setForm('reset')
                setRefreshing(false)
            }
        }

        setRefreshing(true)
        wait(1500).then(() => dispatch(getProductsAction(null, res)))
    }, [])

    const isSubmitDisable = () =>
    {
        if(form.order !== '' && form.min === '' && form.max === '') return false
        if(form.order !== '' && form.min !== '' && form.max !== '') return false
        if(form.order === '' && form.min !== '' && form.max !== '') return false
        return true
    }

    const filterProductHandler = () =>
    {
        if(form.order === 'asc' || form.order === 'desc') form.type = 'sort-by-price'
        if(form.order === 'sales') form.type = 'sort-by-bestseller'
        if(form.min !== '' && form.max !== '') form.type = 'min-max'
        if((form.order === 'asc' || form.order === 'desc') && form.min !== '' && form.max !== '') form.type = 'all-1'
        if(form.order === 'sales' && form.min !== '' && form.max !== '') form.type = 'all-2'

        dispatch(getProductsAction(form))
    }

    const initialFetch = () =>
    {
        if(route.params)
        {
            dispatch(getProductsAction(route.params))
        }
        else
        {
            dispatch(getProductsAction())
        }
    }

    useEffect(() =>
    {
        initialFetch()
    }, [route.params])

    return (
        <MainLayout>
            <Header
                title="Daftar Produk"
                logo
                cartButton
                filterButton={{ onPress: () => filterRef.current.open() }}
            />
            {isLoading && (<Loading type="inner" />)}
            {products && (
                <>
                    <MainLayout.Grid
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        ListEmptyComponent={<EmptyData type="product" message="Produk tidak tersedia." topSpace={150} />}
                        data={products}
                        renderItem={item => (
                            <ProductItem
                                id={item.id}
                                image={item.product_image.image}
                                name={item.name}
                                price={item.price}
                                priceBeforeDiscount={item.discount}
                            />
                        )}
                    />
                    <FilterProduct
                        ref={filterRef}
                        reset={() => setForm('reset')}
                        isResetShown={JSON.stringify(form) !== JSON.stringify(initialState)}
                        disabled={isSubmitDisable()}
                        onSubmit={filterProductHandler}
                    >
                        <FilterProduct.SortBy
                            value={form.order}
                            onChange={value => setForm('order', value)}
                            bottomSpace={10}
                        />
                        <FilterProduct.Price
                            value={{
                                min: form.min,
                                max: form.max
                            }}
                            onChangeText={{
                                min: value => setForm('min', value),
                                max: value => setForm('max', value)
                            }}
                            bottomSpace={25}
                        />
                    </FilterProduct>
                </>
            )}
        </MainLayout>
    )
}

export default Products