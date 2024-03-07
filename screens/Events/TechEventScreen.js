import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import TechCultEventCard from "../../Components/TechCultEventCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { backend_link } from "../../utils/constants";
import Loader from "../../Components/Loader";

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
        const techdata = [];
        data.map((item) => {
          item !== null && techdata.push(item);
        });
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
          top={"10%"}
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
