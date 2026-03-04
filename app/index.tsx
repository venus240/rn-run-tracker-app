import React from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

const runing = require('../assets/running.png');

export default function index() {
  return (
    <View>
      <Image source={runing} style={{ width: 200, height: 200 }} />
      <Text>Run Tracker</Text>
      <Text>วื่งเพื่อสุขภาพ</Text>
      <ActivityIndicator size="large" color="#888ad6" />

    </View>
  )
}

const styles = StyleSheet.create({})