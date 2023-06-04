import axios from "axios";
import React from "react";

import theme from './Theme';
import { ThemeProvider, CssBaseline, Grid, Box, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';



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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Admin Panel</h1>
                <Button variant='outlined' size='small' color='info' sx={{ ml:'auto', mt:'25px' }} onClick={() => window.location.href = '/'}>retour</Button>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <TableContainer>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell>userId</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Admin</TableCell>
                        <TableCell>Créé le</TableCell>
                        <TableCell>Supprimer</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {users !== [] && users.map((user) => (
                        <TableRow key={user.userId}>
                        <TableCell>{user.userId}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.isAdmin.toString()}</TableCell>
                        <TableCell>{user.userCreatedAt}</TableCell>
                        <TableCell><Button variant="outlined" type="submit" size="small" color="error" onClick={() => handleDelete(user.userId)}><DeleteIcon /></Button></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default AdminPanel;