import { Check, Clock, Coffee, Gift, Heart, ShoppingBag } from 'lucide-react-native';
import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { Easing, FadeInUp, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

const REWARDS = [
    { id: '1', title: '$5 Starbucks Card', points: 100, icon: Coffee, color: '#00704A' },
    { id: '2', title: '10% Off EcoStore', points: 150, icon: ShoppingBag, color: '#F59E0B' },
    { id: '3', title: '$5 Ocean Donation', points: 50, icon: Heart, color: '#EF4444' },
    { id: '4', title: 'Reclaimer T-Shirt', points: 300, icon: Gift, color: '#3B82F6' },
];

const PAST_REWARDS = [
    { id: '101', title: '$5 Starbucks Card', date: '2 days ago', code: 'STAR-1234-RECL' },
    { id: '102', title: '$5 Ocean Donation', date: '1 week ago', code: 'DONATED-OCEAN' },
];

export default function WalletScreen() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    // Animation Values
    const [balance, setBalance] = React.useState(200);
    const progressWidth = useSharedValue(0);

    // Redemption Modal State
    const [selectedReward, setSelectedReward] = useState<any>(null);
    const [modalVisible, setModalVisible] = useState(false);

    React.useEffect(() => {
        // Animate Header Progress
        progressWidth.value = withTiming(70, { duration: 1500, easing: Easing.out(Easing.exp) });

        // Animate number count up
        const interval = setInterval(() => {
            setBalance(prev => {
                if (prev >= 245) {
                    clearInterval(interval);
                    return 245;
                }
                return prev + 1;
            });
        }, 20); // Fast count up

        return () => clearInterval(interval);
    }, []);

    const animatedProgressStyle = useAnimatedStyle(() => {
        return {
            width: `${progressWidth.value}%`
        };
    });

    // History State
    const [history, setHistory] = useState(PAST_REWARDS);
    const [generatedCode, setGeneratedCode] = useState('');

    const handleRedeem = (item: any) => {
        setSelectedReward(item);
        // Generate a random-looking code
        const randomCode = `${item.title.split(' ')[0].toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(7).toUpperCase()}`;
        setGeneratedCode(randomCode);
        setModalVisible(true);
    };

    const confirmRedemption = () => {
        setModalVisible(false);
        // Add to history with animation delay
        setTimeout(() => {
            const newItem = {
                id: Date.now().toString(),
                title: selectedReward.title,
                date: 'Just now',
                code: generatedCode
            };
            setHistory(prev => [newItem, ...prev]);
        }, 500);
    };

    const renderRewardItem = ({ item }: { item: any }) => {
        const Icon = item.icon;
        return (
            <TouchableOpacity
                style={[styles.rewardItem, { backgroundColor: theme.card, shadowColor: theme.text }]}
                onPress={() => handleRedeem(item)}
            >
                <View style={[styles.rewardIcon, { backgroundColor: item.color }]}>
                    <Icon size={24} color="white" />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.rewardTitle, { color: theme.text }]}>{item.title}</Text>
                    <Text style={{ color: '#9CA3AF' }}>Ends in 12 days</Text>
                </View>
                <View style={[styles.costTag, { borderColor: theme.border }]}>
                    <Text style={{ color: theme.primary, fontWeight: 'bold' }}>{item.points} pts</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderHistoryItem = (item: any) => (
        <Animated.View
            entering={item.date === 'Just now' ? FadeInUp.springify() : undefined}
            key={item.id}
            style={[styles.historyItem, { borderBottomColor: theme.border }]}
        >
            <View style={styles.historyIcon}>
                <Clock size={16} color="#9CA3AF" />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={[styles.historyTitle, { color: theme.text }]}>{item.title}</Text>
                <Text style={{ color: '#9CA3AF', fontSize: 12 }}>{item.date}</Text>
            </View>
            <Text style={{ color: theme.success, fontWeight: '600', fontSize: 12 }}>Redeemed</Text>
        </Animated.View>
    );

    return (
        <>
            <ScrollView style={[styles.container, { backgroundColor: theme.backgroundAlt }]} contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Balance Card */}
                <View style={[styles.balanceCard, { backgroundColor: theme.primary }]}>
                    <Text style={{ color: 'white', opacity: 0.9, marginBottom: 5 }}>Current Balance</Text>
                    <Text style={styles.balanceValue}>{balance}</Text>
                    <Text style={{ color: 'white', opacity: 0.9 }}>Points Available</Text>

                    <View style={styles.progressBarContainer}>
                        <Animated.View style={[styles.progressBar, animatedProgressStyle]} />
                    </View>
                    <Text style={{ color: 'white', fontSize: 12, marginTop: 5 }}>55 points to next Level</Text>
                </View>

                <Text style={[styles.sectionTitle, { color: theme.text }]}>Redeem Rewards</Text>
                <View style={{ paddingHorizontal: 20 }}>
                    {REWARDS.map(item => (
                        <View key={item.id}>
                            {renderRewardItem({ item })}
                        </View>
                    ))}
                </View>

                <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 20 }]}>Past Rewards</Text>
                <View style={[styles.historyList, { backgroundColor: theme.card }]}>
                    {history.map(item => renderHistoryItem(item))}
                </View>

            </ScrollView>

            {/* Redemption Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
                        <View style={[styles.iconCircle, { backgroundColor: theme.success }]}>
                            <Check size={40} color="white" />
                        </View>
                        <Text style={[styles.modalTitle, { color: theme.text }]}>Success!</Text>
                        <Text style={[styles.modalDesc, { color: theme.text }]}>
                            You requested {selectedReward?.title}. Use the code below:
                        </Text>

                        <View style={[styles.codeBox, { borderColor: theme.border, backgroundColor: theme.backgroundAlt }]}>
                            <Text style={[styles.codeText, { color: theme.text }]}>{generatedCode}</Text>
                        </View>

                        <Pressable
                            style={[styles.closeButton, { backgroundColor: theme.primary }]}
                            onPress={confirmRedemption}
                        >
                            <Text style={styles.closeButtonText}>Done</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    balanceCard: {
        margin: 20,
        padding: 30,
        borderRadius: 25,
        alignItems: 'center',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    balanceValue: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    progressBarContainer: {
        width: '100%',
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 3,
        marginTop: 20,
    },
    progressBar: {
        height: 6,
        backgroundColor: 'white',
        borderRadius: 3,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom: 15,
    },
    rewardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginBottom: 15,
        borderRadius: 15,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 1,
    },
    rewardIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    rewardTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    costTag: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        borderWidth: 1,
    },
    historyList: {
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 5,
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
    },
    historyIcon: {
        marginRight: 15,
    },
    historyTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 2,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '85%',
        padding: 30,
        borderRadius: 25,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    iconCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: -55,
        borderWidth: 5,
        borderColor: 'white',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalDesc: {
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 22,
    },
    codeBox: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: 'dashed',
        marginBottom: 25,
        width: '100%',
        alignItems: 'center',
    },
    codeText: {
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    closeButton: {
        width: '100%',
        paddingVertical: 15,
        borderRadius: 15,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
});
