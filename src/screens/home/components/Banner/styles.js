import { StyleSheet, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Typography, Colors } from '../../../../styles';

let width = Dimensions.get('window').width;

export const Container = styled.View`
  flex: 1;
  border-radius: 8px;
  background: ${Colors.WHITE};
`;

export const ListBanner = styled.FlatList`
  flex: 1;
  min-height: 110px;
`;

export const ContainerRender = styled.TouchableOpacity`
  align-items: center;
  width: ${width * 0.81}px;
  background: ${Colors.GREY_BACKGROUND};
  flex-direction: row;
  border-top-width: 0.2px;
  border-bottom-width: 0.2px;
  border-color: ${Colors.GREY};
  margin-right: 10px;
`;

export const ContentTextView = styled.View`
  flex: 1;
  justify-content: center;
  margin-left: 10px;
  height: 100%;
`;

export const CompanyImageView = styled.View`
  margin-right: 10px;
`;

const styles = StyleSheet.create({
  swiperContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
    flexDirection: 'row',
    borderRadius: 7,
    height: 100,
  },
  banner: {
    borderRadius: 7,
    width: width * 0.75,
    height: 100,
    marginRight: 20,
  },
  title: {
    color: Colors.GREY,
    justifyContent: 'center',
    alignContent: 'center',
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_18,
    letterSpacing: 1,
    marginVertical: 12,
  },
  productBanner: {
    width: 60,
    height: 60,
  },
  companyImage: {
    width: 50,
    height: 50,
  },
  txtProductName: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    letterSpacing: 1,
    fontSize: Typography.FONT_SIZE_14,
    marginTop: 5,
  },
  txtDescrition: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  txtInfo: {
    fontSize: Typography.FONT_SIZE_11,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.BLACK,
  },
  txtPrice: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    textDecorationLine: 'line-through',
    color: Colors.ALERT,
  },
  txtPricePromotion: {
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    color: Colors.PRIMARY,
  },
});

export { styled, styles };
