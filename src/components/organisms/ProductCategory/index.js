import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { BUCKET_URL } from '../../../utils'
import { Gap, SectionTitle } from '../../atoms'
import { ProductCategoryItem } from '../../molecules'

const ProductCategory = ({ data, sectionTitle, renderImage, bottomSpace }) =>
{
    if(typeof renderImage !== 'function') return null

    return (
        <View style={styles.container(bottomSpace)}>
            {sectionTitle && (
                <SectionTitle
                    text={sectionTitle}
                    horizontalSpace={15}
                    bottomSpace={10}
                />
            )}
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <Gap width={15} />
                {data &&
                    data.map((item, index) => (
                        <ProductCategoryItem
                            id={item.id}
                            image={renderImage(item) && { uri: `${BUCKET_URL}/${renderImage(item)}` }}
                            categoryName={item.name}
                            key={index}
                        />
                    ))}
                <Gap width={5} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: bottomSpace => ({
        marginBottom: typeof bottomSpace === 'number' ? bottomSpace : 0
    })
})

export default ProductCategory