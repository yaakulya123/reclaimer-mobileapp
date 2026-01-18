import * as Location from 'expo-location';
import { Clock, List, Map as MapIcon, Navigation, Search, Star } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Linking, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';

import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

// Mock Kiosk Data with Enhanced Details
const KIOSKS = [
    {
        id: 1,
        title: 'EcoPoint Downtown',
        partner: 'EcoPartner Recycling',
        address: '123 Market St',
        description: 'Accepts: E-waste, Textiles',
        lat: 37.78825,
        lng: -122.4324,
        type: 'mixed',
        category: ['E-Waste', 'Textiles'],
        rating: 4.8,
        reviews: 124,
        hours: '08:00 AM - 10:00 PM',
        distance: '0.8 km'
    },
    {
        id: 2,
        title: 'Green Cycle Station',
        partner: 'City Waste Mgmt',
        address: '450 Valencia St',
        description: 'Accepts: Plastic, Glass',
        lat: 37.78300,
        lng: -122.4220,
        type: 'bottles',
        category: ['Glass/Plastic'],
        rating: 4.2,
        reviews: 85,
        hours: '24 Hours',
        distance: '1.2 km'
    },
    {
        id: 3,
        title: 'TechReclaim Hub',
        partner: 'TechRecyclers Inc.',
        address: '880 Harrison St',
        description: 'Accepts: Electronics Only',
        lat: 37.79250,
        lng: -122.4140,
        type: 'ewaste',
        category: ['E-Waste'],
        rating: 4.9,
        reviews: 210,
        hours: '09:00 AM - 06:00 PM',
        distance: '2.5 km'
    },
    {
        id: 4,
        title: 'Textile Drop-Off',
        partner: 'Community Clothiers',
        address: '200 Lake St',
        description: 'Accepts: Clothing, Shoes',
        lat: 37.78500,
        lng: -122.4500,
        type: 'mixed',
        category: ['Textiles'],
        rating: 4.5,
        reviews: 45,
        hours: '10:00 AM - 08:00 PM',
        distance: '3.1 km'
    },
    {
        id: 5,
        title: 'BottleBank Central',
        partner: 'Recycle Global',
        address: '550 Geary St',
        description: 'Accepts: Bottles, Cans',
        lat: 37.78600,
        lng: -122.4100,
        type: 'bottles',
        category: ['Glass/Plastic'],
        rating: 4.0,
        reviews: 320,
        hours: '24 Hours',
        distance: '0.5 km'
    },
    {
        id: 6,
        title: 'Mobile E-Waste Unit',
        partner: 'EcoTech',
        address: '1000 Van Ness',
        description: 'Accepts: Phones, Laptops',
        lat: 37.79000,
        lng: -122.4200,
        type: 'ewaste',
        category: ['E-Waste'],
        rating: 4.7,
        reviews: 88,
        hours: 'Mon-Fri 9-5',
        distance: '1.5 km'
    },
    {
        id: 7,
        title: 'Sunset Recycling',
        partner: 'City Waste Mgmt',
        address: '1500 Irving St',
        description: 'Accepts: All Materials',
        lat: 37.76400,
        lng: -122.4700,
        type: 'mixed',
        category: ['E-Waste', 'Textiles', 'Glass/Plastic'],
        rating: 4.3,
        reviews: 150,
        hours: '07:00 AM - 09:00 PM',
        distance: '5.2 km'
    },
    {
        id: 8,
        title: 'Mission District Hub',
        partner: 'Urban Recyclers',
        address: '2200 Mission St',
        description: 'Accepts: Glass, Plastic',
        lat: 37.76000,
        lng: -122.4190,
        type: 'bottles',
        category: ['Glass/Plastic'],
        rating: 4.1,
        reviews: 200,
        hours: '08:00 AM - 08:00 PM',
        distance: '2.8 km'
    },
    {
        id: 9,
        title: 'Presidio Green Spot',
        partner: 'Park Eco',
        address: '500 Presidio Blvd',
        description: 'Accepts: E-Waste Only',
        lat: 37.79900,
        lng: -122.4550,
        type: 'ewaste',
        category: ['E-Waste'],
        rating: 4.9,
        reviews: 56,
        hours: '10:00 AM - 05:00 PM',
        distance: '4.0 km'
    },
    {
        id: 10,
        title: 'Haight-Ashbury Bin',
        partner: 'Community Clean',
        address: '1500 Haight St',
        description: 'Accepts: Textiles',
        lat: 37.76900,
        lng: -122.4480,
        type: 'mixed',
        category: ['Textiles'],
        rating: 4.4,
        reviews: 90,
        hours: '24 Hours',
        distance: '3.5 km'
    },
    {
        id: 11,
        title: 'Castro Glass Return',
        partner: 'SF Recycling',
        address: '400 Castro St',
        description: 'Accepts: Glass Bottles',
        lat: 37.76200,
        lng: -122.4350,
        type: 'bottles',
        category: ['Glass/Plastic'],
        rating: 4.6,
        reviews: 112,
        hours: '09:00 AM - 09:00 PM',
        distance: '2.1 km'
    },
    {
        id: 12,
        title: 'SOMA Tech Drop',
        partner: 'TechRecyclers Inc.',
        address: '300 Howard St',
        description: 'Accepts: Computers, Parts',
        lat: 37.78850,
        lng: -122.3950,
        type: 'ewaste',
        category: ['E-Waste'],
        rating: 4.8,
        reviews: 340,
        hours: 'Mon-Fri 08:00 AM - 06:00 PM',
        distance: '1.0 km'
    },
    {
        id: 13,
        title: 'North Beach Bin',
        partner: 'EcoPartner Recycling',
        address: '600 Columbus Ave',
        description: 'Accepts: General Recycling',
        lat: 37.80000,
        lng: -122.4100,
        type: 'mixed',
        category: ['Glass/Plastic', 'Textiles'],
        rating: 4.2,
        reviews: 78,
        hours: '24 Hours',
        distance: '2.6 km'
    },
    {
        id: 14,
        title: 'Richmond District Spot',
        partner: 'City Waste Mgmt',
        address: '3000 Geary Blvd',
        description: 'Accepts: All Materials',
        lat: 37.78100,
        lng: -122.4500,
        type: 'mixed',
        category: ['E-Waste', 'Textiles', 'Glass/Plastic'],
        rating: 4.5,
        reviews: 130,
        hours: '07:00 AM - 08:00 PM',
        distance: '3.8 km'
    },
    {
        id: 15,
        title: 'Marina Green Kiosk',
        partner: 'Bay Area Recycles',
        address: '200 Marina Blvd',
        description: 'Accepts: Plastic Only',
        lat: 37.80500,
        lng: -122.4350,
        type: 'bottles',
        category: ['Glass/Plastic'],
        rating: 4.7,
        reviews: 95,
        hours: '06:00 AM - 08:00 PM',
        distance: '3.2 km'
    }
];

