import { View, Text } from 'react-native'
import React from 'react'
import VerticalList from '@/components/VerticalList';
import { rawData } from '@/constants/data';

const App = () => {
  return (
    <View style={{flex:1,backgroundColor:"black"}}>
      <VerticalList data={rawData}/>
    </View>
  )
}

export default App;