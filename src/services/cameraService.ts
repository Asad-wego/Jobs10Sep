import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadSlotsFromStorage = async () => {
  try {
    const savedSlots = await AsyncStorage.getItem('slot-storage');
    return savedSlots ? JSON.parse(savedSlots) : [];
  } catch (error) {
    console.error('Error loading slots:', error);
    return [];
  }
};

export const saveSlotsToStorage = async (slots: Slot[]) => {
  try {
    await AsyncStorage.setItem('slot-storage', JSON.stringify(slots));
  } catch (error) {
    console.error('Error saving slots:', error);
  }
};

export const removeSlotsToStorage = async () => {
  try {
    await AsyncStorage.removeItem('slot-storage');
  } catch (error) {
    console.error('Error saving slots:', error);
  }
};
