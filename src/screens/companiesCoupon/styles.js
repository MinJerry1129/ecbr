import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import { Typography, Colors } from '../../styles/index';

export const Form = styled.View`
  flex-direction: row;
  padding: 10px;
  margin: 0;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: ${Colors.WHITE};
`;

export const HorizontalSlider = styled.FlatList.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  height: 130px;
  max-height: 130px;
  min-height: 130px;
`;

export const HorizontalSliderItem = styled.View`
  width: 140px;
  margin: 0 7px 30px;
  align-items: center;
`;

export const HorizontalSliderImageWrapper = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 100%;
`;
export const HorizontalSliderImage = styled.Image`
  height: 100%;
  width: 100%;
  border-radius: 8px;
`;

export const HorizontalItemCategoryText = styled.Text`
  color: ${Colors.GREY};
  margin-top: 10px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: `${Colors.PRIMARY_DARK}`,
})`
  margin: 0 5px 0 0;
  flex: 1;
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  font-size: 16px;
  letter-spacing: 1.2px;
  height: 45px;
  background: ${Colors.BLUE_LIGHT_CART};
  border-radius: 4px;
  color: ${Colors.PRIMARY_DARK};
  padding: 0 15px;
  border: 1px solid ${Colors.PRIMARY_LIGHT};
`;
export const CustomHeader = styled.View`
  background: ${Colors.PRIMARY};
  height: 100px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const HeaderTitle = styled.Text`
  color: ${Colors.WHITE};
  font-weight: bold;
  font-size: 18px;
  margin-top: 15px;
`;

export const SearchWraper = styled.View`
  flex-direction: row;
  margin: -15px 15px 20px;
  height: 45px;
  background: #fff;
  elevation: 15;
  border-radius: 22.5px;
`;

export const SearchInput = styled.TextInput.attrs({
  placeholderTextColor: `${Colors.PRIMARY_DARK}`,
})`
  flex: 1;
  font-family: ${Typography.FONT_FAMILY_REGULAR};
  font-size: 16px;
  letter-spacing: 1.2px;
  color: ${Colors.PRIMARY_DARK};
  height: 100%;
  width: 100%;
`;

export const SearchButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 0 15px;
`;

export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: ${Colors.PRIMARY};
  border-radius: 4px;
  padding: 0 15px;
  border: 1px solid ${Colors.SECONDARY_LIGHT};
`;

export const ToolsBarWrapper = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    alignItems: 'center',
  },
})`
  margin: 10px 0;
  width: 100%;
  height: 40px;
`;

export const ToolsBarItem = styled.TouchableOpacity`
  background: ${props => (props.active ? '#29bcea' : '#ccc')};
  min-width: 110px;
  border-radius: 6px;
  margin: 0 10px;
`;

export const ToolsBarItemText = styled.Text`
  padding: 0 8px;
  color: #fff;
  font-size: 18px;
  margin: auto auto;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  safeArea: {
    flex: 1,
  },
  listFilter: {
    flexDirection: 'row',
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    height: 40,
  },
  flatList: {
    marginHorizontal: 8,
  },
  star: {
    color: Colors.SECONDARY,
    fontSize: Typography.FONT_SIZE_14,
    marginLeft: 10,
    marginTop: 2,
  },
  listView: {
    backgroundColor: Colors.WHITE,
    padding: 15,
    paddingBottom: 10,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderRadius: 4.65,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.29,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 60,
    borderRadius: 10,
    padding: 5,
    borderColor: Colors.PRIMARY,
  },
  imageClosed: {
    width: 80,
    height: 60,
    borderRadius: 10,
    padding: 5,
    borderColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.3,
  },
  textImage: {
    textAlign: 'center',
    color: Colors.GRAY_DARK,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_16,
  },
  txtTitle: {
    fontSize: Typography.FONT_SIZE_16,
    letterSpacing: 1.1,
    color: '#707070',
    marginLeft: 10,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  txtDistance: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.PRIMARY,
    marginLeft: 10,
  },
  txtInfo: {
    fontSize: Typography.FONT_SIZE_15,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    marginLeft: 10,
    marginTop: 2,
  },
  infoGreen: {
    color: Colors.SUCCESS,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  notFound: {
    flex: 1,
    //backgroundColor: 'orange',
    //justifyContent: 'center',
    //alignContent: 'center',
  },
  txtNotFound: {
    fontSize: 25,
    color: Colors.PRIMARY,
    textAlign: 'center',
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    marginTop: 20,
  },
  imgGray: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.8,
    backgroundColor: '#ccc',
    borderRadius: 5,
    zIndex: 1,
  },
});

export { styles };
