import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import React from "react";

const SpecificEvents = ({ route }) => {
  const data = route.params?.data;
  console.log("data", data);
  const renderItem = ({ item }) => (
    console.log(item, pointsTable[item].points),
    (
      <View style={styles.row}>
        <Text style={styles.cell}>{item}</Text>
        <Text style={styles.cell}>{pointsTable[item].points}</Text>
        <Text style={styles.cell}>{pointsTable[item].position}</Text>
      </View>
    )
  );
  let sortedPointsTable = {};
  const pointsTable = data?.pointsTable;
  if (pointsTable) {
    const pointsTableArray = Object.entries(pointsTable);
    pointsTableArray.sort((a, b) => {
      return parseInt(a[1].position) - parseInt(b[1].position);
    });
    sortedPointsTable = Object.fromEntries(pointsTableArray);
  }
  console.log(sortedPointsTable);
  console.log("pointsTable", pointsTable);
  return (
    <View
      style={{
        backgroundColor: "black",
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>{data.details.title}</Text>
      <Text style={{ color: "white" }}>{data.details.location}</Text>
      <Text style={{ color: "white" }}>{data.details.description}</Text>
      {pointsTable && (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={[styles.cell, styles.headerText]}>Branch</Text>
            <Text style={[styles.cell, styles.headerText]}>Points</Text>
            <Text style={[styles.cell, styles.headerText]}>Position</Text>
          </View>
          <FlatList
            data={Object.keys(pointsTable)}
            renderItem={renderItem}
            keyExtractor={(item) => item}
          />
        </View>
      )}
    </View>
  );
};

export default SpecificEvents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  header: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "black",
    paddingBottom: 5,
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  cell: {
    flex: 1,
    color: "white",
    minWidth: 40,
    minHeight: 40,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "white",
    // padding: 15,
  },
  headerText: {
    fontWeight: "bold",
  },
});