import { Snackbar, Alert } from "@mui/material"
import SlideTransition from '@mui/material/Slide';

export default function GlobalSnackbar({ snackbar, setSnackbar }){
    return (
        <div>
        { snackbar.open && 
        <Snackbar
            open={true}
            autoHideDuration={6000}
            severity={snackbar.severity}
            message={snackbar.message}
            onClose={() => setSnackbar({...snackbar, open: false})}
            TransitionComponent={SlideTransition}
        >
            <Alert severity={snackbar.severity} onClose={() => setSnackbar({...snackbar, open: false})}>
                {snackbar.message}
            </Alert>
        </Snackbar>
        }
        </div>
    )
};