import React from 'react';
import { View, ActivityIndicator } from 'react-native'

const Loader = ({ loading, size = 'large' }) => { 
  return (
    loading ? 
    <View>
      <ActivityIndicator
        size={size}
        style={{ marginTop: 200 }}
      />
    </View> : null
  )
}

export default Loader