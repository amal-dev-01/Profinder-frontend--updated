import React, { useState } from 'react';
import axiosInstance from '../../features/axios';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { baseURL } from '../../features/baseUrl';
import { useNavigate } from 'react-router-dom';


const SearchProfessionals = () => {
    const authToken = localStorage.getItem('authtoken');

  const [jobTitle, setJobTitle] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()

  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get(
        `/search/?job_title=${jobTitle}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status !== 200) {
        throw new Error('Failed to fetch data');
      }
      console.log(response.data);
  
      setSearchResults(response.data);
      setErrorMessage('');
    } catch (error) {
      setSearchResults([]);
      setErrorMessage('Error fetching data');
    }
  };
  

  return (
    <div >
    
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <input
      type="text"
      value={jobTitle}
      placeholder="Search job..."
      onChange={(e) => setJobTitle(e.target.value)}
      style={{
        width: '60%',
        padding: '8px',
        fontSize: '16px',
        borderRadius: '25px',
        marginRight: '8px', 
        marginTop:"25px"
      }}
    />

    <IconButton onClick={handleSearch}>
      <SearchIcon  
        style={{
        marginTop:"25px"
      }}
/>
    </IconButton>
  </div>

      {errorMessage && <p>{errorMessage}</p>}

      <List
        sx={{
          width: '100%',
          maxWidth: 600,
          margin: 'auto',
          bgcolor: 'background.paper',
        }}
      >
        {searchResults.map((result) => (
          <ListItem alignItems="center" key={result.id} onClick={()=>navigate(`userview/${result.id}`)}>
            <ListItemAvatar>
              <Avatar
                alt={result.username[0]}
                src={`${baseURL}${result?.professionalprofile?.image}`}
              />
            </ListItemAvatar>
            <ListItemText
              primary={`${result?.first_name} ${result?.last_name}`}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {result?.professionalprofile?.job}
                  </Typography>
                  {result?.professionalprofile?.skills}
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
    </div>

  );
};

export default SearchProfessionals;
