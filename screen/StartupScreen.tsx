import React, {useEffect} from 'react'
import {View, ActivityIndicator, StyleSheet} from 'react-native'
import {useDispatch} from 'react-redux'
import NetInfo from "@react-native-community/netinfo";

import {Colors} from '../constants/colors'
import * as authActions from '../store/actions/auth'

const StartupScreen = props => {
    const dispatch = useDispatch()

    useEffect(() => {
        const tryLogin = async () => {
            dispatch(authActions.login())
        }
        tryLogin()
    }, [dispatch])

    return (
        <View style={styles.screen}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default StartupScreen