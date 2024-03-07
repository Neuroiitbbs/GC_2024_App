import React, { useEffect, useState } from "react"; 
import { View, Text,   
    StyleSheet, Alert, 
    TextInput,
    Button,
    FlatList, Image} from "react-native"; 
import axios from 'axios';
import { backend_link } from "../utils/constants";
import OngoingEventCard from "../Components/OngoingEventCard";

const renderItem = ({ item }) => (
  <View style={{ margin: 10 }}>
    <Image
      source={{ uri: item.imageUrl }}
      style={{ width: 200, height: 200 }}
    />
  </View>
);
  
export default function App() { 
  
    const [imageUrl, setImageUrl] = useState(null);  
    const [carouselImages, setCarouselImages] = useState([]);
    const [Ids,setIds] = useState([]);
    const [data,setdata] = useState([]);
   
    useEffect(() => {
      const getAllCarousels = async () => {
        try{
          const response = await axios.get(backend_link+"api/assets/getCarouselImages");
          console.log('response', response.data); 
          const ids = Object.keys(response.data);
          console.log(ids)
          setIds(ids);
          setdata(response.data);
          return response;
        } catch(err) {
          console.log('Failed to get Carousel Images', err);
        }
      };
      getAllCarousels();
    }, [carouselImages]);

    const uploadPhotoHandler = async () =>{
      try{
        const response = await axios.post(backend_link+'api/assets/addCarouselImage?imageUrl='+imageUrl+'&title=Test');
        console.log(response);
        Alert.alert('Success','Image Added Successfully!');
      }
      catch(err) {
        console.log("Failed",err);
      }
}
  
    return ( 
        <View style={styles.container}> 
            <Text style={styles.header}> 
                Add Carousel Image URL: 
            </Text> 
            <TextInput 
              placeholder="Enter image URL"
              style={{ height: 50, paddingHorizontal:8, backgroundColor: 'white', width: '80%', marginBottom:14 }}
              onChangeText={(newText) => setImageUrl(newText)}
              defaultValue={imageUrl}
            />
            {imageUrl ? <Button title="SUBMIT" onPress={uploadPhotoHandler}/> : <View/>}
        </View> 
    ); 
} 
  
const styles = StyleSheet.create({ 
    container: { 
        backgroundColor: "#000",
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        padding: 16, 
        flexDirection: 'column'
    }, 
    header:{
      color: '#d41d77',
      fontSize: 20,
      marginBottom: 16
    }
});