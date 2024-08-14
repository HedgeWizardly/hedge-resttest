import * as React from 'react';
import './App.css'
import { Button, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios';

function App() {
  const [textInput, setTextInput] = React.useState<string>("")
  const [status, setStatus] = React.useState<"idle"|"progress"|"success"|"error">("idle")
  const [loginToken, setLoginToken] = React.useState<string|null>(null)

  const handleTextChange = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    setTextInput(event.target.value)
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
      <Typography>My Rest Test</Typography>
      <TextField value={textInput} onChange={handleTextChange} helperText="Please enter a value here."/>
      <Button variant="contained" onClick={()=>handleSubmit()}>{status=="idle" ? "Submit" : status=="progress" ? "Please wait..." : status=="error" ? "Oops..." : "Done!"}</Button>
    </Stack>
  )
}

export default App
