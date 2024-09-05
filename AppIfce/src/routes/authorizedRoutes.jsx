import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import SignOutCustomDrawerContent from './signOutCustomDrawerContent'

import Publications from './stackNavigationOfPublications'
import ProjectsFeed from '../pages/ProjectsFeed'

const AppDrawer = createDrawerNavigator()

export default () => (
    <AppDrawer.Navigator
        drawerPosition="right"
        openByDefault={false}
        drawerContent={props => <SignOutCustomDrawerContent {...props} />}
    >
        <AppDrawer.Screen name="Publicações" component={Publications} />
        <AppDrawer.Screen name="Projetos" component={ProjectsFeed} />
    </AppDrawer.Navigator>
)