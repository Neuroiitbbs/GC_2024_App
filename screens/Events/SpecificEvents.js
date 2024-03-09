import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import React from "react";

const sortPointsTable = (data) => {
  const pointsTable = data?.pointsTable;
  if (pointsTable) {
    const pointsTableArray = Object.entries(pointsTable);
    pointsTableArray.sort((a, b) => {
      if (parseInt(b[1].points) - parseInt(a[1].points) === 0) {
        return parseInt(a[1].position) - parseInt(b[1].position); // sorting the array in ascending order
      }
      return parseInt(b[1].points) - parseInt(a[1].points); // sorting the array in descending order
    });
    return Object.fromEntries(pointsTableArray); // Return the sorted points table
  }
  return {};
};
const SpecificEvents = ({ route }) => {
  let data = route.params?.data;

  const sortedTable = sortPointsTable(data);

  const timestamp = data.details?.timestamp;
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString(); // Date component
  let hour = date.getHours();
  const minute = date.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  hour = hour ? hour : 12;
  const formattedTime = `${hour}:${minute < 10 ? "0" : ""}${minute} ${ampm}`;

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

  return (
    <View
      style={{
        backgroundColor: "black",
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
      }}
    >
      <ScrollView style={{ flex: 1, padding: 10 }}>
        {sortedTable && (
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={[styles.cell, styles.headerText]}>Branch</Text>
              <Text style={[styles.cell, styles.headerText]}>Points</Text>
              <Text style={[styles.cell, styles.headerText]}>Position</Text>
            </View>
          </View>
        )}
        {/* <FlatList
            data={Object.keys(pointsTable)}
            renderItem={renderItem}
            keyExtractor={(item) => item}
          /> */}
        {Object.keys(sortedTable).map((item, index) => {
          return (
            <View style={styles.row} key={index}>
              <Text style={styles.cell}>{item}</Text>
              <Text style={styles.cell}>{sortedTable[item].points}</Text>
              <Text style={styles.cell}>
                {sortedTable[item].position == 0
                  ? "-"
                  : sortedTable[item].position}
              </Text>
            </View>
          );
        })}

        <View
          style={{
            flex: 1,
            marginLeft: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {data.details.title}
          </Text>
          <Text style={{ color: "#b0afac", marginTop: 4 }}>
            {data.details.location}
          </Text>
          <Text style={{ color: "#b0afac" }}>{formattedDate}</Text>
          <Text style={{ color: "#b0afac" }}>{formattedTime}</Text>
          <Text style={{ color: "white", marginTop: 4 }}>
            {data.details.description}
          </Text>
        </View>
        <View style={{ minHeight: 100 }}></View>
      </ScrollView>
    </View>
  );
};

export default SpecificEvents;

const styles = StyleSheet.create({
  container: {
    flex: 2,
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
    // minHeight: 40,
    padding: 10,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "white",
    // padding: 15,
  },
  headerText: {
    fontWeight: "bold",
  },
});
