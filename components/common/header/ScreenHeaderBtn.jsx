import React from "react";
import { View, Text, Share } from "react-native";
import { TouchableOpacity, Image } from "react-native";

import styles from "./screenheader.style";

const ScreenHeaderBtn = ({
  iconUrl,
  dimension,
  handlePress,
  share = false,
}) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Check out this wicked job on Theos job app",
        url: share,
      });
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <TouchableOpacity
      style={styles.btnContainer}
      onPress={share ? onShare : handlePress}
    >
      <Image
        source={iconUrl}
        resizeMode="cover"
        style={styles.btnImg(dimension)}
      />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
