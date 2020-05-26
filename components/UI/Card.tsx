import React from 'react'
import {View, StyleSheet} from 'react-native'

const Card = props => {
    return (
        <View style={{...styles.card, ...props.style}}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {        
        shadowColor: 'black',
        shadowOpacity: 0.56,
        shadowOffset: {
            width: 0, height: 1
        },
        elevation: 1,
        borderRadius: 1,
        backgroundColor: 'white'
    }
})

export default Card