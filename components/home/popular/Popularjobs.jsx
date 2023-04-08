import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common//cards/popular/PopularJobCard";
import useFetch from "../../../hook/useFetch";

import styles from "./popularjobs.style";

const Popularjobs = () => {
  const router = useRouter();

  const [selectedJob, setSelectedJob] = useState();
  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };
  const { data, isLoading, error } = useFetch("search", {
    query: "Jobs in Ghana",
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" colors={COLORS.primary} />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <PopularJobCard
              item={item}
              selectedJob={selectedJob}
              handleCardPress={handleCardPress}
            />
          )}
          keyExtractor={(item) => item.job_id}
          contentContainerStyle={{ columnGap: SIZES.medium }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}

      <View style={styles.cardsContainer}></View>
    </View>
  );
};

export default Popularjobs;
