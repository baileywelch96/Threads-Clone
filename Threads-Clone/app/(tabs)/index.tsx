import {
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import Lottie from "lottie-react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import React, { useRef } from "react";
import { createRandomUser } from "../../utils/generate-dummy-data";
import { ThreadContext } from "../../context/thread-context";
import ThreadsItem from "../../components/ThreadsItem";

const user = createRandomUser();

console.log(user);

export default function TabOneScreen() {
  const animationRef = useRef<Lottie>(null);
  const threads = React.useContext(ThreadContext);

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingTop: Platform.select({ android: 30 }),
        }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            tintColor={"transparent"}
            onRefresh={() => {
              animationRef.current?.play();
            }}
          />
        }
      >
        <Lottie
          ref={animationRef}
          source={require("../../lottie-animations/threads.json")}
          loop={false}
          autoPlay
          style={{ width: 90, height: 90, alignSelf: "center" }}
        />
        {threads.map((thread) => (
          <ThreadsItem key={thread.id} {...thread} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
