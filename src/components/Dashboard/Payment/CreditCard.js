import React from 'react';
import useCardForm from '../../../hooks/userCardForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { Box, Input, InputLabel } from '@material-ui/core';
import Button from '../../Form/Button';
import ValidThruMask from './CardInputMasks/ValidThruMask';
import CvcMask from './CardInputMasks/CvcMask';
import CardNumberMask from './CardInputMasks/CardNumberMask copy';
import usePayment from '../../../hooks/usePayment';
import useToken from '../../../hooks/useToken';
import { toast } from 'react-toastify';
import useTicket from '../../../hooks/api/useTicket';

const style = {
  inputContainer: {
    border: '1px solid gray',
    borderRadius: 15,
    height: 45,
    padding: '8px 0 2px 20px',
  },
};

export default function CardForm() {
  const { token } = useToken();
  const { paymentInfo } = usePayment();
  const { handleChange, handleFocus, handleSubmit, values, errors } = useCardForm();
  const { reserveTicket } = useTicket();

  async function handleSubmitPayment(e) {
    e.preventDefault();
    console.log(values);
    try {
      await reserveTicket(paymentInfo, token);
    } catch (error) {
      console.log(error)
      toast('Não foi possível reservar o ingresso!');
    }
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
                isValid={errors.cnumber}
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
                isValid={errors.cname}
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
                  isValid={errors.cexp}
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
                  isValid={errors.ccvv}
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
