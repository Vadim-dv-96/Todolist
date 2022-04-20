import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import React from 'react'
import { useDispatch } from 'react-redux';
import { NullableType, setAppErrorAC } from '../../state/app-reducer';
import { useAppSelector } from '../../state/store';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar = () => {

    const error = useAppSelector<NullableType<string>>(state => state.app.error);
    const dispatch = useDispatch();

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppErrorAC(null))
    }
    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>
    )
}
