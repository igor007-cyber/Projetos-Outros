import React, { useEffect, useState } from 'react'
import { View, FlatList, Image, BackHandler } from 'react-native'
import { Card, Title, IconButton, Caption, TextInput } from 'react-native-paper'
import { format, parseISO } from 'date-fns'
import ptbr from 'date-fns/locale/pt-BR'
import AutoHeightWebView from 'react-native-autoheight-webview'

import { useAuth } from '../../contexts/auth'
import { useNotification } from '../../contexts/notifications'
import api from '../../services/api'
import Appbar from '../../template/AppBar'

import styles from './styles'

export default props => {
    const { refreshToken } = useAuth()
    const { navigation } = props
    const [publications, setPublications] = useState([])
    const [loadingPublications, setLoadingPublications] = useState(false)
    const [totalPublications, setTotalPublications] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    const { notification, setNotification } = useNotification()

    useEffect(() => {
        if (notification) {
            const { id } = notification.notification.request.content.data
            setNotification(false)
            navigation.push('PublicationDetail', { publicationID: id })
        }
    }, [notification])

    useEffect(() => {
        handleGetPublications()
    }, [])

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backAction);
        };
    }, []);

    const backAction = () => {

        BackHandler.exitApp()

        return true;
    };

    function handleGetPublications() {

        if (loadingPublications) {
            return;
        }

        if (totalPublications > 0 && publications.length == totalPublications) {
            return;
        }

        setLoadingPublications(true)

        api.get(`publications?page=${currentPage}`)
            .then(response => {
                const publicationsFromApi = response.data.data
                setPublications([...publications, ...publicationsFromApi])

                setTotalPublications(response.data.total)

                setCurrentPage(currentPage + 1);
                setLoadingPublications(false);

            })
            .catch((error) => {
                const statusCode = error.request.status
                console.log('Erro ao buscar publicações', statusCode)
                if (statusCode && statusCode >= 400) {
                    // refreshToken(handleGetPublications)
                }
            })
    }

    function handleDateFormat(date) {
        const ISOdate = parseISO(date)
        const formattedDate = format(
            ISOdate,
            `dd 'de' MMMM 'de' yyyy', às' HH:mm`,
            {
                locale: ptbr
            }
        )
        return formattedDate
    }

    function handleNavigateToDetail(id) {
        navigation.push('PublicationDetail', { publicationID: id })
    }

    function teste() {
        console.log('Fim do scrollView')
    }

    if (!publications) {
        return <h1>Nenhuma publicação</h1>
    }

    return (
        <View
            style={styles.publicationsContainer}
        >

            <Appbar
                title="IFon"
                showBellButton={true}
            />

            <View style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-around',
                marginVertical: 10,
            }}>
                <Image
                    source={require('../../assets/logo-ifce.png')}
                    style={{
                        width: 100,
                        height: 40,
                        alignSelf: 'center',
                        marginBottom: 5
                    }}
                />
                <TextInput
                    label="Buscar publicação    &#128269;"
                    mode="outlined"
                    dense={true}
                    style={{
                        width: 200,
                    }}
                />
            </View>


            <FlatList
                data={publications}
                showsVerticalScrollIndicator={false}
                onEndReached={handleGetPublications}
                onEndReachedThreshold={2}

                keyExtractor={publications => String(publications.id)}
                renderItem={({ item: publication }) => (
                    <Card
                        key={publication.id}
                        onPress={() => handleNavigateToDetail(publication.id)}
                        style={styles.wrapPublication}
                    >
                        <Card.Cover source={{ uri: publication.capa }} />
                        <Card.Content>
                            <Title
                                numberOfLines={2}
                                style={styles.title}
                            >
                                {publication.titulo}
                            </Title>
                            <View>
                                <AutoHeightWebView
                                    style={styles.screenFullWidth}
                                    source={{
                                        html: `
                                                <div
                                                    style="
                                                        font-size: 0.9rem;
                                                        color: #444;
                                                        text-align: justify;
                                                        display: block;
                                                        display: -webkit-box;
                                                        -webkit-line-clamp: 3;
                                                        -webkit-box-orient: vertical;
                                                        overflow: hidden;
                                                        text-overflow: ellipsis;
                                                        line-height: 1.2em;
                                                        max-height: 4.6em;
                                                    "
                                                >
                                                    ${publication.descricao}
                                                </div>
                                            ` }}
                                    scalesPageToFit={true}
                                    viewportContent={'width=device-width, user-scalable=no'}
                                />
                            </View>
                            <View
                                style={styles.footPublication}
                            >
                                <Caption>
                                    {handleDateFormat(publication.data_horario)}
                                </Caption>

                                <IconButton
                                    icon="share"
                                    style={styles.btnShare}
                                />
                            </View>


                        </Card.Content>
                    </Card>
                )}
            />

        </View>
    )
}