import React, { useState } from 'react';
import axiosInstance from '../features/axios';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const UpdateImageForm = ({ onClose }) => {
    const [image, setImage] = useState('');

    const authToken = localStorage.getItem('authtoken');


    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('userprofile.image', image || '');


            const response = await axiosInstance.put('userprofile/', formData, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);
            onClose();
        } catch (error) {
            console.error('Image upload failed:', error.message);
        }
    };
    return (
        <Modal open={true} onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Upload Image
                </Typography>
                <div>
                    <form onSubmit={handleUpload}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            style={{ margin: '1rem 0' }}
                        />
                        <Button type='submit'>Upload</Button>
                    </form>

                </div>
            </Box>
        </Modal>
    );
};

export default UpdateImageForm;
