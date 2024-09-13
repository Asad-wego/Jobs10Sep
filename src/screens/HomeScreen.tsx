/*
 * Created by Asad on 11 Sep 2024
 */

import React, {useEffect, useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import Button from '../components/Button';
import JobListItem from '../components/JobListItem';
import commonStyles from '../styles/commonStyles';
import labels from '../constants/labels';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../navigation/AppNavigator';
import {useSlotStore} from '../store/slotStore';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {slots: loadSlots} = useSlotStore();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Slot[]>([]);

  useEffect(() => {
    if (loadSlots.length > 0) {
      setData(loadSlots);
    } else {
      setData([]); // Empty list if no persisted data
    }
    setIsLoading(false); // Data is loaded
  }, [loadSlots]);

  const renderEmptyList = () => (
    <Text style={commonStyles.emptyListText}>
      {labels.homeScreen.noJobavailable}
    </Text>
  );

  if (isLoading) {
    return (
      <View style={commonStyles.loadingContainer}>
        <Text>{labels.common.loading}</Text>
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      <Button
        title={labels.homeScreen.newJobButton}
        onPress={() => navigation.navigate('CreateJob')}
      />
      <FlatList
        data={data}
        renderItem={({item: {title, imageUri, id}}) => (
          <JobListItem title={title} imageUri={imageUri} id={id} />
        )}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={renderEmptyList}
      />
    </View>
  );
};

export default HomeScreen;
