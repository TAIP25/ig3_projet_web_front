import React from 'react';
import { Button, Grid } from '@mui/material';

export default function PurchaseButtons({turnipMultiple, setTurnipMultiple}){

    return (
    <Grid container justifyContent="flex-end" spacing={1}>
        <Grid item>
        <Button variant={turnipMultiple === 1 ? "contained" : "outlined"} size='small' onClick={() => setTurnipMultiple(1)}>1</Button>
        </Grid>
        <Grid item>
        <Button variant={turnipMultiple === 10 ? "contained" : "outlined"} size='small' onClick={() => setTurnipMultiple(10)}>10</Button>
        </Grid>
        <Grid item>
        <Button variant={turnipMultiple === 100 ? "contained" : "outlined"} size='small' onClick={() => setTurnipMultiple(100)}>100</Button>
        </Grid>
        <Grid item>
        {/*TODO: add max button*/}
        <Button variant="outlined" size='small'>MAX</Button>
        </Grid>
    </Grid>
    );
};