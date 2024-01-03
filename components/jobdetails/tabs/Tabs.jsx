import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SIZES } from "../../../constants";
import styles from "./tabs.style";

const Tabs = ({ tabs, setActiveTab, activeTab }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => setActiveTab(item)}
              style={styles.btn(activeTab, item)}
            >
              <Text style={styles.btnText(activeTab, item)}>{item}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item}
        contentContainerStyle={{ columnGap: SIZES.small / 2 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Tabs;
