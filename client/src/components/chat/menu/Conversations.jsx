import { useState, useEffect, useContext } from 'react';

import { Box, styled, Divider } from '@mui/material';
import { AccountContext } from '../../../context/AccountProvider';
import Conversation from './Conversation';
import { getUsers } from '../../../services/api';


const Component = styled(Box)`
    overflow: overlay;
    height: 81vh;
`;

const StyledDivider = styled(Divider)`
    margin: 0 0 0 70px;
    background-color: #e9edef;
    opacity: .6;
`;

const Conversations = ({text}) => {


  const {account,socket,setActiveUsers} = useContext(AccountContext)
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        let data = await getUsers();
        let fiteredData = data.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
        setUsers(fiteredData);
    }
    fetchData();
}, [text]);
useEffect(()=>{
    socket.current.emit('addUsers',account)
    socket.current.on('getUsers',users=>{
        setActiveUsers(users)
    })
},[account])
  return (
    <Component>
    {
        users && users.map((user, index) => (
            user.sub !== account.sub && 
                <>
                    <Conversation user={user} />
                    {/* {
                        users.length !== (index + 1)  && <StyledDivider />
                    } */}
                    <StyledDivider />
                </>
        ))
    }
</Component>
  )
}

export default Conversations