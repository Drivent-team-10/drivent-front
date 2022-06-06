import React, { useState } from 'react';
import useCardForm from '../../../hooks/userCardForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { Box, Input, InputLabel, Typography } from '@material-ui/core';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '../../Form/Button';
import ValidThruMask from './CardInputMasks/ValidThruMask';
import CvcMask from './CardInputMasks/CvcMask';
import CardNumberMask from './CardInputMasks/CardNumberMask copy';
import usePayment from '../../../hooks/usePayment';
import useToken from '../../../hooks/useToken';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

const style = {
  inputContainer: {
    border: '1px solid gray',
    borderRadius: 15,
    height: 45,
    padding: '8px 0 2px 20px',
  },
};

export default function CardForm() {
  const token = useToken();
  const { paymentInfo } = usePayment();
  const { handleChange, handleFocus, handleSubmit, values, errors } = useCardForm();
  const [loadConfirmation, setLoad] = useState(false);

  const ConfirmationComponent = (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 15 }}>
      <Box>
        <CheckCircleIcon sx={{ fontSize: '50px', color: '#36B853' }} />
      </Box>
      <Box>
        <Typography>Pagamento confirmado!</Typography>
        <Typography>Prossiga para escolha de hospedagem e atividades</Typography>
      </Box>
    </Box>
  );

  async function handleSubmitPayment(e) {
    e.preventDefault();
    console.log(values);
    const { cardExpiration: validThru, cardName: name, cardNumber: number, cardSecurityCode: cvc } = values;
    const isValidDateInput = validateValidTru(validThru);

    if (!isValidDateInput) {
      return toast('Data de validade do cartão inválida');
    }

    console.log({ validThru, name, number, cvc });
    setLoad(true);
    return;
    // try {
    //   await reserveTicket(paymentInfo, token);
    // } catch (error) {
    //   toast('Não foi possível reservar o ingresso!');
    // }
  }

  function validateValidTru(validThru) {
    const currentYear = dayjs().format('YY');
    const monthInput = validThru.split('/')[0];
    const yearInput = validThru.split('/')[1];
    if (monthInput < 1 || monthInput > 12) {
      return false;
    }
    if (yearInput < currentYear) {
      return false;
    }
    return true;
  }

  if (loadConfirmation) {
    return ConfirmationComponent;
  }

  return (
    <Box sx={{}}>
      <Box sx={{ display: 'flex', alignItems: 'start', gap: 30, margin: '0 0 20px 0' }}>
        <Box>
          <Cards
            cvc={values.cardSecurityCode}
            expiry={values.cardExpiration}
            focused={values.focus}
            name={values.cardName}
            number={values.cardNumber}
          />
        </Box>
        <Box sx={{ height: '80%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <Box sx={style.inputContainer}>
              <Input
                required
                fullWidth
                disableUnderline={true}
                type="text"
                id="cardNumber"
                data-testid="cardNumber"
                name="cardNumber"
                placeholder="Card Number"
                variant="outlined"
                margin="dense"
                value={values.cardNumber}
                onChange={handleChange}
                onFocus={handleFocus}
                inputComponent={CardNumberMask}
              ></Input>
            </Box>
            <InputLabel>E.g.: 49..., 51..., 36..., 37...</InputLabel>

            <Box sx={style.inputContainer}>
              <Input
                required
                fullWidth
                disableUnderline={true}
                type="text"
                id="cardName"
                data-testid="cardName"
                name="cardName"
                placeholder="Name"
                margin="dense"
                variant="outlined"
                value={values.cardName}
                onChange={handleChange}
                onFocus={handleFocus}
              ></Input>
            </Box>

            <Box sx={{ display: 'flex', gap: 8 }}>
              <Box sx={style.inputContainer}>
                <Input
                  required
                  fullWidth
                  disableUnderline={true}
                  type="text"
                  id="cardExpiration"
                  data-testid="cardExpiration"
                  name="cardExpiration"
                  margin="dense"
                  placeholder="Valid Thru"
                  variant="outlined"
                  value={values.cardExpiration}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  inputComponent={ValidThruMask}
                ></Input>
              </Box>
              <Box sx={style.inputContainer}>
                <Input
                  required
                  fullWidth
                  disableUnderline={true}
                  type="text"
                  id="cardSecurityCode"
                  data-testid="cardSecurityCode"
                  name="cardSecurityCode"
                  placeholder="CVC"
                  margin="dense"
                  variant="outlined"
                  value={values.cardSecurityCode}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  inputComponent={CvcMask}
                ></Input>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Button onClick={handleSubmitPayment}>Finalizar Pagamento</Button>
    </Box>
  );
}
