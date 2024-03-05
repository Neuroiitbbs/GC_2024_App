import { View, Text, StyleSheet, Dimensions } from "react-native";
// import CSELogo from "../assets/CSELogo.png";
import { Image } from "react-native";

const TeamPointsComponent = (props) => {
  return (
    <>
      <View style={styles.LeaderBoardElement}>
        {/* <View style={styles.LeaderBoardElementLeft}> */}
        <View style={styles.branchname}>
          <Text style={styles.LeaderBoardNameHolder}>
            {props.branchData.Name}
          </Text>
        </View>
        {/* </View> */}
        <View style={styles.points}>
            {
                props.branchData.Score>0 ? <Text style={styles.LeaderBoardPoints}>{props.branchData.Score+" PTS"}</Text> : <Text style={styles.LeaderBoardPointsNeg}>{props.branchData.Score+" PTS"}</Text>
            }
        </View>
      </View>
    </>
  );
};

const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  LeaderBoardElement: {
    flexDirection: "row",
    flex: 0.08,
    backgroundColor: "#252728",
    alignItems: "center",
    justifyContent: "center",
    width: screenWidth * 0.85,
    height: 72,
    borderRadius: 12,
  },
  LeaderBoardElementLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginRight: "30%",
    marginLeft: "3%",
    padding: 10,
    gap: 10,
  },
  LeaderBoardNameHolder: {
    color: "white",
    marginLeft: 10,
    fontSize: 20,
  },
  LeaderBoardLogo: {
    width: 32,
    height: 32,
    marginLeft: 10,
  },
  LeaderBoardSNo: {
    color: "white",
    fontSize: 14.4,
    fontWeight: "bold",
  },
  LeaderBoardPoints: {
    color: "#0ac410",
    fontSize: 16,
    fontWeight: "bold",
  },
  LeaderBoardPointsNeg:{
    color: "#e3091b",
    fontSize: 16,
    fontWeight: "bold",
  },
  LeaderBoardElementText: {
    flexDirection: "row",
    flex: 0.75,
    padding: 20,
  },
  branchname: {
    flex: 2,
  },
  points: {
    flex: 0.75,
  },
});

export default TeamPointsComponent;