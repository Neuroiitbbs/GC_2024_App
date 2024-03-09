import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import TechCultEventCard from "../../Components/TechCultEventCard";
import { backend_link } from "../../utils/constants";
import Loader from "../../Components/Loader";
import axios from "axios";

const sortData = (data) => {
  console.log("data", data);

  let prevdata = [];
  let nextdata = [];
  data.map((item) => {
    if (
      new Date(item.data.details?.timestamp) >
      new Date() - 24 * 60 * 60 * 1000
    ) {
      nextdata.push(item);
    } else {
      prevdata.push(item);
    }
  });
  nextdata.sort((a, b) => {
    return (
      new Date(a.data.details?.timestamp) - new Date(b.data.details?.timestamp) //sort by date ascending
    );
  });
  prevdata.sort((a, b) => {
    return (
      new Date(b.data.details?.timestamp) - new Date(a.data.details?.timestamp) //sort by date descending
    );
  });

  return nextdata.concat(prevdata);
};

const TechEventScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [techEvents, setTechEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          backend_link + "api/event/getEventByCategory?category=tech"
        );
        const data = response.data.events;
        let techdata = [];
        data.map((item) => {
          item !== null && techdata.push(item);
        });
        techdata = sortData(techdata);
        setTechEvents(techdata);
        console.log(techdata);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log("tech", techEvents);
  return (
    <View style={styles.eventsContainer}>
      {/* <TechCultEventCard data={data[0].data} /> */}
      {loading && (
        <Loader
          visible={loading}
          top={200}
          bottom={0}
          setModalVisible={setLoading}
        />
      )}
      {!loading && (
        <FlatList
          data={techEvents}
          renderItem={(itemData) => {
            return (
              <TechCultEventCard data={itemData} navigation={navigation} />
            );
          }}
          keyExtractor={(item, index) => {
            return item.data.details.title + index;
          }}
          alwaysBounceVertical={false}
        />
      )}
    </View>
  );
};

export default TechEventScreen;

const styles = StyleSheet.create({
  eventsContainer: {
    flex: 5,
    maxHeight: "70%",
  },
});
