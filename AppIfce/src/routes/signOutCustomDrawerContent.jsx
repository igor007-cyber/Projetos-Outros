import React, { useState, useEffect } from 'react'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Avatar, Title, Caption } from 'react-native-paper';

import { useAuth } from '../contexts/auth'

export default function signOutCustomDrawerContent(props) {
    const { navigation } = props
    const { signOut, user } = useAuth()
    const [avatarInitials, setAvatarInitials] = useState('')

    useEffect(() => {
        const arrayName = user.name.split(' ')

        const initials = arrayName
            .filter(word => {
                return word.length > 3
            }).map(word => {
                return word[0]
            }).join('')

        const selectedInitials = initials.length > 2 ? initials[0] + initials[1] : initials

        setAvatarInitials(selectedInitials.toUpperCase())

    })

    function handleSignOut() {
        signOut()
        navigation.closeDrawer()
    }

    return (
        <DrawerContentScrollView {...props}>
            
            <View style={styles.userContainer}>
                <Avatar.Text label={avatarInitials} />
                <View style={styles.userData}>
                    <Title
                        style={styles.userName}
                        numberOfLines={1}
                    >
                            { user.name }
                        </Title>
                    <Caption
                        style={styles.userEmail}
                        numberOfLines={1}
                    >
                        { user.email }
                    </Caption>
                </View>
            </View>

            <DrawerItemList {...props} />

            <DrawerItem
                label="Sair"
                onPress={handleSignOut}
                style={styles.btnOut}
            />

        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    userContainer: {
        padding: 10,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 15,
    },
    userData: {
        paddingLeft: 8,
        justifyContent: 'flex-start',
        width: Dimensions.get('window').width * 0.5
    },
    userName: {
        marginBottom: 0
    },
    userEmail: {
        marginTop: 0
    },
    btnOut: {
        textAlignVertical: 'bottom',
    }
})