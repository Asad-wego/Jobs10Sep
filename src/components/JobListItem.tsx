/*
 * Created by Asad on 12 Sep 2024
 */

import React from 'react';
import {View, Text, Image} from 'react-native';
import commonStyles from '../styles/commonStyles';
import {addIcon} from '../styles/icons';

const JobListItem: React.FC<Slot> = ({id, title, imageUri}) => (
  <View key={id} style={commonStyles.flatListItem}>
    <Text style={commonStyles.itemLabel}>{title}</Text>
    <Image source={{uri: imageUri || addIcon}} style={commonStyles.itemImage} />
  </View>
);

export default JobListItem;
