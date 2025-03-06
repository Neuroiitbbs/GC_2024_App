import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { backend_link } from "../utils/constants";

const EventsContext = createContext({
  events: [],
  liveEvents: [],
  upcomingEvents: [],
  pastEvents: [],
  isLoading: false,
  fetchAllLiveEvents: async () => {},
});

const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [liveEvents, setLiveEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sortData = (data) => data.sort((a, b) => a.id.localeCompare(b.id));

  const fetchAllLiveEvents = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${backend_link}api/event/getAllLiveEvents`);
      const data = response.data.events;
      console.log(data);

      let events = data.flatMap((item) => {
        const eventName = item.eventId;
        const subEvents = item.subEvents;
        const gameName = eventName;

        return subEvents.map((match_item) => {
          const teamA = match_item.data.points.teamA;
          const teamB = match_item.data.points.teamB;
          const details = match_item.data.details;

          return {
            details: details,
            status: match_item.data.status, // Live, Upcoming, Past
            gameName: gameName,
            id: match_item.subEventId,
            timeStamp: match_item.data.timeStamp, // Event start time
            endTimeStamp: match_item.data.endTimeStamp, // Event end time
            teamA: teamA?.name || match_item.subEventId.split(" vs ")[0],
            teamB: teamB?.name || match_item.subEventId.split(" vs ")[1],
            scoreA: teamA?.points || 0,
            scoreB: teamB?.points || 0,
            betsA: teamA?.bets,
            betsB: teamB?.bets,
            playersA: teamA?.players,
            playersB: teamB?.players,
          };
        });
      });

      events = sortData(events);
      setEvents(events);
      await AsyncStorage.setItem("events", JSON.stringify(events));

      // Categorizing events into Live, Upcoming, and Past
      const now = Date.now();
      setLiveEvents(events.filter((event) => event.details.timestamp <= now && event.details.endTimeStamp >= now));
      setUpcomingEvents(events.filter((event) => event.details.timestamp > now));
      setPastEvents(events.filter((event) => event.details.endTimeStamp < now));

      console.log(events);
      
    } catch (err) {
      console.error("Error fetching events:", err);
      // Alert.alert("Error", "Something went wrong", [{ text: "Okay" }]);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchAllLiveEvents();
  // }, []);

  return (
    <EventsContext.Provider
      value={{
        events,
        liveEvents,
        upcomingEvents,
        pastEvents,
        isLoading,
        fetchAllLiveEvents,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export { EventsProvider, EventsContext };
