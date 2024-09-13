/*
 * Created by Asad on 12 Sep 2024
 */

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import colors from '../styles/colors';
import {addIcon} from '../styles/icons';

const JobSlotListItem: React.FC<JobListItemProps> = ({
  title,
  imageUri,
  onPress,
}) => {
  console.log('Item::: ' + imageUri, title);

  const screenWidth = Dimensions.get('window').width;
  const itemWidth = screenWidth * 0.4;

  return (
    <View style={[styles.container, {width: itemWidth}]}>
      <TouchableOpacity onPress={onPress} style={styles.touchable}>
        {imageUri ? (
          <Image
            source={{
              uri: imageUri,
            }}
            style={styles.image}
          />
        ) : (
          <Image source={addIcon} style={styles.image} />
        )}
      </TouchableOpacity>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    borderRadius: 12,
    marginRight: 16,
    backgroundColor: colors.pureWhite,
    justifyContent: 'flex-start',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2, // for Android shadow
  },
  touchable: {
    width: '100%',
    height: '80%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.backgroundLightGray,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 4,
    color: colors.labelTextColor,
  },
});

export default JobSlotListItem;
