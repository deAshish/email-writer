import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material/';
import TextField from '@mui/material/TextField';
import { useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError(true);
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone
      });
      setGeneratedReply(typeof response.data === "string" ? response.data : JSON.stringify(response.data));

    } catch (error) {
        setError('Failed to generate email reply. Try again later!');
        console.error(error);
    } finally {
        setLoading(false);
    }
  }

  return (
    
     <Container maxWidth="md" sx={{py:4}}>
      <Typography variant='h3' component="h1" gutterBottom>
        Email Reply Generator
      </Typography>
      <Box sx={{mx: 2}}>
        <TextField 
          fullWidth
          multiline
          rows={6}
          variant='outlined'
          label="Original Email Content"
          value={emailContent || ''}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{mb:2}}/>

          <FormControl fullWidth sx={{mb: 2}}>
            <InputLabel> Tone (Optional)</InputLabel>
            <Select
              value={tone || ''} 
              label={"Tone (Optional)"}
              onChange={(e) => setTone(e.target.value)}>
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={"Professional"}>Professional</MenuItem>
                <MenuItem value={"Funny"}>Funny</MenuItem>
                <MenuItem value={"Friendly"}>Friendly</MenuItem>
                <MenuItem value={"Causal"}>Causal</MenuItem>
                <MenuItem value={"Advance"}>Advance</MenuItem>
                
              </Select>
          </FormControl>

          <Button variant='contained'
          onClick={handleSubmit}
          disabled={!emailContent || loading}
          fullWidth>
            {loading ? <CircularProgress size={24} /> : "Generate Reply"}
          </Button>
      </Box>
      {error && (
        <Typography color='error' sx={{mb:2}}>
        {error}
      </Typography>
      )}

      {generatedReply && (
        <Box sx={{mt: 3}}>
          <Typography variant='h6' gutterBottom>
            Generated Reply:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant='outlined'
            value={generatedReply || ""}
            inputProps={{readOnly: true}}/>

          <Button
            variant='outlined'
            sx={{mt:2}}
            onClick={() =>navigator.clipboard.writeText(generatedReply)}>
              copy to clipboard
            </Button>
        </Box>
      )}
     </Container>
    
  )
}

export default App
