// import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";
// import React, { useState } from "react";
// import { AntDesign } from "@expo/vector-icons";
// import Carousel from "react-native-snap-carousel";

// const width = Dimensions.get("window").width;
// const data = [
//   {
//     id: "1",
//     title: "GENERAL CHAMPIONSHIP BEGINS",
//     subtitle: "COMMUNITY CENTRE Wed 12/16 8:30 PM",
//     teams: "ALL TEAMS",
//     date: "20 Jan",
//   },
//   {
//     id: "1",
//     title: "GENERAL CHAMPIONSHIP BEGINS",
//     subtitle: "COMMUNITY CENTRE Wed 12/16 8:30 PM",
//     teams: "ALL TEAMS",
//     date: "20 Jan",
//   },
// ];
// const NewsCarousel = ({ data }) => {
//   const carouselRef = React.useRef(null);

//   const renderItem = ({ item }) => {
//     return (
//       <View
//         style={{
//           width: width - 40,
//           backgroundColor: "white",
//           margin: 20,
//           border: "1px solid black",
//           borderRadius: 10,
//         }}
//       >
//         <Text>{item.title}</Text>
//         <Text>{item.subtitle}</Text>
//         <Text>{`Teams: ${item.teams}`}</Text>
//         <Text>{`Date: ${item.date}`}</Text>
//       </View>
//     );
//   };

//   return (
//     <Carousel
//       ref={carouselRef}
//       data={data}
//       renderItem={renderItem}
//       sliderWidth={width}
//       itemWidth={width}
//       loop
//       autoplay
//       autoplayDelay={5000}
//       autoplayInterval={3000}
//     />
//   );
// };
// const MainScreen = () => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [searchedText, setSearchedText] = useState("");
//   const handleFocus = () => {
//     setIsFocused(true);
//   };

//   const handleBlur = () => {
//     setIsFocused(false);
//   };
//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: "black",
//         padding: 10,
//         alignItems: "center",
//       }}
//     >
//       <View style={styles.container}>
//         {searchedText === "" && !isFocused && (
//           <AntDesign
//             name="search1"
//             size={20}
//             color="grey"
//             style={styles.icon}
//           />
//         )}
//         <TextInput
//           style={styles.input}
//           placeholder={"    Search.."}
//           onFocus={handleFocus}
//           onBlur={handleBlur}
//           onChangeText={(text) => setSearchedText(text)}
//         />
//       </View>
//       <Text>MainScreen</Text>
//       <View
//         style={{
//           flex: 1,
//         }}
//       >
//         <NewsCarousel data={data} />
//       </View>
//     </View>
//   );
// };

// export default MainScreen;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "black",
//     borderRadius: 5,
//     paddingHorizontal: 10,
//   },
//   input: {
//     width: "100%",
//     height: 40,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//     backgroundColor: "white",
//     borderRadius: 10,
//   },
//   icon: {
//     marginRight: 10,
//     position: "absolute",
//     left: 26,
//     zIndex: 1,
//   },
// });
