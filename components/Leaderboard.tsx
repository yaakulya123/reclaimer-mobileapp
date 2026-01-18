import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { Trophy } from 'lucide-react-native';
import React from 'react';
import { StyleSheet } from 'react-native';

const LEADERBOARD_DATA = [
    { id: '1', name: 'Sarah J.', points: 1450, rank: 1, avatar: 'S' },
    { id: '2', name: 'Alex Recycler', points: 1250, rank: 2, avatar: 'A', isUser: true },
    { id: '3', name: 'Mike T.', points: 1100, rank: 3, avatar: 'M' },
    { id: '4', name: 'Emma W.', points: 980, rank: 4, avatar: 'E' },
    { id: '5', name: 'David L.', points: 850, rank: 5, avatar: 'D' },
    { id: '6', name: 'Jessica K.', points: 720, rank: 6, avatar: 'J' },
    { id: '7', name: 'Ryan P.', points: 640, rank: 7, avatar: 'R' },
];

export default function Leaderboard() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    const topThree = LEADERBOARD_DATA.slice(0, 3);
    const rest = LEADERBOARD_DATA.slice(3);

    const renderPodiumItem = (item: typeof LEADERBOARD_DATA[0], position: 'center' | 'side') => {
        const isFirst = item.rank === 1;
        const color = item.rank === 1 ? '#FFD700' : item.rank === 2 ? '#C0C0C0' : '#CD7F32';
        const size = isFirst ? 80 : 60;

        return (
            <View style={[styles.podiumItem, { marginTop: isFirst ? 0 : 20 }]}>
                {/* Crown for #1 */}
                {isFirst && (
                    <View style={{ marginBottom: -10, zIndex: 1, alignItems: 'center' }}>
                        <Trophy size={24} color="#F59E0B" fill="#F59E0B" />
                    </View>
                )}

                {/* Avatar Circle */}
                <View style={[styles.podiumAvatarContainer, {
                    width: size, height: size, borderRadius: size / 2,
                    borderColor: color,
                    borderWidth: 3,
                    shadowColor: color,
                    shadowOpacity: 0.3, shadowRadius: 8, shadowOffset: { width: 0, height: 0 },
                    elevation: 5, // Android shadow
                }]}>
                    <View style={[styles.podiumAvatar, {
                        backgroundColor: item.isUser ? theme.primary : theme.card,
                        width: size - 6, height: size - 6, borderRadius: (size - 6) / 2
                    }]}>
                        <Text style={{
                            fontSize: isFirst ? 24 : 18,
                            fontWeight: 'bold',
                            color: item.isUser ? 'white' : theme.text
                        }}>{item.avatar}</Text>
                    </View>

                    {/* Rank Badge Absolute */}
                    <View style={[styles.podiumRankBadge, { backgroundColor: color }]}>
                        <Text style={styles.podiumRankText}>{item.rank}</Text>
                    </View>
                </View>

                {/* Name & Points */}
                <View style={{ marginTop: 8, alignItems: 'center' }}>
                    <Text style={[styles.podiumName, { color: theme.text, fontWeight: item.isUser ? 'bold' : '600' }]} numberOfLines={1}>
                        {item.name.split(' ')[0]} {item.isUser && '(You)'}
                    </Text>
                    <Text style={[styles.podiumPoints, { color: theme.primary }]}>{item.points}</Text>
                </View>
            </View>
        );
    };

    const renderListItem = (item: typeof LEADERBOARD_DATA[0]) => (
        <View style={[styles.listItem, { borderBottomColor: theme.border }]}>
            <Text style={[styles.listRank, { color: '#9CA3AF' }]}>{item.rank}</Text>
            <View style={[styles.listAvatar, { backgroundColor: theme.primary + '15' }]}>
                <Text style={{ fontWeight: 'bold', color: theme.primary }}>{item.avatar}</Text>
            </View>
            <Text style={[styles.listName, { color: theme.text }]}>{item.name}</Text>
            <Text style={[styles.listPoints, { color: theme.text }]}>{item.points} pts</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color: theme.text }]}>Community Leadership</Text>

            {/* Podium Section */}
            <View style={styles.podiumContainer}>
                {/* 2nd Place (Left) */}
                <View style={{ flex: 1, alignItems: 'center' }}>
                    {renderPodiumItem(topThree[1], 'side')}
                </View>
                {/* 1st Place (Center) */}
                <View style={{ flex: 1, alignItems: 'center', marginHorizontal: -10, zIndex: 10 }}>
                    {renderPodiumItem(topThree[0], 'center')}
                </View>
                {/* 3rd Place (Right) */}
                <View style={{ flex: 1, alignItems: 'center' }}>
                    {renderPodiumItem(topThree[2], 'side')}
                </View>
            </View>

            {/* List Section */}
            <View style={[styles.listContainer, { backgroundColor: theme.card }]}>
                {rest.map((item, index) => (
                    <View key={item.id}>
                        {renderListItem(item)}
                        {index < rest.length - 1 && <View style={[styles.separator, { backgroundColor: theme.border }]} />}
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        marginBottom: 40,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        marginLeft: 4,
    },
    podiumContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginBottom: 30,
        paddingHorizontal: 10,
    },
    podiumItem: {
        alignItems: 'center',
    },
    podiumAvatarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    podiumAvatar: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    podiumRankBadge: {
        position: 'absolute',
        bottom: -6,
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'white',
    },
    podiumRankText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    podiumName: {
        fontSize: 13,
        marginBottom: 2,
    },
    podiumPoints: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    listContainer: {
        borderRadius: 20,
        padding: 5,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,
    },
    listRank: {
        fontSize: 14,
        fontWeight: 'bold',
        width: 25,
    },
    listAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    listName: {
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
    },
    listPoints: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    separator: {
        height: 1,
        marginLeft: 50,
    }
});
