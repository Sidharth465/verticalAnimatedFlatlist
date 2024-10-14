import { View, Text, FlatList, Dimensions, Image,StyleSheet } from "react-native";
import React from "react";

const VerticalList = ({ data }) => {
  const { height } = Dimensions.get("screen");
  const spacing = 4;
  const itemSize = height * 0.72;
  const itemFullSize = itemSize + spacing * 2;

  function AnimatedCard({ item }) {
    return (
      <View style={{ flex: 1,  height: itemSize,padding:spacing*2,borderRadius:8 ,gap:spacing}}>
         <Image source={{uri:item?.image}}
             style={[StyleSheet.absoluteFillObject,{borderRadius:12}]}
             blurRadius={50}/>
        <Image
          source={{ uri: item?.image }}
          style={{ flex: 1, height: itemSize * 0.04,borderRadius:12 }}
        />
        <View style={{gap:spacing}}>
            <Text style={{fontWeight:"700",fontSize:24}}>{item?.title}</Text>
            <Text style={{fontWeight:"700"}}>Description:- <Text style={{fontWeight:"500"}}>{item?.description}</Text></Text>
        </View>

        <View style={{flexDirection:"row",alignItems:"center",gap:spacing}}>
            <Image source={{uri:"https://img.icons8.com/3d-fluency/94/bookmark-ribbon.png"}}
             style={{ width: 24, aspectRatio: 1,borderRadius:12 }}/>
             <Text style={{fontWeight:"700",fontSize:14}}>Mr.Edger Crysthopher</Text>
        </View>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={{ padding: spacing * 3, gap: spacing * 2 }}
      data={data}
      decelerationRate={"fast"}
      snapToInterval={itemFullSize}
      renderItem={({ item, index }) => <AnimatedCard item={item} />}
    />
  );
};

export default VerticalList;
