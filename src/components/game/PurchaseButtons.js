import React from 'react';
import { Button, Grid } from '@mui/material';

export default function PurchaseButtons({turnipMultiple, setTurnipMultiple}){

    return (
    <Grid container justifyContent="flex-end" spacing={1}>
        <Grid item>
        <Button variant={turnipMultiple === 1 ? "contained" : "outlined"} size='small' color='info' onClick={() => setTurnipMultiple(1)}>1</Button>
        </Grid>
        <Grid item>
        <Button variant={turnipMultiple === 10 ? "contained" : "outlined"} size='small' color='info' onClick={() => setTurnipMultiple(10)}>10</Button>
        </Grid>
        <Grid item>
        <Button variant={turnipMultiple === 100 ? "contained" : "outlined"} size='small' color='info' onClick={() => setTurnipMultiple(100)}>100</Button>
        </Grid>
        <Grid item>
        <Button variant={turnipMultiple === 1000 ? "contained" : "outlined"} size='small' color='info' onClick={() => setTurnipMultiple(1000)}>1K</Button>
        </Grid>
    </Grid>
    );
};