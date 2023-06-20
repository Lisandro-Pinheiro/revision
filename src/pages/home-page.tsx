import { View, Text, StyleSheet, FlatList } from "react-native";
import { Image } from 'expo-image'
import { useEffect, useState } from "react";
import CountryEntity from "../entities/country-entity";

export default function HomePage() {

    const [countries, setCountries] = useState<CountryEntity[]>([])
    useEffect(() => {

        var requestOptions = {
            method: 'GET',
        };

        var countryList: CountryEntity[] = [];

        fetch("https://restcountries.com/v3.1/all", requestOptions)
            .then(response => response.json())
            .then(result => {
                result.map(item => {
                    countryList.push({
                        id: item.name.common,
                        flagUrl: item.flags.svg,
                        name: item.name.common,
                        ptName: item.translations.por.common,
                        population: item.population
                    })
                })
            })
            .catch(error => console.log('error', error))

        setCountries(countryList);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Lista de Países</Text>
            <FlatList
                renderItem={(country) =>
                    <View id={country.item.id} style={styles.card}>
                        <View style={styles.flag}>
                            <Image style={styles.flag} source={{ uri: country.item.flagUrl }} />
                        </View>
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: '600' }}>{country.item.name}</Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', opacity: 0.6, fontStyle: 'italic' }}>{country.item.ptName}</Text>
                            <Text>População: {country.item.population}</Text>
                        </View>
                    </View>
                }

                data={countries}
                keyExtractor={item => item.id}
            ></FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#5a5a5a',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 50,
    },

    title: {
        fontSize: 30,
        fontWeight: '600',
        marginBottom: 30,

    },

    card: {
        aspectRatio: 3.5,
        height: 100,
        backgroundColor: '#fff',
        elevation: 15,
        shadowColor: '#000',
        borderRadius: 17,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16,
        flexDirection: 'row',
        marginVertical: 5,

    },

    flag: {
        width: 70,
        height: 70,
        marginRight: 16,
    }
})