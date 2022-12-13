import React,{useContext} from "react";
import { Dialog, Box, List, ListItem, Typography, styled } from "@mui/material";
import { qrCodeImage } from "../../constants/data";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode"
import { AccountContext } from "../../context/AccountProvider";
import { addUser } from "../../services/api";
const dialogStyle = {
  height: "96%",
  marginTop: "12%",
  width: "60%",
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "none",
  overflow: "hidden",
};
const Component = styled(Box)`
  display: flex;
`;
const Container = styled(Box)`
  padding: 56px 0 56px 56px;
`;

const QRCODE = styled("img")({
  height: 264,
  width: 264,
  margin: "50px 0  0 50px",
});
const Title = styled(Typography)`
    font-size :26px;
    color:#41525d,
    font-weight: 300;
    font-family:inherit;
    margin-bottom:25px;
`;
const StyleList = styled(List)`
  & > li {
    padding: 0;
    margin-top: 15px;
    font-size: 18px;
    line-height: 28px;
    color: #4a4a4a;
  }
`;
const LoginDialog = () => {
    const {setAccount} = useContext(AccountContext)
    const onLoginSuccess =(res)=>{
        const decode = jwt_decode(res.credential)
        setAccount(decode)
        addUser(decode)
    }
    const onLoginError =()=>{

    }
  return (
    <Dialog open={true} PaperProps={{ sx: dialogStyle }} hideBackdrop={true}>
      <Component>
        <Container>
          <Title>To use WhatsApp on your computer:</Title>
          <StyleList>
            <ListItem>1. Open WhatsApp on your phone</ListItem>
            <ListItem>
              2. Tap Menu or Settings and select Linked Device
            </ListItem>
            <ListItem>3. Tap on Link a Device</ListItem>
            <ListItem>
              4. Point your phone to this screen to capture the code
            </ListItem>
          </StyleList>
        </Container>
        <Box style={{position:'relative'}}>
          <QRCODE src={qrCodeImage} alt="qr code" />
          <Box style={{position:'absolute',top:`50%`,transform:'translateX(30%)'}}>
            <GoogleLogin
              onSuccess={onLoginSuccess}
              onError={onLoginError}
            />
            
          </Box>
        </Box>
      </Component>
    </Dialog>
  );
};

export default LoginDialog;
