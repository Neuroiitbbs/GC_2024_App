import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import TechCultEventCard from "../../Components/TechCultEventCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { backend_link } from "../../utils/constants";
import Loader from "../../Components/Loader";

const CultEventScreen = ({ navigation }) => {
  const [cultEvents, setCultEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          backend_link + "api/event/getEventByCategory?category=cult"
        );
        const data = response.data.events;
        const cultdata = [];
        data.map((item) => {
          item !== null && cultdata.push(item);
        });
        setCultEvents(cultdata);
        console.log(cultdata);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  console.log("cult", cultEvents);
  return (
    <View style={styles.eventsContainer}>
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
          data={cultEvents}
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

export default CultEventScreen;

const styles = StyleSheet.create({
  eventsContainer: {
    flex: 5,
    maxHeight: "70%",
  },
});
