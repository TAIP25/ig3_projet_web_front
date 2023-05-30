import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import axios from "axios";
import React from "react";

import theme from './Theme';
import { Button, Grid, Box } from '@mui/material';



function AdminPanel({ setSnackbar }) {

    const [users, setUsers] = React.useState([]);

    const handleDelete = (userId) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/admin/delete/${userId}`, { withCredentials: true })
        .then((res) => {
            setSnackbar(prevState => ({
                ...prevState,
                open: true,
                severity: res.data.severity,
                message: res.data.result,
            }));
            axios.get(`${process.env.REACT_APP_API_URL}/admin/getAllUsers`, { withCredentials: true })
            .then((res) => {
                setUsers(res.data.users);
            })
            .catch((err) => {
                if(err.response.status === 401){
                    setSnackbar(prevState => ({
                        ...prevState,
                        open: true,
                        severity: 'error',
                        message: 'Vous n\'êtes pas autorisé à accéder à cette page !',
                    }));
                    // Redirection vers la page de connexion
                    window.location.href = '/connexion';
                }
                console.log(err);
            });
        })
        .catch((err) => {
            if(err.response.status === 401){
                setSnackbar(prevState => ({
                    ...prevState,
                    open: true,
                    severity: 'error',
                    message: 'Vous n\'êtes pas autorisé à accéder à cette page !',
                }));
                // Redirection vers la page de connexion
                window.location.href = '/connexion';
            }
            console.log(err);
        });
    };

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/admin/getAllUsers`, { withCredentials: true })
        .then((res) => {
            setUsers(res.data.users);
        })
        .catch((err) => {
            if(err.response.status === 401){
                setSnackbar(prevState => ({
                    ...prevState,
                    open: true,
                    severity: 'error',
                    message: 'Vous n\'êtes pas autorisé à accéder à cette page !',
                }));
                // Redirection vers la page principale
                window.location.href = '/';
            }
            console.log(err);
        });
        // eslint-disable-next-line
    }, [setSnackbar]);

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container spacing={2} sx={{ mg: '20px' }}>
            <Grid item xs={12}>
                <h1>Admin Panel</h1>
            </Grid>
            <Grid item xs={12}>
                <Box style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    padding: '10px',
                    justifyContent: 'space-between',
                }}>
                    <h4 style={{ marginRight: '200px' }}>userId</h4>
                    <h4>Email</h4>
                    <h4>Admin</h4>
                    <h4>Créé le</h4>
                    <h4>Supprimer</h4>
                </Box>
            </Grid>
            {users !== [] &&
            users.map((user) => (
                <Grid item xs={12} key={user.userId} style={
                    {
                        border: '1px solid #23a9d5',
                        padding: '10px',
                        marginBottom: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }
                }>
                <Box style={{ 
                        position: 'relative', 
                        width: '100%', 
                        height: '100%', 
                        display: 'flex',
                        padding: '10px',
                        justifyContent: 'space-between',
                    }}>
                    <p>{user.userId}</p>
                    <p>{user.email}</p>
                    <p>{user.isAdmin.toString()}</p>
                    <p>{user.userCreatedAt}</p>
                </Box>
                <Button variant="contained" type="submit"  size="small" color="primary" style={{ marginLeft: '150px' }} onClick={() => handleDelete(user.userId)}> Supprimer </Button>
                </Grid>
            ))}
        </Grid>
        </ThemeProvider>
    );
}

export default AdminPanel;