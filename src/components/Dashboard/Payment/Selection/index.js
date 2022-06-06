
import { Box } from '@material-ui/core';
import OptionButton from '../Option';
import Button from '../../../Form/Button';

import usePayment from '../../../../hooks/usePayment';

import { StyledTypography, ButtonContainer } from '../style';

export default function Selection({ setIsReservationReady }) {
  const { paymentInfo, handleChange } = usePayment();
  function renderSummary() {
    if (paymentInfo.type === 'online' || (paymentInfo.type === 'presential' && paymentInfo.hotel !== null))
      return (
        <Box>
          <StyledTypography variant="h6" color="textSecondary">
            Fechado! O total ficou em R$ {paymentInfo.type === 'online' ? '100,00' : paymentInfo.hotel ? '600' : '250'}.
            Agora é só confirmar:
          </StyledTypography>
          <Button onClick={() => setIsReservationReady(true)}>Reservar ingresso</Button>
        </Box>
      );
  }

  return (
    <>
      <Box marginBottom="44px">
        <StyledTypography variant="h6" color="textSecondary">
          Primeiro, escolha sua modalidade de ingresso
        </StyledTypography>
        <ButtonContainer>
          <OptionButton
            title={'Presencial'}
            body={'R$ 250,00'}
            value="presential"
            isSelected={paymentInfo.type === 'presential'}
            onClick={(e) => {
              handleChange('type', 'presential');
            }}
          />
          <OptionButton
            title={'Online'}
            body={'R$ 100,00'}
            value="online"
            isSelected={paymentInfo.type === 'online'}
            onClick={(e) => {
              handleChange('type', 'online');
            }}
          />
        </ButtonContainer>
      </Box>
      {paymentInfo.type === 'online' ? (
        ''
      ) : (
        <Box marginBottom="44px">
          <StyledTypography variant="h6" color="textSecondary">
            Ótimo! Agora escolha sua modalidade de hospedagem
          </StyledTypography>
          <ButtonContainer>
            <OptionButton
              title={'com hotel'}
              body={'+ R$ 0'}
              value="presential"
              isSelected={paymentInfo.hotel === false}
              onClick={(e) => {
                handleChange('hotel', false);
              }}
            />
            <OptionButton
              title={'com hotel'}
              body={'+ R$ 350'}
              value="online"
              isSelected={paymentInfo.hotel === true}
              onClick={(e) => {
                handleChange('hotel', true);
              }}
            />
          </ButtonContainer>
        </Box>
      )}
      {renderSummary()}
    </>
  );
}
