import { useRouter } from 'expo-router';
import { ArrowRight, Flame, Leaf, Recycle, Trophy } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import Leaderboard from '@/components/Leaderboard';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.backgroundAlt }]}>
      {/* Header Section */}
      <View style={[styles.header, { backgroundColor: theme.backgroundAlt }]}>
        <View style={{ backgroundColor: 'transparent' }}>
          <Text style={[styles.greeting, { color: theme.text }]}>Welcome back,</Text>
          <Text style={[styles.username, { color: theme.primary }]}>Alex!</Text>
        </View>
        <TouchableOpacity style={[styles.profileButton, { borderColor: theme.border }]}>
          {/* Mock Avatar */}
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.primary, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>A</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Main Impact Card */}
      <View style={[styles.card, { backgroundColor: theme.card, shadowColor: theme.text }]}>
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Your Impact</Text>
          <Leaf size={20} color={theme.primary} />
        </View>

        <View style={styles.impactRow}>
          <View style={styles.impactItem}>
            <Text style={[styles.impactValue, { color: theme.text }]}>47</Text>
            <Text style={[styles.impactLabel, { color: '#9CA3AF' }]}>Items</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <View style={styles.impactItem}>
            <Text style={[styles.impactValue, { color: theme.text }]}>12.3kg</Text>
            <Text style={[styles.impactLabel, { color: '#9CA3AF' }]}>CO₂ Saved</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <View style={styles.impactItem}>
            <Text style={[styles.impactValue, { color: theme.text }]}>Gold</Text>
            <Text style={[styles.impactLabel, { color: '#9CA3AF' }]}>Tier</Text>
          </View>
        </View>
      </View>

      {/* Streak & Points Row */}
      <View style={styles.row}>
        {/* Streak Card */}
        <View style={[styles.smallCard, { backgroundColor: theme.card, flex: 1, marginRight: 8, shadowColor: theme.text }]}>
          <View style={styles.iconCircle}>
            <Flame size={24} color="#F59E0B" fill="#F59E0B" />
          </View>
          <Text style={[styles.smallCardValue, { color: theme.text }]}>5 Days</Text>
          <Text style={[styles.smallCardLabel, { color: '#9CA3AF' }]}>Active Streak</Text>
        </View>

        {/* Points Card */}
        <View style={[styles.smallCard, { backgroundColor: theme.card, flex: 1, marginLeft: 8, shadowColor: theme.text }]}>
          <View style={[styles.iconCircle, { backgroundColor: '#E0F2FE' }]}>
            <Trophy size={24} color={theme.secondary} fill={theme.secondary} />
          </View>
          <Text style={[styles.smallCardValue, { color: theme.text }]}>245</Text>
          <Text style={[styles.smallCardLabel, { color: '#9CA3AF' }]}>Points Balance</Text>
        </View>
      </View>

      {/* Quick Action: Deposit */}
      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: theme.primary, shadowColor: theme.primary }]}
        onPress={() => router.push('/scan')}
      >
        <Recycle size={24} color="white" />
        <Text style={styles.actionButtonText}>Deposit Recyclables</Text>
        <ArrowRight size={20} color="white" />
      </TouchableOpacity>

      {/* Recent Activity */}
      <View style={{ marginTop: 24, marginBottom: 10 }}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Activity</Text>

        <View style={[styles.activityItem, { backgroundColor: theme.card, borderBottomColor: theme.border, shadowColor: theme.text }]}>
          <View style={[styles.activityIcon, { backgroundColor: '#DCFCE7' }]}>
            <Recycle size={22} color="#10B981" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.activityTitle, { color: theme.text }]}>Recycled Electronics</Text>
            <Text style={[styles.activitySubtitle, { color: '#9CA3AF' }]}>2 Smartphones deposited</Text>
          </View>
          <View style={[styles.pointsBadge, { backgroundColor: theme.primary + '15' }]}>
            <Text style={[styles.activityPoints, { color: theme.primary }]}>+20</Text>
          </View>
        </View>

        <View style={[styles.activityItem, { backgroundColor: theme.card, borderBottomColor: theme.border, shadowColor: theme.text }]}>
          <View style={[styles.activityIcon, { backgroundColor: '#E0F2FE' }]}>
            <Recycle size={22} color={theme.secondary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.activityTitle, { color: theme.text }]}>Recycled Textiles</Text>
            <Text style={[styles.activitySubtitle, { color: '#9CA3AF' }]}>1.5kg mixed clothes</Text>
          </View>
          <View style={[styles.pointsBadge, { backgroundColor: theme.primary + '15' }]}>
            <Text style={[styles.activityPoints, { color: theme.primary }]}>+7</Text>
          </View>
        </View>
      </View>

      {/* Leadership Section */}
      <Leaderboard />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '500',
  },
  username: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileButton: {
    padding: 2,
    borderWidth: 1,
    borderRadius: 25,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  impactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  impactItem: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
  divider: {
    width: 1,
    height: 30,
  },
  impactValue: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  impactLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  smallCard: {
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  iconCircle: {
    marginBottom: 10,
    backgroundColor: 'transparent', // Or specific color
  },
  smallCardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  smallCardLabel: {
    fontSize: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 5,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 10,
    marginLeft: 4, // Align with card content
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25, // Even more spacious
    borderRadius: 32, // Super rounded corners
    marginBottom: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  activityIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold', // Stronger font
    marginBottom: 4,
  },
  activitySubtitle: {
    fontSize: 13,
    fontWeight: '500',
  },
  pointsBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityPoints: {
    fontWeight: '800',
    fontSize: 15,
  },
});
