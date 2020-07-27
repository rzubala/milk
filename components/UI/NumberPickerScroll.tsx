import React, {useEffect, useRef, useCallback, useState} from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const HEIGHT = 35

interface NumberPickerProps {
    pickerStyle?: object;
    min: number;
    max: number;
    step: number;
    value: number;
    onValueSelected: (value: number) => void
  }
interface ItemData {
    id: number,
    value: string
}
const NumberPickerScroll = ({value, onValueSelected, min, max, step} : NumberPickerProps) => {
  const scrollRef = useRef(null)

  const buildNumbers = useCallback(() : ItemData[] => {
    const length = Math.floor((max - min) / step) + 1
    const numbers = Array.from({ length: length }, (x, i) => i).map(n => { 
      const value = min + n * step;
      return {id: value, value: value.toString()}
    });
    numbers.unshift({id: -2, value: ''})
    numbers.unshift({id: -1, value: ''})
    numbers.push({id: -3, value: ''})
    numbers.push({id: -4, value: ''})
    return numbers
  }, [min, max, step])

  const onScroll = (value) => {
      onValueSelected(value * step)
  }

  const markValue = () => {
    scrollRef.current?.scrollTo({x: 0, y: value * HEIGHT, animated: true})
  }

  useEffect(() => {
    markValue()
  }, [value])

  const items = buildNumbers().map((n) => (
    <View style={styles.item} key={n.id}>
      <Text style={styles.itemText}>{n.value}</Text>
    </View>
  ));

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        snapToAlignment='start'
        decelerationRate="fast"
        snapToInterval={HEIGHT}
        
        onMomentumScrollEnd={(event) => onScroll(Math.round(event.nativeEvent.contentOffset.y/35))}
      >
        {items}
      </ScrollView>
      <View style={styles.markBox}></View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    margin: 10,
    width: 40,
    height: 5 * HEIGHT
  },  
  scrollContainer: {
    width: 50,
    height: 5 * HEIGHT,
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: Colors.inactiveLite
  },
  item: {
    height: HEIGHT,
    width: "100%",
    justifyContent: 'center'
  },
  itemText: {
    textAlign: "center",
    fontSize: 17
  },
  markBox: {
    borderWidth: 1,
    borderColor: Colors.accent,
    height: HEIGHT,
    width: 40,
    position: "absolute",
    left: 5,
    top: 2 * HEIGHT,
  },
});

export default NumberPickerScroll;