export default function MapScreen() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [viewMode, setViewMode] = useState('list'); // Default to list for better UX on first load

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    const openDirections = (lat, lng) => {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${lat},${lng}`;
        const label = 'Recycling Kiosk';
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });
        Linking.openURL(url);
    };

    const filters = ['All', 'E-Waste', 'Textiles', 'Glass/Plastic'];

    const filteredKiosks = KIOSKS.filter(k =>
        selectedFilter === 'All' ? true : k.category.includes(selectedFilter)
    );

    const renderListItem = ({ item }) => (
        <View style={[styles.listItem, { backgroundColor: theme.card, shadowColor: theme.text }]}>
            <View style={{ flex: 1 }}>
                <Text style={[styles.itemTitle, { color: theme.text }]}>{item.title}</Text>
                <Text style={{ color: theme.secondary, fontSize: 12, marginBottom: 6 }}>{item.partner}</Text>

                <View style={styles.detailRow}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
                        <Star size={14} color="#F59E0B" fill="#F59E0B" />
                        <Text style={{ fontSize: 12, color: theme.text, marginLeft: 4, fontWeight: '600' }}>{item.rating}</Text>
                        <Text style={{ fontSize: 12, color: '#9CA3AF', marginLeft: 2 }}>({item.reviews})</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Clock size={14} color="#9CA3AF" />
                        <Text style={{ fontSize: 12, color: '#9CA3AF', marginLeft: 4 }}>{item.hours}</Text>
                    </View>
                </View>

                <Text style={{ color: '#9CA3AF', fontSize: 12, marginTop: 6 }}>{item.address} • {item.distance}</Text>
            </View>

            <TouchableOpacity
                style={[styles.directionBtn, { backgroundColor: theme.primary + '20' }]}
                onPress={() => openDirections(item.lat, item.lng)}
            >
                <Navigation size={20} color={theme.primary} />
                <Text style={{ fontSize: 10, color: theme.primary, fontWeight: 'bold', marginTop: 4 }}>GO</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Map View */}
            {viewMode === 'map' && (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.12,
                        longitudeDelta: 0.12,
                    }}
                    showsUserLocation={true}
                    userInterfaceStyle={colorScheme ?? 'light'}
                >
                    {filteredKiosks.map((kiosk) => {
                        let pinColor = theme.primary; // Default
                        if (kiosk.category.includes('E-Waste')) pinColor = 'blue';
                        if (kiosk.category.includes('Textiles')) pinColor = 'green';
                        if (kiosk.category.includes('Glass/Plastic')) pinColor = 'orange';

                        return (
                            <Marker
                                key={kiosk.id}
                                coordinate={{ latitude: kiosk.lat, longitude: kiosk.lng }}
                                title={kiosk.title}
                                description={kiosk.description}
                                pinColor={pinColor}
                            >
                                <Callout tooltip onPress={() => openDirections(kiosk.lat, kiosk.lng)}>
                                    <View style={[styles.callout, { backgroundColor: theme.card }]}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                                            <Text style={[styles.calloutTitle, { color: theme.text }]}>{kiosk.title}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Star size={10} color="#F59E0B" fill="#F59E0B" />
                                                <Text style={{ fontSize: 10, marginLeft: 2, color: theme.text }}>{kiosk.rating}</Text>
                                            </View>
                                        </View>
                                        <Text style={[styles.calloutDesc, { color: theme.text }]}>{kiosk.description}</Text>
                                        <Text style={{ fontSize: 10, color: '#9CA3AF' }}>{kiosk.hours}</Text>

                                        <View style={[styles.calloutButton, { backgroundColor: theme.primary, marginTop: 8 }]}>
                                            <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>Get Directions</Text>
                                        </View>
                                    </View>
                                </Callout>
                            </Marker>
                        )
                    })}
                </MapView>
            )}

            {/* List View */}
            {viewMode === 'list' && (
                <View style={[styles.listView, { backgroundColor: theme.background }]}>
                    <FlatList
                        data={filteredKiosks}
                        keyExtractor={item => item.id.toString()}
                        renderItem={renderListItem}
                        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 140, paddingBottom: 100 }}
                    />
                </View>
            )}

            {/* Header / Search (Overlay) - Moved down slightly and added TextInput */}
            <View style={[styles.overlayHeader, { backgroundColor: 'transparent' }]}>
                <View style={[styles.searchContainer, { backgroundColor: theme.card, shadowColor: theme.text }]}>
                    <Search size={20} color="#9CA3AF" />
                    <TextInput
                        placeholder="Search nearby stations..."
                        placeholderTextColor="#9CA3AF"
                        style={[styles.searchInput, { color: theme.text }]}
                    />
                </View>

                {/* Filter Chips */}
                <View style={styles.filterContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
                        {filters.map((f) => (
                            <TouchableOpacity
                                key={f}
                                style={[
                                    styles.chip,
                                    {
                                        backgroundColor: selectedFilter === f ? theme.primary : theme.card,
                                        borderColor: theme.border,
                                        borderWidth: selectedFilter === f ? 0 : 1
                                    }
                                ]}
                                onPress={() => setSelectedFilter(f)}
                            >
                                <Text style={{ color: selectedFilter === f ? 'white' : theme.text, fontWeight: '600' }}>
                                    {f}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>
            {/* Toggle View FAB */}
            <TouchableOpacity
                style={[styles.fab, { backgroundColor: theme.text }]}
                onPress={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
            >
                {viewMode === 'map' ? (
                    <List size={24} color={theme.background} />
                ) : (
                    <MapIcon size={24} color={theme.background} />
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    listView: {
        width: '100%',
        height: '100%',
    },
    overlayHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        alignItems: 'center',
        paddingTop: 10,
    },
    searchContainer: {
        width: '90%',
        height: 50,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        marginBottom: 10,
        marginTop: 10,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        height: '100%',
    },
    filterContainer: {
        height: 40,
        width: '100%',
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    callout: {
        padding: 12,
        borderRadius: 12,
        width: 180,
    },
    calloutTitle: {
        fontWeight: 'bold',
        fontSize: 14,
        width: '75%',
    },
    calloutDesc: {
        fontSize: 12,
        marginBottom: 2,
    },
    calloutButton: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
        alignItems: 'center',
    },
    listItem: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        alignItems: 'center',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
        justifyContent: 'space-between',
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    directionBtn: {
        width: 50,
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        zIndex: 20,
    }
});
