import { Box, styled } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react';
import { AccountContext } from '../../../context/AccountProvider';
import { getMessages, newMessage } from '../../../services/api';
import Footer from './Footer';
import Message from './Message';

const Wrapper = styled(Box)`
    background-image: url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'});
    background-size: 50%;
`
const Component = styled(Box)`
    height: 79vh;
    overflow-y: scroll;
`;
const Container = styled(Box)`
    padding: 1px 80px;
`;

const Messages = ({person,conversation}) => {
    const [value,setValue] = useState('')
    const [messages,setMessages] = useState('')
    const [file,setFile] = useState('')
    const [image,setImage] = useState('')
    const [incomingMessage,setIncomingMessage] = useState(null)
    const scrollRef = useRef()
    
    const {account,socket,newMessageFlag,setNewMessageFlag} = useContext(AccountContext)
    useEffect(()=>{
        socket.current.on('getMessage',data=>{
            setIncomingMessage({
                ...data,
                createdAt:Date.now()
            })
        })
    })
    const sendText = async(e)=>{
        const code = e.keyCode || e.which
        if(code===13){
            let  message = {}
      
            if(!file){
                message = {
                    senderId : account.sub,
                    receiverId:person.sub,
                    conversationId : conversation._id,
                    type :"text",
                    text:value
                }
            }else{
                message = {
                    senderId : account.sub,
                    receiverId:person.sub,
                    conversationId : conversation._id,
                    type :"file",
                    text:image
                }
            }
            socket.current.emit('sendMessage',message)
            await newMessage(message)
            setValue('')
            setImage('')
            setFile('')
            setNewMessageFlag(prev=>!prev)
        }
    }
    useEffect(()=>{
        const getMessageDetails = async ()=>{
            let data= await getMessages(conversation._id)
            setMessages(data)
        }
        getMessageDetails()
    },[person._id,conversation._id,newMessageFlag])
    useEffect(()=>{
        incomingMessage && conversation?.members?.includes(incomingMessage.senderId)&& setMessages(prev=>[...prev,incomingMessage])
    },[incomingMessage, conversation])
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({transation:"smooth"})
    },[messages])
  return (
    <Wrapper>
        <Component>
            {
                messages &&  messages.map((message)=>(
                    <Container ref={scrollRef}>
                    <Message message={message}/>
                    </Container>
                    ))
                
            }
        </Component>
        <Footer sendText={sendText} setValue={setValue} value={value} file={file} setFile={setFile} setImage={setImage}/>
    </Wrapper>
  )
}

export default Messages