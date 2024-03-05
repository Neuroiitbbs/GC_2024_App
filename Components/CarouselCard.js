import { Image, View, Dimensions } from 'react-native'


const CarouselCard = ({ item, height, width }) => {
    return (
        <Image source={item} style={{
            width: width,
            height: height,
            borderRadius: 10,
            resizeMode: 'stretch'
        }} />
    )
}

export default CarouselCard;