import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Appbar } from 'react-native-paper'

import styles from './styles'

export default (props) => {
    const navigation = useNavigation()

    const {
        title,
        showBackButton = false,
        backButtonNavigateTo,
        showBellButton = false,
        showSearchButton = false
    } = props

    function handleToggleDrawerMenu() {
        navigation.toggleDrawer()
    }

    function handleNavigateBackButton(to) {
        if (!to) {
            navigation.goBack()
        }

        navigation.push(to)

    }

    return (
        <Appbar
            style={styles.appBarContainer}
        >
            {
                (showBackButton && backButtonNavigateTo) && <Appbar.Action icon="arrow-left" onPress={() => handleNavigateBackButton(backButtonNavigateTo)} />
            }
            <Appbar.Content title={title} />
            {showBellButton && <Appbar.Action icon="bell" onPress={() => { }} />}
            {showSearchButton && <Appbar.Action icon="magnify" onPress={() => { }} />}
            <Appbar.Action icon="menu" onPress={handleToggleDrawerMenu} />
        </Appbar>
    )
}