import { Box, styled, Typography,Divider } from '@mui/material'
import React from 'react'
import { emptyChatImage } from '../../../constants/data'

const Component = styled(Box)`
    background:#f8f9fa;
    padding :30px 0;
    text-align:center;
    height:100vh;
`
const Container = styled(Box)`
    padding : 0 200px;
`
const Image = styled('img')({
    width:400,
    marginTop:100
})
const Title = styled(Box)`
    font-size:32px;
    margin :25px 0 10px 0;
    font-family:inherit;
    font-weight:300;
    color:#41525d
`
const SubTitle = styled(Typography)`
    font-size:14px;
    font-family:inherit;
    font-weight:400;
    color:#667781
`
const StyleDivider = styled(Divider)`
    margin:40px 0;
    opacity:0.4;
`
const EmptyChat = () => {
  return (
    <Component>
    <Container>
        <Image src={emptyChatImage} alt='emptyChatImage'/>
        <Title>Whatsapp Web</Title>
        <SubTitle>Now send and receive message without keeping your phone online</SubTitle>
        <SubTitle>use Whatsapp on up to 4 linked device and 1 phone at a time </SubTitle>
        <StyleDivider/>
    </Container>
    </Component>
  )
}

export default EmptyChat