/* eslint-disable no-console */
import {useState } from 'react';

import { Box } from '@material-ui/core';
import useToken from '../../../hooks/useToken';
import useEnrollment from '../../../hooks/api/useEnrollment';

import Selection from './Selection';
import CardForm from './CreditCard';

import { StyledTypography, ButtonContainer } from './style';

export default function PaymentPage() {
  const { token } = useToken();

  const { enrollment } = useEnrollment();

  const [isReservationReady, setIsReservationReady] = useState(false);

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      {!enrollment ? (
        <Box display="flex" alignItems="center" justifyContent="center" height="100%">
          <StyledTypography variant="h6" color="textSecondary">
            Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso
          </StyledTypography>
        </Box>
      ) : isReservationReady ? (
        <CardForm />
      ) : (
        <Selection setIsReservationReady={setIsReservationReady} />
      )}
    </>
  );
}


