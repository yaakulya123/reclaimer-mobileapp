import { Award, BarChart2, Calendar, Gift, Settings } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

export default function ProfileScreen() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.backgroundAlt }]}>
            {/* Profile Header */}
            <View style={[styles.header, { backgroundColor: theme.card }]}>
                <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
                    <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>A</Text>
                </View>
                <Text style={[styles.name, { color: theme.text }]}>Alex Recycler</Text>
                <Text style={{ color: '#9CA3AF' }}>Joined Jan 2025</Text>

                <View style={styles.statsRow}>
                    <View style={styles.stat}>
                        <Text style={[styles.statVal, { color: theme.text }]}>47</Text>
                        <Text style={[styles.statLabel, { color: '#9CA3AF' }]}>Deposits</Text>
                    </View>
                    <View style={[styles.divider, { backgroundColor: theme.border }]} />
                    <View style={styles.stat}>
                        <Text style={[styles.statVal, { color: '#FFD700', textShadowColor: 'rgba(255, 215, 0, 0.5)', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10 }]}>Gold</Text>
                        <Text style={[styles.statLabel, { color: '#9CA3AF' }]}>Level</Text>
                    </View>
                    <View style={[styles.divider, { backgroundColor: theme.border }]} />
                    <View style={styles.stat}>
                        <Text style={[styles.statVal, { color: theme.text }]}>890</Text>
                        <Text style={[styles.statLabel, { color: '#9CA3AF' }]}>Lifetime Pts</Text>
                    </View>
                </View>
            </View>

            {/* Badges Section */}
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Achievements</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }} contentContainerStyle={{ paddingLeft: 20, paddingBottom: 10, paddingRight: 20 }}>
                {[
                    { id: 1, title: 'Early Adopter', icon: Award, color: theme.warning },
                    { id: 2, title: 'Eco Warrior', icon: BarChart2, color: '#10B981' },
                    { id: 3, title: 'Streak Master', icon: Calendar, color: theme.danger }
                ].map((badge) => (
                    <View key={badge.id} style={[styles.badgeCard, { backgroundColor: theme.card }]}>
                        <badge.icon size={32} color={badge.color} />
                        <Text style={[styles.badgeText, { color: theme.text }]}>{badge.title}</Text>
                    </View>
                ))}
            </ScrollView>

            {/* Invite Friends - Feature 5 */}
            <View style={[styles.inviteCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <View style={[styles.iconBox, { backgroundColor: theme.secondary }]}>
                        <Gift size={20} color="white" />
                    </View>
                    <Text style={[styles.inviteTitle, { color: theme.text }]}>Refer & Earn</Text>
                </View>
                <Text style={[styles.inviteDesc, { color: theme.text }]}>
                    Invite a friend and you both get <Text style={{ fontWeight: 'bold', color: theme.primary }}>25 bonus points</Text> on their first deposit!
                </Text>
                <TouchableOpacity style={[styles.inviteButton, { backgroundColor: theme.primary }]}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Invite Friends</Text>
                </TouchableOpacity>
            </View>


            {/* Settings List */}
            <View style={[styles.settingsList, { backgroundColor: theme.card }]}>
                {[
                    { label: 'Account Settings', icon: Settings },
                    { label: 'Recovery History', icon: Calendar },
                    { label: 'Impact Report', icon: BarChart2 },
                ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <View key={item.label} style={[styles.settingItem, { borderBottomWidth: index === 2 ? 0 : 1, borderBottomColor: theme.border }]}>
                            <Icon size={20} color={theme.text} style={{ marginRight: 15 }} />
                            <Text style={{ fontSize: 16, color: theme.text }}>{item.label}</Text>
                        </View>
                    )
                })}
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        padding: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 30,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        borderWidth: 4,
        borderColor: 'white',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    statsRow: {
        flexDirection: 'row',
        marginTop: 25,
        width: '100%',
        justifyContent: 'space-around',
    },
    stat: {
        alignItems: 'center',
    },
    statVal: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    statLabel: {
        fontSize: 12,
    },
    divider: {
        width: 1,
        height: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom: 15,
    },
    badgeCard: {
        width: 100,
        height: 120,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    badgeText: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '600',
    },
    inviteCard: {
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconBox: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    inviteTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    inviteDesc: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 15,
        opacity: 0.8,
    },
    inviteButton: {
        paddingVertical: 12,
        borderRadius: 15,
        alignItems: 'center',
    },
    settingsList: {
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 5,
        marginTop: 20,
        marginBottom: 50,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    }
});
