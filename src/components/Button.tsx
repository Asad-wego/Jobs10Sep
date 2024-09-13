/*
 * Created by Asad on 12 Sep 2024
 */

import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import commonStyles from '../styles/commonStyles';

interface ButtonProps {
  title: string;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({title, onPress}) => (
  <TouchableOpacity style={commonStyles.button} onPress={onPress}>
    <Text style={commonStyles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default Button;
