/*
 * Created by Asad on 12 Sep 2024
 */

import {create} from 'zustand';
import {
  loadSlotsFromStorage,
  saveSlotsToStorage,
  removeSlotsToStorage,
} from '../services/cameraService';

export const useSlotStore = create(set => ({
  slots: [],

  addSlot: newSlot => {
    set(state => {
      const updatedSlots = [...state.slots, newSlot];
      saveSlotsToStorage(updatedSlots);
      return {slots: updatedSlots};
    });
  },

  updateSlot: (index: number, updatedSlot: Slot) => {
    set(state => {
      const updatedSlots = state.slots.map((slot, i) =>
        i === index ? updatedSlot : slot,
      );
      saveSlotsToStorage(updatedSlots);
      return {slots: updatedSlots};
    });
  },

  loadSlots: async () => {
    const savedSlots = await loadSlotsFromStorage();
    if (savedSlots) {
      set({slots: savedSlots});
    }
  },

  clearSlots: async () => {
    set({slots: []});
    await removeSlotsToStorage();
  },
}));

// import {create} from 'zustand';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const useSlotStore = create(set => ({
//   slots: [],
//   addSlot: async newSlot => {
//     set(state => {
//       const updatedSlots = [...state.slots, newSlot];
//       AsyncStorage.setItem('slot-storage', JSON.stringify(updatedSlots));
//       return {slots: updatedSlots};
//     });
//   },
//   updateSlot: async (index: number, updatedSlot: Slot) => {
//     set(state => {
//       const updatedSlots = state.slots.map((slot: Slot, i) =>
//         i === index ? updatedSlot : slot,
//       );
//       AsyncStorage.setItem('slot-storage', JSON.stringify(updatedSlots));
//       return {slots: updatedSlots};
//     });
//   },
//   loadSlots: async () => {
//     const savedSlots = await AsyncStorage.getItem('slot-storage');
//     if (savedSlots) {
//       set({slots: JSON.parse(savedSlots)});
//     }
//   },
//   clearSlots: async () => {
//     set({slots: []});
//     AsyncStorage.removeItem('slot-storage');
//   },
// }));
