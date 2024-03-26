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

const TechEventScreen = ({ navigation, search }) => {
  const [loading, setLoading] = useState(true);
  const [techEvents, setTechEvents] = useState([]);

  const [filteredData, setFilteredData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    console.log(search);
    if (search.length == 0 || !search) {
      setFilteredData(techEvents);
      return;
    }
    const data = techEvents.filter((item) => {
      let title = item?.data?.details?.title.toLowerCase();
      let event = item?.data?.eventId.toLowerCase();
      const location = item?.data?.details?.location.toLowerCase();
      return (
        title?.includes(search.toLowerCase()) ||
        event?.includes(search.toLowerCase()) ||
        location?.includes(search.toLowerCase())
      );
    });
    setFilteredData(data);
  }, [search, dataLoaded]);

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
        setDataLoaded(true);
        setFilteredData(techdata);
        console.log(techdata[0]);
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
          top={300}
          bottom={0}
          setModalVisible={setLoading}
        />
      )}
      {!loading && (
        <FlatList
          data={filteredData}
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
    // paddingTop: 10,
    // paddingBottom:20,
  },
});
