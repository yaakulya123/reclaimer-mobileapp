import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { ArrowRight, CheckCircle, ScanLine, Share2 } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, Share, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown, FadeInUp, ZoomIn } from 'react-native-reanimated';

import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

const { width } = Dimensions.get('window');

export default function ScanScreen() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];
    const router = useRouter();

    const [scanning, setScanning] = useState(false);
    const [success, setSuccess] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();

    useEffect(() => {
        if (permission && !permission.granted) {
            requestPermission();
        }
    }, [permission]);

    const handleScan = () => {
        setScanning(true);
        // Simulate network delay and processing
        setTimeout(() => {
            setScanning(false);
            setSuccess(true);
        }, 2000);
    };

    const reset = () => {
        setSuccess(false);
        setScanning(false);
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: 'I just recycled 5 plastic bottles and earned 50 points with Reclaimer! 🌱 #GoGreen #ReclaimerApp',
            });
        } catch (error) {
            console.log((error as Error).message);
        }
    };

    if (!permission) {
        // Camera permissions are still loading.
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={theme.primary} />
                <Text style={{ marginTop: 10, color: theme.text }}>Requesting camera permission...</Text>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
                <Text style={{ textAlign: 'center', marginBottom: 20, color: theme.text, fontSize: 16 }}>
                    We need your permission to use the camera for scanning QR codes.
                </Text>
                <TouchableOpacity
                    onPress={requestPermission}
                    style={{
                        backgroundColor: theme.primary,
                        paddingHorizontal: 20,
                        paddingVertical: 12,
                        borderRadius: 10
                    }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (success) {
        return (
            <View style={[styles.container, { backgroundColor: theme.background, justifyContent: 'space-between', paddingVertical: 60 }]}>
                <View style={{ alignItems: 'center', marginTop: 40 }}>
                    <Animated.View entering={ZoomIn.duration(600).springify()}>
                        <CheckCircle size={100} color={theme.primary} />
                    </Animated.View>

                    <Animated.Text entering={FadeInDown.delay(200).duration(500)} style={[styles.successTitle, { color: theme.text }]}>
                        Success!
                    </Animated.Text>

                    <Animated.Text entering={FadeInDown.delay(300).duration(500)} style={[styles.successDesc, { color: theme.text }]}>
                        You recycled <Text style={{ fontWeight: 'bold' }}>5 Plastic Bottles</Text>.
                    </Animated.Text>

                    <Animated.Text entering={FadeInDown.delay(400).duration(500).springify()} style={[styles.pointsEarned, { color: theme.secondary }]}>
                        +50 Points
                    </Animated.Text>
                </View>

                <Animated.View entering={FadeInUp.delay(600).duration(500)} style={{ width: '100%', paddingHorizontal: 30 }}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: theme.primary, marginBottom: 15 }]}
                        onPress={() => router.push('/wallet')}
                    >
                        <Text style={styles.buttonText}>View Wallet</Text>
                        <ArrowRight size={20} color="white" style={{ marginLeft: 8 }} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.outlineButton, { borderColor: theme.border, marginBottom: 15 }]}
                        onPress={handleShare}
                    >
                        <Share2 size={18} color={theme.text} style={{ marginRight: 8 }} />
                        <Text style={[styles.outlineButtonText, { color: theme.text }]}>Share Achievement</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={reset}
                        style={{ padding: 15, alignItems: 'center' }}
                    >
                        <Text style={{ color: '#9CA3AF', fontSize: 16 }}>Scan More Item</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Real Camera View */}
            <View style={styles.cameraContainer}>
                <CameraView style={{ flex: 1 }} facing="back">
                    <View style={[styles.scannerFrame, { borderColor: 'white', borderStyle: 'dotted' }]}>
                        <ScanLine size={280} color={scanning ? theme.primary : 'white'} strokeWidth={1} style={{ opacity: 0.8 }} />
                        {scanning && <ActivityIndicator size="large" color={theme.primary} style={{ position: 'absolute' }} />}
                    </View>
                    <Text style={{ color: 'white', position: 'absolute', bottom: 50, alignSelf: 'center', fontSize: 16, backgroundColor: 'rgba(0,0,0,0.5)', padding: 10, borderRadius: 5 }}>
                        Align QR Code within frame
                    </Text>
                </CameraView>
            </View>

            {/* Controls */}
            <View style={[styles.controls, { backgroundColor: theme.background }]}>
                <Text style={[styles.instruction, { color: theme.text }]}>Scan Kiosk QR to Deposit</Text>

                {/* Points Guide - Clean Horizontal Scroll */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginBottom: 25, flexGrow: 0 }}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                >
                    {[
                        { label: 'Electronics', points: '10-50 pts', icon: '📱', color: '#3B82F6', detail: 'Based on size' },
                        { label: 'Textiles', points: '5 pts/kg', icon: '👕', color: '#10B981', detail: 'Clean clothes' },
                        { label: 'Bottles', points: '2 pts/item', icon: '🥤', color: '#F59E0B', detail: 'Glass/Plastic' },
                        { label: 'Bulk Bonus', points: '+20%', icon: '🚀', color: '#8B5CF6', detail: '5+ items' },
                    ].map((item, index) => (
                        <View key={index} style={[styles.pointCard, { backgroundColor: theme.card, shadowColor: theme.text }]}>
                            <View style={[styles.pointIcon, { backgroundColor: item.color + '20' }]}>
                                <Text style={{ fontSize: 20 }}>{item.icon}</Text>
                            </View>
                            <View>
                                <Text style={[styles.pointLabel, { color: theme.text }]}>{item.label}</Text>
                                <Text style={[styles.pointValue, { color: item.color }]}>{item.points}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                <TouchableOpacity
                    style={[styles.captureButton, { borderColor: theme.border }]}
                    onPress={handleScan}
                    disabled={scanning}
                >
                    <View style={[styles.captureInner, { backgroundColor: scanning ? '#9CA3AF' : theme.primary }]} />
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cameraContainer: {
        flex: 3,
        backgroundColor: 'black',
    },
    scannerFrame: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    controls: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        zIndex: 10,
    },
    instruction: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 30,
    },
    captureButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    captureInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    successTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    successDesc: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 20,
        opacity: 0.8,
    },
    pointsEarned: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    button: {
        flexDirection: 'row',
        paddingVertical: 18,
        borderRadius: 25,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    outlineButton: {
        flexDirection: 'row',
        paddingVertical: 16,
        borderRadius: 25,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    outlineButtonText: {
        fontWeight: '600',
        fontSize: 16,
    },
    pointCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 15,
        marginRight: 10,
        minWidth: 140,
        elevation: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    pointIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    pointLabel: {
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 2,
    },
    pointValue: {
        fontSize: 14,
        fontWeight: 'bold',
    }
});
