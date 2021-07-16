import {StyleSheet, Platform} from 'react-native';
import {Typography, Colors} from '../../../../styles';

const styles = StyleSheet.create({
  Title: {
    color: Colors.GREY,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_18,
    marginVertical: 12,
    letterSpacing: 1,
  },
  BoxCompany: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.GRAY_MEDIUM,
    borderRadius: 7,
    padding: Platform.OS === 'ios' ? 10 : 5,
    width: 250,
    marginRight: 10,
    marginBottom: 20,
  },
  BoxCompanyInfo: {
    flex: 1,
  },
  Brand: {
    width: 70,
    minHeight: 50,
    marginRight: 16,
  },
  bike: {
    width: 20,
    height: 12,
    marginRight: 4,
  },
  CompanyName: {
    fontFamily: Typography.FONT_FAMILY_LIGHT,
    fontSize: Typography.FONT_SIZE_16,
    letterSpacing: 1,
    marginBottom: 4,
  },
  BoxInfoCompany: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  InfoCompanyText: {
    color: Colors.GRAY_DARK,
    marginRight: 3,
  },
  success: {
    color: Colors.SUCCESS,
  },
  hr: {
    backgroundColor: Colors.GRAY_LIGHT,
    width: '100%',
    height: 2,
    marginBottom: 5,
  },
  BoxCompanyFooter: {
    backgroundColor: Colors.GRAY_LIGHT,
    borderColor: Typography.PRIMARY,
    paddingVertical: 10,
    paddingLeft: 5,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  textKm: {
    color: Colors.PRIMARY,
    marginRight: 5,
  },
  CompanyFooterText: {
    color: Colors.PRIMARY,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_14,
    letterSpacing: 1,
  },
});

export default styles;
