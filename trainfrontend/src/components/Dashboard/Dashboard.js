import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Dashboard() {

    const useStyles = makeStyles(theme => ({
        fab: {
            margin: theme.spacing(1),
            //  marginTop: "5%", 
            marginLeft: "93%"
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
    }));

    const classes = useStyles();

    return (
        <div>
            {/* 
            <Fab href="/hhh" size="large" color="primary" aria-label="Add" className={classes.fab} 
            onClick={() => alert('FAB Rocks!')} >
                <AddIcon /> */}
            <Fab href="/Admin/adduser" 
                size="large" color="primary" aria-label="Add" className={classes.fab}>
                <AddIcon />
            </Fab>
            {/* <Fab href="/edit/:id" color="secondary" aria-label="Edit" className={classes.fab}>
                <Icon>edit_icon</Icon>
            </Fab>
            <Fab disabled aria-label="Delete" className={classes.fab}>
                <DeleteIcon />
            </Fab> */}
        </div>
    );
}
