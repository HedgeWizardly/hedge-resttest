import { Button, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import * as React from 'react';

export default function ({setToken}:{setToken:(tk:string)=>void}) {
    const [username, setUsername] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")
    const [status, setStatus] = React.useState<"idle"|"progress"|"success"|"error">("idle")

    const handleUsernameChange = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setPassword(event.target.value)
    }

    React.useEffect(()=>{
        let timeoutId:NodeJS.Timeout
        if(status=="error" || status=="success") {
          timeoutId = setTimeout(()=>{setStatus("idle"), 3000})
        }
        return () => clearTimeout(timeoutId);
      }, [status])
    
      const handleSubmit = () => {
        setStatus("progress")
        axios.request({
          method:"GET",
          url:"https://api.restful-api.dev/objects"
        }).then((res)=>{
          setStatus("success")
          console.log(res)
        }).catch((err)=>{
          setStatus("error")
          console.error(err)
        })
        
      }

    return (
        <Stack sx={{width:"100%", textAlign:"center"}} gap={1}>
            <Typography>Please log in.</Typography>
            <TextField label="Username" value={username} onChange={handleUsernameChange} helperText="Enter Username (without email suffix)."/>
            <TextField label="Password" value={password} onChange={handlePasswordChange} />
            <Button variant="contained" onClick={()=>handleSubmit()}>{status=="idle" ? "Submit" : status=="progress" ? "Please wait..." : status=="error" ? "Oops..." : "Done!"}</Button>
    </Stack>
    )
}