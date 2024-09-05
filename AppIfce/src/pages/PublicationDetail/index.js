import React, { useState, useEffect, useCallback } from 'react'
import { Text, ScrollView, View, Linking, BackHandler, Alert } from 'react-native'
import { Card, Title, Caption } from 'react-native-paper'
import { format, parseISO } from 'date-fns'
import ptbr from 'date-fns/locale/pt-BR'
import AutoHeightWebView from 'react-native-autoheight-webview'
import { useNavigation } from '@react-navigation/native'

import api from '../../services/api'
import { extractFilenameFromUrl } from '../../helpers/extractFilenameFromUrl'
import styles from './styles'
import { useAuth } from '../../contexts/auth'
import Appbar from '../../template/AppBar'

export default props => {
    const navigation = useNavigation()

    const { publicationID } = props.route.params
    const { refreshToken } = useAuth()

    const [loaded, setLoaded] = useState(false)
    const [publication, setPublication] = useState({})

    useEffect(() => {

        function handleGetPublication() {
            api.get(`publications/show/${publicationID}`)
                .then(response => {
                    console.log('deu certo')
                    const publicationData = response.data
                    setPublication({
                        ...publicationData,
                        data_horario: handleDateFormat(publicationData.data_horario)
                    })
                })
                .catch(error => {
                    console.log('deu erro ')
                    const statusCode = error.request.status
                    if (statusCode && statusCode === 401) {
                        refreshToken(handleGetPublication)
                    } else {
                        handlePublicationNotFound()
                    }
                }).finally(() => {
                    setLoaded(true)
                })
        }

        handleGetPublication()

    }, [])

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backAction);
        };
    }, []);

    const backAction = () => {
        
        navigation.replace('PublicationsFeed')

        return true;
    };

    function handleDateFormat(date) {
        const isoDate = parseISO(date)
        const formattedDate = format(
            isoDate,
            `dd 'de' MMMM 'de' yyyy', às' HH:mm`,
            {
                locale: ptbr
            }
        )
        return formattedDate
    }

    function handleNavigateToAttachment(url) {
        Linking.openURL(url)
    }

    function handlePublicationNotFound() {
        Alert.alert('Algo deu errado!', 'Esta publicação não está mais disponível')
        navigation.push('PublicationsFeed')
    }

    return loaded ? (
        <ScrollView
            style={styles.detailContainer}
            showsVerticalScrollIndicator={false}
        >

            <Appbar
                title={publication.titulo}
                showBackButton={true}
                backButtonNavigateTo="PublicationsFeed"
            />

            <Card
                key={publication.id}
            >
                {
                    publication.capa && <Card.Cover source={{ uri: publication.capa }} />
                }

                <Card.Content>
                    <Title>
                        {publication.titulo}
                    </Title>
                    <Caption>
                        Por: {publication.collaborators.persons.user.name}
                    </Caption>
                    <Caption>
                        {publication.data_horario}
                    </Caption>

                    <View
                        style={styles.description}
                    >
                        <AutoHeightWebView
                            scrollEnabled={true}
                            scrollEnabledWithZoomedin={false}
                            style={styles.screenFullWidth}
                            source={{
                                html: `
                                <div style="font-size: 0.9rem; color: #444; text-align: justify; min-height: 120px">
                                    ${publication.descricao}
                                </div>
                            ` }}
                            scalesPageToFit={true}
                            viewportContent={'width=device-width, user-scalable=no'}
                        />
                    </View>

                    {
                        publication.anexos &&

                        <View style={styles.containerAttachments}>

                            <Title>ANEXOS</Title>

                            {publication.anexos.map(anexo => (
                                <View key={anexo.image_path}>
                                    <Text style={styles.fileName} onPress={() => handleNavigateToAttachment(anexo.url)}>
                                        {extractFilenameFromUrl(anexo.url)}
                                    </Text>
                                </View>
                            ))}

                        </View>
                    }

                </Card.Content>
            </Card>
        </ScrollView>
    ) : (
            <View style={styles.loadingText}>
                <Caption >
                    CARREGANDO . . .
                </Caption>
            </View>
        )
}