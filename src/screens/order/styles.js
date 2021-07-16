import { StyleSheet } from 'react-native';
import { Typography, Colors } from '../../styles';
import styled from 'styled-components/native';

export const ListItemWrapper = styled.View``;

export const ListItem = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  padding: 0 10px;
`;

export const LeftContent = styled.View`
  flex: 1;
  justify-content: center;
`;

export const AcceptButton = styled.View`
  border-left-width: 2px;
  border-color: #f5f3f4;
  justify-content: center;
  padding-left: 15px;
  padding-right: 5px;
`;

export const AcceptButtonText = styled.Text`
  font-weight: bold;
  color: ${Colors.GREY};
`;

export const ListItemText = styled.Text`
  color: ${props => (props.color ? props.color : '#c3c3c3')};
  font-size: ${props => (props.size ? props.size : 14)}px;
  padding-top: 2px;
`;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    marginTop: 0,
    paddingTop: 15,
    zIndex: 1,
  },
  infoOrder: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 5,
  },
  txtHeader: {
    textAlign: 'center',
    flex: 1,
    color: Colors.PRIMARY,
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  backIcon: {
    color: Colors.PRIMARY,
  },
  addIcon: {
    color: Colors.PRIMARY,
    marginRight: 10,
  },
  flatList: {
    margin: 20,
  },
  cardList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageCompany: {
    width: 80,
    height: 80,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 15,
    marginRight: 2,
  },
  txtTitle: {
    fontSize: Typography.FONT_SIZE_18,
    color: Colors.PRIMARY,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  txtStatus: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    color: Colors.GREY,
  },
  txtData: {
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.GREY,
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  divider: {
    marginVertical: 15,
    borderWidth: 0.5,
  },
  txtInfo: {
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.PRIMARY,
  },
  btContainer: {
    width: '80%',
    marginTop: 15,
    flexDirection: 'column',
  },
  canceledText: {
    marginTop: 10,
    marginBottom: 10,
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    marginLeft: 105,
  },
  canceledView: {
    // marginTop: 0,
    // marginHorizontal: 20,
    // marginVertical: 15,
    // borderRadius: 3,
    // flexDirection: 'row',
    // marginBottom: 20,
    // borderWidth: 0.5,
    // borderColor: Colors.PRIMARY,
    // shadowRadius: 3.84,
    // backgroundColor: Colors.PRIMARY,
    // textAlign: 'center',
    // alignItems: 'center',
    marginTop: 10,
  },
  boxAvaliation: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  boxAvaliationBack: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.2)',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  boxAvaliationInfo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalAvaliationImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  boxAvaliationInfoText: {
    alignItems: 'center',
  },
  modalAvaliationTextName: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.PRIMARY,
  },
  boxAvaliationView: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  starAvaliation: {
    padding: 15,
  },
  boxStarAvaliationDisable: {
    alignItems: 'flex-start',
  },
  starAvaliationDisable: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  buttonAvaliation: {
    backgroundColor: Colors.PRIMARY,
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonAvaliationText: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_18,
    color: '#fff',
  },
  boxInput: {
    flexDirection: 'row',
    marginTop: 20,
  },
  inputDescription: {
    flex: 1,
    shadowOpacity: 0.25,
    fontSize: Typography.FONT_SIZE_13,
    maxHeight: 100,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: Colors.PRIMARY,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 3,
    padding: 10,
    elevation: 2,
    marginHorizontal: 5,
  },
  textStyle: {
    color: Colors.WHITE,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textAreaContainer: {
    borderColor: Colors.grey20,
    borderWidth: 0,
    padding: 5,
    flexDirection: 'row',
    textAlign: 'center',
  },
  textArea: {
    flex: 1,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: 'row',
    marginTop: 0,
    marginVertical: 15,
  },
  modalViewButton: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  image: {
    marginTop: 18,
  },
});
