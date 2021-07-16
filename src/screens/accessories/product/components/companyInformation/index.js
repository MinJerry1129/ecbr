import React from 'react';
import {
  styles,
  BoxInformation,
  BoxInformationTitle,
  TitleCompany,
  Informations,
  BoxInformationIcon,
  CircleIconInformation,
} from './Styles';

import IconMaterialCommunity from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { deliveryTime, minPurchase } from '../../../../../utils/screens/product';
import { formatMoney } from '../../../../../utils/index';

const CompanyInformation = ({ company }) => {
  return (
    <BoxInformation>
      <BoxInformationTitle>
        <TitleCompany numberOfLines={1}>
          {company.name && company.name.length > 0 ? `${company.name}` : '-'}{' '}
          {company && company.companyDelivery?.isOpen === false
            ? '- Fechado'
            : null}
        </TitleCompany>
        <Informations>
          {`Entrega: ${formatMoney(company.deliveryPrice)}`} •{' '}
          {deliveryTime(company, false)} • {minPurchase(company)}
        </Informations>
      </BoxInformationTitle>
      <BoxInformationIcon>
        <CircleIconInformation>
          <IconMaterialCommunity
            name="information-variant"
            size={20}
            style={styles.iconInformation}
          />
        </CircleIconInformation>
      </BoxInformationIcon>
    </BoxInformation>
  );
};

export default CompanyInformation;
