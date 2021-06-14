import React, {useState} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { FcAbout, FcComboChart, FcDocument, FcPlanner } from 'react-icons/fc';
import { FaFileUpload } from 'react-icons/fa';
import IframeJitsi from './IframeJitsi';
import BigCalendar from './BigCalendar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const drawerWidth = '50%';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    '& .MuiDrawer-paper': {
        top: 'auto',
        position: 'unset'
      },
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    '& .MuiDrawer-paper': {
        top: 'auto',
        position: 'unset'
      },
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
      top:'auto'
  }
}));

const menustyle = {
  iconlist: {
    width: '15%'
  },
  content: {
    width: '80%',
    marginLeft: 'auto'
  },
  flex: {
    display: 'flex'
  }, 
  okbutton: {
    backgroundColor: "#8BC24A"
  }
}

export default function DoctorCall({user}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(0);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (value) => {
    setContent(value);
  };

  return (
        <div className={classes.root}>
        <CssBaseline />
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
            })}
            classes={{
            paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            }),
            }}
        >
            <div className={classes.toolbar}>
                {open === true ?
                    <IconButton onClick={handleDrawerClose}>
                        <FiChevronLeft /> 
                    </IconButton> :
                    <IconButton onClick={handleDrawerOpen}>
                        <FiChevronRight /> 
                    </IconButton>
                }
            </div>
            <Divider />
            <div style={menustyle.flex}>
            <List style={menustyle.iconlist}>
            {["Calendar", "Prescription", "Measures", "Patient's details"].map((text, index) => (
                <ListItem button key={text}  onClick={() => handleMenu(index)} >
                <ListItemIcon>
                    {index === 0 && <FcPlanner size={30}/>}
                    {index === 1 && <FcDocument size={30}/>}
                    {index === 2 && <FcComboChart size={30}/>}
                    {index === 3 && <FcAbout size={30}/>}
                </ListItemIcon>
                
                </ListItem>
            ))}
            </List>
              <List style={menustyle.content}>
                
              <Content value={content} doctor={user} visible={open}/>
              </List>
            </div>
        </Drawer>
        
        <main className={classes.content}>
                <IframeJitsi/>
        </main>
        </div>
  );
}

function Content({value, visible, doctor}) {
  return (
    <>
      {value === 0 && visible === true &&
        <div>
          <Typography h1>Calendar</Typography>
          <BigCalendar user={doctor} defaultView="day"/>
        </div>}
        {value === 1 && visible === true &&
        <div>
          <Typography h1>Prescription</Typography>
          <Typography h2>Upload Prescription</Typography>
          <IconButton>
            <FaFileUpload />
          </IconButton>
          <TextField
            id="outlined-textarea"
            label="Observations"
            placeholder="Write here"
            multiline
            variant="outlined"
          />
          <Button
              variant="contained"
              color="secondary"
              style={menustyle.okbutton}
              fullwidth
          >
              Validate
          </Button>

        </div>}
        {value === 2 && visible === true &&
        <div>
          <Typography h1>Measures</Typography>
        </div>}
        {value === 3 && visible === true &&
        <div>
          <Typography h1>Patient's details</Typography>
        </div>}
    </>
  )
}