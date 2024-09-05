import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { Title, TextInput, Checkbox, Chip, Button, Caption,  } from 'react-native-paper'

import api from '../../services/api'
import { useAuth } from '../../contexts/auth'
import styles from './styles'

export default () => {
    const { signIn } = useAuth()

    const [areas, setAreas] = useState([])
    const [paginationInfo, setPaginationInfo] = useState({
        current_page: 0,
        total_pages: 0
    })
    const [haveMoreAreas, setHaveMoreAreas] = useState(true)
    const [selectedAreas, setSelectedAreas] = useState([])

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [isIFCE, setIsIFCE] = useState(false)

    useEffect(() => {
        const { current_page, total_pages } = paginationInfo
        setHaveMoreAreas( !(current_page === total_pages && current_page !== 0) )
    }, [paginationInfo.current_page, paginationInfo.total_pages])

    // function handleGetAreas() {

    //     if (!haveMoreAreas) return

    //     const { current_page } = paginationInfo

    //     api.get(`areas?page=${current_page + 1}`)
    //         .then(response => {
    //             const areasFromAPI = response.data.data
    //             setAreas([...areas, ...areasFromAPI])

    //             setPaginationInfo({
    //                 current_page: response.data.current_page,
    //                 total_pages: response.data.last_page
    //             })

    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }

    useEffect(() => {
        api.get(`permissoes`)
            .then(response => {
                console.log(response.data)
                setPermissions()
            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    function handleSelectArea(id) {
        const alreadySelected = selectedAreas.findIndex(area => area === id)

        if (alreadySelected >= 0) {
            const filteredAreas = selectedAreas.filter(area => area !== id)
            setSelectedAreas(filteredAreas)
        } else {
            setSelectedAreas([...selectedAreas, id])
        }

    }

    function handleFormSubmit() {
        api.post(`/user`, {
            name,
            email,
            password,
            // password_confirmation: passwordConfirmation,
            is_ifce: isIFCE,
            telephone,
            permissions_id,
            campus_id
            // areas: selectedAreas,
        })
            .then(() => {
                signIn(email, password)
            })
            .catch(() => {
                alert('Tente novamente mais tarde')
            })
    }

    return (
        <ScrollView style={styles.registerContainer}>
            <Title style={styles.title}>CADASTRE-SE</Title>
            <View style={{ flex: 1 }}>
                <TextInput
                    label="Nome completo"
                    type="text"
                    value={name}
                    onChangeText={setName}
                    mode="flat"
                    style={styles.textInput}
                    autoCapitalize="words"
                    autoCompleteType="name"
                />
                <TextInput
                    label="E-mail"
                    type="text"
                    value={email}
                    onChangeText={setEmail}
                    mode="flat"
                    style={styles.textInput}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    keyboardType="email-address"
                />
                <TextInput
                    label="Telefone"
                    type="text"
                    autoCompleteType="tel"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                    mode="flat"
                    style={styles.textInput}
                    autoCapitalize="none"
                />
                <TextInput
                    label="Senha"
                    type="password"
                    value={password}
                    onChangeText={setPassword}
                    mode="flat"
                    style={styles.textInput}
                    autoCapitalize="none"
                    secureTextEntry={true}
                />
                {/* <TextInput
                    label="Confirme a senha"
                    type="password"
                    value={passwordConfirmation}
                    onChangeText={setPasswordConfirmation}
                    mode="flat"
                    style={styles.textInput}
                    autoCapitalize="none"
                    secureTextEntry={true}
                /> */}
                <View style={styles.viewCheckbox}>
                    <Checkbox.Item
                        //status="unchecked"
                        label="Integrante do IFCE"
                        status={isIFCE ? 'checked' : 'unchecked'}
                        onPress={() => setIsIFCE(!isIFCE)}
                    />
                </View>
                {/* <View>
                    <Caption>Selecione suas áreas de interesse</Caption>
                </View> */}
                {/* <View style={styles.containerChips}>
                    {areas.map(area => (
                        <Chip
                            key={area.id}
                            style={[
                                styles.chips,
                                selectedAreas.includes(area.id) ? styles.selectedArea : {}
                            ]}
                            selected={selectedAreas.includes(area.id)}
                            selectedColor="#FFF"
                            mode="outlined"
                            onPress={() => handleSelectArea(area.id)}
                        >
                            {area.nome}
                        </Chip>
                    ))}
                </View> */}

                {/* {
                    haveMoreAreas ? (
                        <View style={styles.btnSeeMoreAreas}>
                            <Caption
                                onPress={() => {}}
                            >VER MAIS ÁREAS</Caption>
                        </View>
                    ) : (
                            null
                    )
                } */}

                <Button
                    onPress={handleFormSubmit}
                    mode="contained"
                    style={styles.registerButton}
                >Cadastrar</Button>
            </View>
        </ScrollView>
    )
}