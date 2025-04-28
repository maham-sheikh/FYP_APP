import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>FINDIGO</Text>
        <Text style={styles.subtitle}>Your Business, Everyone's Solution</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.userName}>Abdul Muhyamen</Text>
        <Text style={styles.timeStamp}>5 mins ago</Text>
        <View style={styles.deliveryInfo}>
          <Text style={styles.deliveryText}>Deliver To</Text>
          <Text style={styles.address}>1006 Overseas B Bahria town</Text>
          <TouchableOpacity style={styles.mapButton}>
            <Text style={styles.mapButtonText}>View on map</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.rejectButton}>
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptButton}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#00B1D0',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  body: {
    padding: 20,
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeStamp: {
    color: '#707070',
    marginBottom: 10,
  },
  deliveryInfo: {
    marginTop: 10,
  },
  deliveryText: {
    fontSize: 16,
    color: '#333',
  },
  address: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  mapButton: {
    backgroundColor: '#E0F7FA',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  mapButtonText: {
    color: '#00796B',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  rejectButton: {
    backgroundColor: '#FFCDD2',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  acceptButton: {
    backgroundColor: '#C8E6C9',
    padding: 15,
    borderRadius: 5,
    flex: 1,
  },
  buttonText: {
    textAlign: 'center',
    color: '#333',
  },
});

export default App;
