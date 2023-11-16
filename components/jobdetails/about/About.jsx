import React from 'react'
import { View, Text } from 'react-native'

import styles from './about.style'

const About = ({ info }) => {
  return (
    <View styles={styles.container}>
      <Text styles={styles.headText}>About The Job:</Text>
      <View styles={styles.contentBox}>
        <Text style={styles.contextText}>{info}</Text>
      </View>
    </View>
  )
}

export default About
