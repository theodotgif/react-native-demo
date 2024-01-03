import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { icons, SIZES } from "../../../constants";
import styles from "./welcome.style";

const Welcome = ({ searchTerm, setSearchTerm, handlePress }) => {
  const [activeJobType, setActiveJobType] = useState("Full-time");
  const router = useRouter();
  const jobTypes = ["Full-time", "Part-time", "Contractor"];

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Theo</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            value={searchTerm}
            onChangeText={(text) => {
              setSearchTerm(text);
            }}
            style={styles.searchInput}
            placeholder="Search for jobs"
          />
        </View>
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => handlePress()}
        >
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setActiveJobType(item);
                  router.push(`/search/${item}`);
                }}
                style={styles.tab(activeJobType, item)}
              >
                <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
