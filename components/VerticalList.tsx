import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  StyleSheet,
  Easing,
} from "react-native";
import React from "react";
import Animated, {
    Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const { height } = Dimensions.get("screen");
const spacing = 4;
const itemSize = height * 0.72;
const itemFullSize = itemSize + spacing * 2;

type Props = {
  item: any[];
  index: number;
  scrollY: SharedValue<number>;
};

export function AnimatedCard({ item, index, scrollY }: Props) {
  const stylez = useAnimatedStyle(() => {
    
    return {
      opacity: interpolate(
        scrollY.value,
        [index - 1, index, index + 1],
        [0.3, 1, 0.3]
      
      ),
      transform: [{
        scale:interpolate(
            scrollY.value,
            [index - 1, index, index + 1],
            [0.95, 1, 0.95]
          ),
      }]
    };
  });
  return (
    <Animated.View
      style={[{
        flex: 1,
        height: itemSize,
        padding: spacing * 2,
        borderRadius: 8,
        gap: spacing,
      },stylez]}
    >
      <Image
        source={{ uri: item?.image }}
        style={[StyleSheet.absoluteFillObject, { borderRadius: 12 }]}
        blurRadius={50}
      />
      <Image
        source={{ uri: item?.image }}
        style={{ flex: 1, height: itemSize * 0.04, borderRadius: 12 }}
      />
      <View style={{ gap: spacing }}>
        <Text style={{ fontWeight: "700", fontSize: 24, color: "#ffff" }}>
          {item?.title}
        </Text>
        <Text style={{ fontWeight: "700", color: "#ffff" }}>
          Description:-{" "}
          <Text style={{ fontWeight: "500", opacity: 0.6 }} numberOfLines={3}>
            {item?.description?.slice(0, 165)}...
          </Text>
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: spacing,
          marginVertical: spacing * 2,
        }}
      >
        <Image
          source={{
            uri: "https://img.icons8.com/3d-fluency/94/bookmark-ribbon.png",
          }}
          style={{ width: 24, aspectRatio: 1, borderRadius: 12 }}
        />
        <Text style={{ fontWeight: "700", fontSize: 14, color: "#ffff",opacity:0.7 }}>
          Mr.Edger Crysthopher
        </Text>
      </View>
    </Animated.View>
  );
}

const VerticalList = ({ data }) => {
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y/itemFullSize;
  });

  return (
    <Animated.FlatList
      contentContainerStyle={{
        paddingHorizontal: spacing * 5,
        gap: spacing * 2,
        paddingVertical: (height - itemFullSize) / 3,
      }}
      data={data}
      decelerationRate={"normal"}
      snapToInterval={itemFullSize}
      renderItem={({ item, index }) => (
        <AnimatedCard item={item} index={index} scrollY={scrollY} />
      )}
      onScroll={onScroll}
      scrollEventThrottle={16} // 1000/60 frames
    />
  );
};

export default VerticalList;
