import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import LeaderBoardElement from "../Components/LeaderBoardElement";
import logoPaths from "../utils/logoPaths";
import axios from 'axios';
import { backend_link } from "../utils/constants";
import { useEffect, useState } from "react";

const initialBranchesData = [
  {
    Name: "CSE",
    Score: 0,
  },
  {
    Name: "ECE+META",
    Score: 0,
  },
  {
    Name: "EE",
    Score: 0,
  },
  {
    Name: "MECH",
    Score: 0,
  },
  {
    Name: "CIVIL",
    Score: 0,
  },
  {
    Name: "M.Sc",
    Score: 0,
  },
  {
    Name: "M.Tech",
    Score: 0,
  },
  {
    Name: "PhD",
    Score: 0,
  },
];

const fetchDataAndUpdateScore = async (teamName, setBranchesData) => {
  try {
    const response = await axios.get(backend_link + 'api/points/getTotalPointsByTeam', {
      params: { teamId: teamName }
    });
    console.log("data",response.data);
    const points = response.data.points*1;

    // Update the state with the new score for the specified team
    setBranchesData(prevState => {
      return prevState.map(branch => {
        if (branch.Name === teamName) {
          return { ...branch, Score: points };
        }
        return branch;
      });
    });

    console.log('BranchesData updated with new score:', teamName, points);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// const teamId = ["CSE","EE","ECE","CIVIL","MECH","PHD","MTech","MSc"];

export default function Leaderboard() {
  
  const [BranchesData, setBranchesData] = useState(initialBranchesData);

  useEffect(() => {
    // Fetch and update the score for 'CSE' team initially
    fetchDataAndUpdateScore('CSE', setBranchesData);
  }, []);

  // This useEffect will run whenever BranchesData changes
  useEffect(() => {
    //console.log('BranchesData updated:', BranchesData);
  }, [BranchesData]);

  useEffect(() => {
    // Fetch and update the score for 'CSE' team initially
    fetchDataAndUpdateScore('ECE', setBranchesData);
  }, []);

  // This useEffect will run whenever BranchesData changes
  useEffect(() => {
    //console.log('BranchesData updated:', BranchesData);
  }, [BranchesData]);

  useEffect(() => {
    // Fetch and update the score for 'CSE' team initially
    fetchDataAndUpdateScore('EE', setBranchesData);
  }, []);

  // This useEffect will run whenever BranchesData changes
  useEffect(() => {
    //console.log('BranchesData updated:', BranchesData);
  }, [BranchesData]);

  useEffect(() => {
    // Fetch and update the score for 'CSE' team initially
    fetchDataAndUpdateScore('MECH', setBranchesData);
  }, []);

  // This useEffect will run whenever BranchesData changes
  useEffect(() => {
    //console.log('BranchesData updated:', BranchesData);
  }, [BranchesData]);

  useEffect(() => {
    // Fetch and update the score for 'CSE' team initially
    fetchDataAndUpdateScore('MTech', setBranchesData);
  }, []);

  // This useEffect will run whenever BranchesData changes
  useEffect(() => {
    //console.log('BranchesData updated:', BranchesData);
  }, [BranchesData]);

  useEffect(() => {
    // Fetch and update the score for 'CSE' team initially
    fetchDataAndUpdateScore('MSc', setBranchesData);
  }, []);

  // This useEffect will run whenever BranchesData changes
  useEffect(() => {
    //console.log('BranchesData updated:', BranchesData);
  }, [BranchesData]);

  useEffect(() => {
    // Fetch and update the score for 'CSE' team initially
    fetchDataAndUpdateScore('CIVIL', setBranchesData);
  }, []);

  // This useEffect will run whenever BranchesData changes
  useEffect(() => {
    //console.log('BranchesData updated:', BranchesData);
  }, [BranchesData]);

  useEffect(() => {
    // Fetch and update the score for 'CSE' team initially
    fetchDataAndUpdateScore('Phd', setBranchesData);
  }, []);

  // This useEffect will run whenever BranchesData changes
  useEffect(() => {
    //console.log('BranchesData updated:', BranchesData);
  }, [BranchesData]);

  BranchesData.sort((a, b) => b.Score - a.Score);
  const top3 = BranchesData.slice(0, 3);
  let restData = BranchesData.slice(3).map((item, index) => {
    return { ...item, rank: index + 4 };
  });
  const renderItem = ({ item }) => {
    // console.log(item);
    return (
      <View style={{ padding: 5, margin: 6, marginBottom: 0 }}>
        <LeaderBoardElement branchData={item} logoPaths={logoPaths} />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containertop}>
        <View style={styles.containertop1}>
          <View style={styles.number2top}>
            <View style={styles.iconCont}>
              <FontAwesome5 name="crown" size={22} color="#ADABA1" />
            </View>
            <Image
              source={
                logoPaths[
                  top3[1].Name.replace(".", "")
                    .replace("+", "")
                    .replace("-", "")
                ]
              }
              style={{ width: 100, height: 100 }}
            />
          </View>
          <View style={styles.number2bottom}>
            <Text style={[styles.leadHeading]}>{top3[1].Name}</Text>
            <Text style={styles.leadScore}>{top3[1].Score}</Text>
          </View>
        </View>
        <View style={styles.containertop2}>
          <View style={styles.number1top}>
            <View style={styles.iconCont}>
              <FontAwesome5 name="crown" size={24} color="#FFAA00" />
            </View>
            <Image
              source={logoPaths[top3[0].Name.replace(".", "").replace("+", "")]}
              style={{ width: 100, height: 100 }}
            />
          </View>
          <View style={styles.number1bottom}>
            <Text style={[styles.leadHeading]}>{top3[0].Name}</Text>
            <Text style={styles.leadScore}>{top3[0].Score}</Text>
          </View>
        </View>
        <View style={styles.containertop3}>
          <View style={styles.number3top}>
            <View style={styles.iconCont}>
              <FontAwesome5 name="crown" size={20} color="#CB7E32" />
            </View>
            <Image
              source={logoPaths[top3[2].Name.replace(".", "").replace("+", "")]}
              style={{ width: 100, height: 100 }}
            />
          </View>
          <View style={styles.number3bottom}>
            <Text style={[styles.leadHeading]}>{top3[2].Name}</Text>
            <Text style={styles.leadScore}>{top3[2].Score}</Text>
          </View>
        </View>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  containertop: {
    flex: 1.5,
    backgroundColor: "#000000",
    color: "white",
    flexDirection: "row",
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
    width: "100%",
    backgroundColor: "#000",
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
