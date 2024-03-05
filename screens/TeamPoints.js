import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import TeamPointsComponent from "../Components/TeamPointsComponent";
import { LinearGradient } from "expo-linear-gradient";

const logoPaths = {
  CSE: require("../assets/logos/CSE.png"),
  EE: require("../assets/logos/EE.png"),
  ECEMETA: require("../assets/logos/ECE+META.png"),
  CIVIL: require("../assets/logos/CIVIL.png"),
  MECH: require("../assets/logos/MECH.png"),
  MSc: require("../assets/logos/MSc.png"),
  MTech: require("../assets/logos/MTech.png"),
  PhD: require("../assets/logos/PhD.png"),
};
export default function TeamPoints() {
  const BranchesData = [
    {
      Name: "BasketBall",
      Score: 1000,
    },
    {
      Name: "Cricket",
      Score: 5320,
    },
    {
      Name: "Football",
      Score: -450,
    },
    {
      Name: "CSS Battle",
      Score: 360,
    },
    {
      Name: "Solo Dance",
      Score: 360,
    },
    {
      Name: "Chess",
      Score: 390,
    },
    {
      Name: "Tennis",
      Score: 380,
    },
    {
      Name: "Monoact",
      Score: 3000,
    },
    {
      Name: "BasketBall",
      Score: 1000,
    },
    {
      Name: "Cricket",
      Score: -200,
    },
    {
      Name: "Football",
      Score: 3170,
    },
  ];
  //BranchesData.sort((a, b) => b.Score - a.Score);
  const top3 = BranchesData.slice(0, 3);
  let restData = BranchesData.slice(0).map((item, index) => {
    return { ...item, rank: index + 4 };
  });
  const renderItem = ({ item }) => {
    // console.log(item);
    return (
      <View style={{ padding: 5 }}>
        <TeamPointsComponent branchData={item} logoPaths={logoPaths} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
        
        <View style={styles.containertop}>
            <LinearGradient
        start={{ x: 0.0, y: 1.0 }}
        end={{ x: 0.0, y: 0.0 }}
        locations={[0.6, 1]}
        colors={["#CC9000", "#8c6404"]}
        style={styles.containertop}
      >
            <Image style={styles.branchLogoImage} source={require('./../assets/logos/ECE+META.png')} />
            <Text style={styles.branchTotalPoints}>31050 PTS</Text>
            </LinearGradient>
        </View>
      
      <View style={styles.container2}>
        <FlatList
          data={restData}
          renderItem={renderItem}
          // style={styles.LeaderBoardList}
        />
      </View>
      <View style={styles.bottomcont}>
        <Text style={styles.text01}>Last Updated on: </Text>
        <Text style={styles.text02}>05/03/2023</Text>
      </View>
      <View style={styles.bottomnav}></View>
    </View>
  );
}

const styles = StyleSheet.create({
    branchLogoImage:{
        height:100,
        width:100,
        marginTop:30
    },
    branchTotalPoints:{
        color:'white',
        padding:30,
        paddingTop:20,
        fontSize: 38,
        fontWeight:'bold'
    },
  container: {
    flex: 1,
    backgroundColor: "#000000",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  containertop: {
    flex: 1.2,
    backgroundColor: "#CC9E32",
    color: "white",
    flexDirection: "column",
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius:50,
    borderTopRightRadius:50,
  },
  containertop1: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  containertop2: {
    flex: 1.25,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  containertop3: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  number1top: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
  },
  number1bottom: {
    flex: 0.75,
    backgroundColor: "#746030",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  number2top: {
    flex: 1.5,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
  },
  number2bottom: {
    flex: 0.75,
    backgroundColor: "#52514F",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  number3top: {
    flex: 2,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
  },
  number3bottom: {
    flex: 0.75,
    backgroundColor: "#795038",
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  iconCont: {
    padding: 5,
  },
  container2: {
    flex: 2,
    backgroundColor: "#000000",
    color: "white",
    flexDirection: "row",
    paddingTop: 10,
  },
  leadHeading: {
    fontSize: 15,
    color: "white",

    fontWeight: "bold",
  },
  leadScore: {
    fontSize: 20,
    color: "white",

    fontWeight: "bold",
  },

  text: {
    color: "white",
  },
  LeaderBoardList: {
    flex: 1,
    backgroundColor: "#000000",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  bottomcont: {
    flex: 0.3,
    flexDirection: "row",
    backgroundColor: "#000000",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    bottomMargin: 0,
  },
  text01: {
    color: "#D41D77",
    alignItems: "center",

    paddingBottom: 0,
  },
  text02: {
    color: "white",
    fontWeight: "bold",
    alignContent: "center",

    paddingBottom: 0,
  },
  bottomnav: {
    flex: 0.4,
    backgroundColor: "#000000",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
});