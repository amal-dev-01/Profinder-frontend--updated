import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axiosInstance from '../features/axios';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserProfile } from '../features/authSlice';
import { userProfile } from '../features/authAction';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import UpdateImageForm from './UpdateImageForm';

const EditUserProfile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [address, setAddress] = useState('');
  const [job, setJob] = useState('');
  const [skill, setSkill] = useState('');
  const [exp, setExp] = useState('');



  // const [image, setImage] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);

  const handleUploadClick = () => {
    setShowUploadForm(true);
  };


  const [errors, setErrors] = useState()
  const [successMsg, setSuccessMsg] = useState()

  const dispatch = useDispatch();
  const authToken = localStorage.getItem('authtoken');
  const userProfileData = useSelector(selectUserProfile);

  useEffect(() => {
    if (authToken) {
      dispatch(userProfile());
    }
  }, [authToken, dispatch]);

  useEffect(() => {
    if (userProfileData) {
      setUsername(userProfileData.username || '');
      setEmail(userProfileData.email || '');
      setFirstName(userProfileData.first_name || '');
      setLastName(userProfileData.last_name || '');
      setPhone(userProfileData.phone || '');
      setBio(userProfileData.userprofile?.bio || userProfileData.professionalprofile?.bio || '');
      setAddress(userProfileData.userprofile?.address || userProfileData.professionalprofile?.address ||'');
      setJob(userProfileData.professionalprofile?.job ||'');
      setSkill( userProfileData.professionalprofile?.skills ||'');
      setExp( userProfileData.professionalprofile?.experience ||'');
    }
  }, [userProfileData]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authToken = localStorage.getItem('authtoken');

      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('first_name', first_name);
      formData.append('last_name', last_name);
      formData.append('phone', phone);
      formData.append('userprofile.bio', bio || ' ');
      formData.append('userprofile.address', address || ' ');
  
      if (userProfileData.is_professional) {
        formData.append('professionalprofile.bio', bio || ' ');
        formData.append('professionalprofile.address', address || ' ');
        formData.append('professionalprofile.job', job.trim() || 'Default Job');
        formData.append('professionalprofile.experience', parseInt(exp, 10) || 0);
        formData.append('professionalprofile.skills', skill.trim() || 'Default Skills');
      }
  



      // formData.append('userprofile.image', image || '');


      const response = await axiosInstance.put('userprofile/', formData, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status == 200) {
        setSuccessMsg("Sucessfully updated")

      }
      console.log(response);

    } catch (error) {
      console.error('Error updating profile:', error);
      setErrors(error.response.data.detail.username || error.response.data.detail.email || error.response.data.detail.phone)
    }
  };


  return (
    <div>
      <Container component="main" maxWidth="xs">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


          <Typography component="h1" variant="h5">
            Edit Profile
          </Typography>
          {showUploadForm ? (
            <UpdateImageForm onClose={() => setShowUploadForm(false)} />
          ) : (
            <Button onClick={handleUploadClick} variant='outlined'>+</Button>
          )}
          {errors && (
            <Stack spacing={2} sx={{ width: '100%' }}>
              <Alert severity="error">{errors}</Alert>
            </Stack>
          )}
          {successMsg && (
            <Stack spacing={2} sx={{ width: '100%' }}>
              <Alert severity="success">{successMsg}</Alert>
            </Stack>
          )}

          <form style={{ width: '100%', marginTop: '1rem' }} onSubmit={handleSubmit} encType="multipart/form-data">
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              fullWidth
              label="First Name"
              name="first_name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <TextField
              margin="normal"
              fullWidth
              label="Last Name"
              name="last_name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Bio"
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {userProfileData?.is_professional && (
              <>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Job"
                  name="job"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                />

                <TextField
                  margin="normal"
                  fullWidth
                  label="Skill"
                  name="skill"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                />

                <TextField
                  margin="normal"
                  fullWidth
                  label="Experience"
                  name="exp"
                  value={exp}
                  onChange={(e) => setExp(e.target.value)}
                />
              </>
            )}


            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </form>

        </div>
      </Container>
    </div>
  );
};

export default EditUserProfile;
