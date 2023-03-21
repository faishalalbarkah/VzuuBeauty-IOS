import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EmptyData, Header, Loading, MainLayout, ProductCategory, ProductItem, PromoSlider, SearchBar } from '../../components'
import { getHomeDataAction } from '../../services'

const Home = ({ navigation }) =>
{
    const dispatch = useDispatch()
    const { data: home, isLoading } = useSelector(state => state.home)

    useEffect(() =>
    {
        dispatch(getHomeDataAction())
    }, [])

    return (
        <MainLayout>
            <Header
                title="Vzuu Beauty"
                logo
                cartButton
            />
            {isLoading && (<Loading type="inner" />)}
            {home && (
                <MainLayout.Grid
                    ListHeaderComponent={
                        <>
                            <SearchBar bottomSpace={15} />
                            <PromoSlider
                                data={home.get_banners}
                                renderImage={image => image.banner}
                                autoplay={true}
                                loop={true}
                                bottomSpace={15}
                            />
                            <ProductCategory
                                sectionTitle="Kategori"
                                data={home.get_categories}
                                renderImage={image => image.image}
                                bottomSpace={30}
                            />
                        </>
                    }
                    ListEmptyComponent={<EmptyData message="Data tidak tersedia." topSpace={150} />}
                    sectionTitle="Semua Produk"
                    headerLink={{
                        title: 'Lihat Semua',
                        onPress: () => navigation.navigate('Products')
                    }}
                    data={home.latest_products}
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
            )}
        </MainLayout>
    )
}

export default Home