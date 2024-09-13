/*
 * Created by Asad on 12 Sep 2024
 */

import React, {useEffect} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import commonStyles from '../styles/commonStyles';
import JobSlotListItem from '../components/JobSlotListItem';
import {CameraModule} from '../native/NativeModule';
import {useSlotStore} from '../store/slotStore';
import labels from '../constants/labels';
import {useCamera} from '../hooks/useCamera';

const initialSlots: Slot[] = [
  {id: 1, title: 'Slot 1', imageUri: null},
  {id: 2, title: 'Slot 2', imageUri: null},
  {id: 3, title: 'Slot 3', imageUri: null},
];

const CreateJobScreen: React.FC = () => {
  const {slots, addSlot, updateSlot} = useSlotStore();

  //   Initialize slots on component mount
  useEffect(() => {
    if (slots.length === 0) {
      initialSlots.forEach(slot => addSlot(slot));
    }
  }, [addSlot, slots]);

  // Handle image capture and slot update
  const handleImageCapture = async (index: number) => {
    try {
      // TODO: use hook for this later
      const imageUri = await takePhoto();
      if (!imageUri) throw new Error('Failed to capture image');

      const slotToUpdate = slots[index];

      console.log('Update Slot:::   ', slotToUpdate);

      updateSlot(slotToUpdate.id - 1, {...slotToUpdate, imageUri});
    } catch (error) {
      Alert.alert('Error', 'There was an issue capturing the image.');
      console.error(error);
    }
  };

  // Capture photo using the native module
  const takePhoto = async () => {
    try {
      const uri = await CameraModule.openCamera();
      console.log('Captured Image URI:', uri);
      return uri;
    } catch (error) {
      console.error('Error taking photo:', error);
      return null;
    }
  };

  //   TODO: will implement save photo logic here
  const savePhotos = () => {
    console.log('Saving slots...', slots);
  };

  return (
    <View style={commonStyles.container}>
      <FlatList
        data={slots}
        horizontal
        keyExtractor={item => `slot-${item.id}`}
        renderItem={({item, index}) => (
          <JobSlotListItem
            title={item.title}
            imageUri={item.imageUri}
            onPress={() => handleImageCapture(index)}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
      />
      <TouchableOpacity onPress={savePhotos} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>{labels.createJobScreen.save}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
  },
  saveButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#007bff',
    alignItems: 'center',
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default CreateJobScreen;
