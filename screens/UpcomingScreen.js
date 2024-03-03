import TopMostCard from "../Components/TopMostCard";
import UpcomingEventCard from "../Components/UpcomingEventCard";
import { useState } from "react";
import { FlatList } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { StyleSheet } from "react-native";

import { View } from "react-native";

function UpcomingScreen(props) {
    
    const [upComingEvents, setUpcomingEvents] = useState([
        {
            gameName: 'CSS Battle',
            id: 'CSS Battle',
            teamA: 'ECE-META',
            teamB: 'CSE',
        },
        {
            gameName: 'Monoact',
            id: 'Monoact',
            teamA: 'ECE-META',
            teamB: 'CSE',
        },
        {
            gameName: 'Football',
            id: 'Football',
            teamA: 'ECE-META',
            teamB: 'CSE',
        }
    ]);

    return(
        <View style={styles.eventsContainer}>
            <FlatList 
            data={upComingEvents}
            renderItem={ (itemData)=>{
        
            return (
                <UpcomingEventCard
                gameName={itemData.item.gameName} 
                id={itemData.item.id}
                teamA={itemData.item.teamA} 
                teamB={itemData.item.teamB} 
                scoreA={itemData.item.scoreA} 
                scoreB={itemData.item.scoreB} 
                />
            );
            }} 
            keyExtractor={(item, index) => {
            return item.id;
            }}
            alwaysBounceVertical={false}
            />
           
        </View>
        
    );
}

export default UpcomingScreen;

const styles = StyleSheet.create({
    eventsContainer:{
        flex:1,
    }
})