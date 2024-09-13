/*
 * Created by Asad on 11 Sep 2024
 */

import {StyleSheet} from 'react-native';
import colors from './colors';

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLightGray,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.labelTextColor,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primaryButton,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: colors.pureWhite,
    fontSize: 16,
    fontWeight: '600',
  },
  flatListItem: {
    backgroundColor: colors.pureWhite,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  itemLabel: {
    color: colors.labelTextColor,
    fontSize: 18,
    flex: 1,
  },
  itemImage: {
    height: 200,
    width: '100%',
    borderRadius: 10,
  },
  emptyListText: {
    color: colors.labelTextColor,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.primaryButton,
  },
});

export default commonStyles;

// /*
//  * Created by Asad on 11 Sep 2024
//  */

// import {StyleSheet} from 'react-native';
// import colors from './colors';

// const commonStyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.backgroundLightGray,
//     paddingTop: 20,
//   },
//   button: {
//     backgroundColor: colors.pureWhite,
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     margin: 10,
//   },
//   buttonText: {
//     color: colors.primaryButton,
//     fontSize: 16,
//   },
//   flatListItem: {
//     backgroundColor: colors.pureWhite,
//     marginVertical: 8,
//     marginHorizontal: 16,
//     borderRadius: 10,
//     padding: 15,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   itemLabel: {
//     color: colors.labelTextColor,
//     fontSize: 18,
//     flex: 1,
//   },
//   itemImage: {
//     height: 200,
//     width: '100%',
//     borderRadius: 10,
//   },
// });

// export default commonStyles;
