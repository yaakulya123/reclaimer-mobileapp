import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { ArrowRight, CheckCircle, ScanLine, Share2 } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Animated, Dimensions, PanResponder, ScrollView, Share, StyleSheet, TouchableOpacity } from 'react-native';
import { FadeInDown, FadeInUp, ZoomIn } from 'react-native-reanimated';

import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

export default function ScanScreen() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];
    const router = useRouter();

    const [scanning, setScanning] = useState(false);
    const [success, setSuccess] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();

    // Bottom Sheet Animation State
    const SCREEN_HEIGHT = height;
    // Sheet height is 90% of screen
    const SHEET_HEIGHT = SCREEN_HEIGHT * 0.9;
    // We want ~35% of the screen visible initially (collapsed)
    const COLLAPSED_HEIGHT = SCREEN_HEIGHT * 0.35;
    // We need to push the sheet DOWN by this amount to show only collapsed height
    const INITIAL_OFFSET = SHEET_HEIGHT - COLLAPSED_HEIGHT;

    const translateY = React.useRef(new Animated.Value(INITIAL_OFFSET)).current;
    const context = React.useRef({ y: 0 });

    const panResponder = React.useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                context.current.y = (translateY as any)._value; // Get current animated value
            },
            onPanResponderMove: (_, gestureState) => {
                // Calculate new position
                let newY = context.current.y + gestureState.dy;

                // Limit the drag range
                // Min value: 0 (Fully Expanded)
                // Max value: INITIAL_OFFSET (Collapsed)
                if (newY < 0) newY = 0;
                if (newY > INITIAL_OFFSET) newY = INITIAL_OFFSET;

                translateY.setValue(newY);
            },
            onPanResponderRelease: (_, gestureState) => {
                // Snap Logic
                // If dragged UP (negative dy) significantly or passed midpoint -> Snap to Top (0)
                // Else Snap to Bottom (INITIAL_OFFSET)

                const currentY = (translateY as any)._value;
                const snapThreshold = INITIAL_OFFSET / 2;

                if (gestureState.dy < -50 || (gestureState.dy < 0 && currentY < snapThreshold)) {
                    // Snap to Top (Expanded)
                    Animated.spring(translateY, {
                        toValue: 0,
                        useNativeDriver: true,
                        damping: 20,
                    }).start();
                } else if (gestureState.dy > 50 || (gestureState.dy > 0 && currentY > snapThreshold)) {
                    // Snap to Bottom (Collapsed)
                    Animated.spring(translateY, {
                        toValue: INITIAL_OFFSET,
                        useNativeDriver: true,
                        damping: 20,
                    }).start();
                } else {
                    // Return to nearest
                    Animated.spring(translateY, {
                        toValue: currentY < snapThreshold ? 0 : INITIAL_OFFSET,
                        useNativeDriver: true,
                        damping: 20,
                    }).start();
                }
            },
        })
    ).current;

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
                    {/* Reanimated is used here correctly for success animations */}
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
            {/* 1. Camera Layer - Full Screen Background */}
            <CameraView style={StyleSheet.absoluteFill} facing="back" />

            {/* 2. Scanning Overlay Layer - Absolute on top of Camera */}
            <View style={[styles.overlayContainer, StyleSheet.absoluteFill]} pointerEvents="box-none">
                {/* PointerEvents box-none allows touches to pass through empty areas to the camera/bottom sheet */}

                {/* Dark Mask for Camera */}
                <View style={[styles.maskContainer]} pointerEvents="none">
                    {/* pointerEvents none here so mask doesn't block interactions if we needed any, but mostly for clarity */}
                    <View style={styles.maskRow} />
                    <View style={styles.maskMiddle}>
                        <View style={styles.maskColumn} />
                        <View style={styles.scannerFrame}>
                            <ScanLine size={280} color={scanning ? theme.primary : 'white'} strokeWidth={1.5} />
                            {scanning && <ActivityIndicator size="large" color={theme.primary} style={{ position: 'absolute' }} />}
                            <View style={styles.cornerTopLeft} />
                            <View style={styles.cornerTopRight} />
                            <View style={styles.cornerBottomLeft} />
                            <View style={styles.cornerBottomRight} />
                        </View>
                        <View style={styles.maskColumn} />
                    </View>
                    <View style={styles.maskRow} />
                </View>

                {/* Helper Text positioned in the open area */}
                <Text style={styles.frameText}>
                    Align QR code within the frame to deposit
                </Text>
            </View>

            {/* 3. Scan Button - FIXED at Bottom (Outside Sheet) */}
            <View style={styles.fixedButtonContainer}>
                <TouchableOpacity
                    style={[styles.captureButton, { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.2)' }]}
                    onPress={handleScan}
                    disabled={scanning}
                >
                    <View style={[styles.captureInner, { backgroundColor: scanning ? '#9CA3AF' : theme.primary }]} />
                </TouchableOpacity>
            </View>

            {/* 4. Bottom Sheet - Absolute Bottom with Animation */}
            {/* Note: We use RN's Animated.View here for the PanResponder logic */}
            <Animated.View
                style={[
                    styles.bottomSheetContainer,
                    {
                        backgroundColor: theme.card,
                        height: SHEET_HEIGHT, // Define explicit height
                        transform: [{ translateY: translateY }]
                    }
                ]}
            >
                {/* Drag Handle Area - Attached PanResponder Here */}
                <View
                    style={styles.dragHandleHitSlop}
                    {...panResponder.panHandlers}
                >
                    <View style={styles.dragHandleContainer}>
                        <View style={[styles.dragHandle, { backgroundColor: '#E5E7EB' }]} />
                    </View>

                    <View style={styles.sheetHeader}>
                        <Text style={[styles.sheetTitle, { color: theme.text }]}>Recycling Rewards</Text>
                        <View style={[styles.infoBadge, { backgroundColor: theme.primary + '15' }]}>
                            <Text style={[styles.infoText, { color: theme.primary }]}>Live Rates</Text>
                        </View>
                    </View>
                </View>

                {/* Scrolable Content - Add padding bottom so it doesn't get cut off if needed */}
                <ScrollView
                    style={styles.pointsList}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                >
                    {[
                        { label: 'Plastic Bottles', points: '+5 pts/item', icon: '🥤', color: '#3B82F6', desc: 'PET 1 & HDPE 2' },
                        { label: 'Aluminum Cans', points: '+10 pts/item', icon: '🥫', color: '#10B981', desc: 'Clean & crushed' },
                        { label: 'Glass Containers', points: '+15 pts/item', icon: '🍾', color: '#F59E0B', desc: 'Remove lids' },
                        { label: 'E-Waste Items', points: '50-100 pts', icon: '📱', color: '#8B5CF6', desc: 'Phones, cables' },
                        { label: 'Mixed Paper', points: '5 pts/kg', icon: '📰', color: '#9CA3AF', desc: 'Newspapers, magazines' },
                        { label: 'Cardboard', points: '10 pts/kg', icon: '📦', color: '#D97706', desc: 'Flattened boxes' },
                    ].map((item, index) => (
                        <View key={index} style={[styles.rewardRow, { borderBottomColor: theme.border }]}>
                            <View style={[styles.rewardIconContainer, { backgroundColor: item.color + '15' }]}>
                                <Text style={{ fontSize: 24 }}>{item.icon}</Text>
                            </View>
                            <View style={{ flex: 1, marginLeft: 15 }}>
                                <Text style={[styles.rewardLabel, { color: theme.text }]}>{item.label}</Text>
                                <Text style={[styles.rewardDesc, { color: '#9CA3AF' }]}>{item.desc}</Text>
                            </View>
                            <View style={[styles.pointsPill, { borderColor: item.color }]}>
                                <Text style={[styles.pointsText, { color: item.color }]}>{item.points}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </Animated.View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black', // Camera bg
    },
    // Removed old cameraContainer
    overlayContainer: {
        zIndex: 1,
        justifyContent: 'center',
    },
    maskContainer: {
        flex: 1,
        // The mask fills the overlay container (screen)
    },
    maskRow: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)', // Darker mask
    },
    maskMiddle: {
        height: 280,
        flexDirection: 'row',
    },
    maskColumn: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    scannerFrame: {
        width: 280,
        height: 280,
        justifyContent: 'center',
        alignItems: 'center',
        // Transparent middle
    },
    frameText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        position: 'absolute',
        top: '15%', // Simple top positioning
        width: '100%',
        textShadowColor: 'rgba(0,0,0,0.8)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
        zIndex: 5,
    },
    cornerTopLeft: {
        position: 'absolute', top: -2, left: -2, width: 40, height: 40, borderTopWidth: 4, borderLeftWidth: 4, borderColor: '#10B981', borderTopLeftRadius: 20
    },
    cornerTopRight: {
        position: 'absolute', top: -2, right: -2, width: 40, height: 40, borderTopWidth: 4, borderRightWidth: 4, borderColor: '#10B981', borderTopRightRadius: 20
    },
    cornerBottomLeft: {
        position: 'absolute', bottom: -2, left: -2, width: 40, height: 40, borderBottomWidth: 4, borderLeftWidth: 4, borderColor: '#10B981', borderBottomLeftRadius: 20
    },
    cornerBottomRight: {
        position: 'absolute', bottom: -2, right: -2, width: 40, height: 40, borderBottomWidth: 4, borderRightWidth: 4, borderColor: '#10B981', borderBottomRightRadius: 20
    },

    // Bottom Sheet Styling
    bottomSheetContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        // height is set dynamically now
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingTop: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 15,
        zIndex: 10,
    },
    dragHandleHitSlop: {
        // Increase touch area for easier dragging
        paddingBottom: 10,
    },
    dragHandleContainer: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    dragHandle: {
        width: 40,
        height: 5,
        borderRadius: 2.5,
    },
    sheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    sheetTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    infoBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    infoText: {
        fontSize: 12,
        fontWeight: '700',
    },
    pointsList: {
        flex: 1,
    },
    rewardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 0.5,
    },
    rewardIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rewardLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    rewardDesc: {
        fontSize: 13,
    },
    pointsPill: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
    },
    pointsText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    fixedButtonContainer: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 20, // ensure it's above the sheet
    },
    // Removed old buttonContainer since it's now fixed
    captureButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 4,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    captureInner: {
        width: 54,
        height: 54,
        borderRadius: 27,
    },
    // Keep success styles
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
});
