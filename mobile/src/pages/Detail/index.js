import React from 'react';
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Text, View, Image, TouchableOpacity, Linking } from 'react-native';

import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png'
import styles from './styles';

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();
    
    const incident = route.params.incident;
    const message = `Olá ${incident.name}, estou entrando em contato para ajudar no caso ${incident.title} com valor de ${incident.value}`;
    
    function navigateBack(){
        navigation.goBack();
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Heroi do Caso: ${incident.title}`,
            recipients: [incident.email],
            body: message
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity style={styles.detailButton} onPress={ navigateBack } >
                        <Feather name="arrow-left" size={28} color="#E02041" />
                </TouchableOpacity>
            </View>
            <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG</Text> 
                    <Text style={styles.incidentValue}>{incident.name}</Text> 

                    <Text style={styles.incidentProperty}>CASO</Text> 
                    <Text style={styles.incidentValue}>{incident.title}</Text> 

                    <Text style={styles.incidentProperty}>VALOR</Text> 
                    <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency : 'BRL'}).format(incident.value) }</Text> 
        
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia</Text> 
                <Text style={styles.heroTitle}>Seja o heroi desse caso.</Text> 

                <Text style={styles.heroDescription}>Entre em Contato</Text> 
               
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={ sendWhatsapp } >
                        <Text style={styles.actionText}>WhatsApp</Text> 
                        <Feather name="arrow-right" size={16} color="#E02041" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={ sendMail } >
                        <Text style={styles.actionText}>E-mail</Text> 
                        <Feather name="arrow-right" size={16} color="#E02041" />
                    </TouchableOpacity>
                </View>
            </View>
        </View> 
       
    )
    
}