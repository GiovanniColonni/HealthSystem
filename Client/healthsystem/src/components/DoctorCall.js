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
import ListItemText from '@material-ui/core/ListItemText';
import { FcAbout, FcComboChart, FcDocument, FcFinePrint, FcMenu, FcPlanner } from 'react-icons/fc';
import { Row, Item, Column } from '@mui-treasury/components/flex';
import IframeJitsi from './IframeJitsi';


const drawerWidth = 240;

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
    width: drawerWidth,
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

const callstyle = {
    container: {
        width: "90%",
        margin: "auto"
    }, call: {
        width: "60%"
    }, menu: {
        width: "35%",
        marginRight: "auto"
    }
}

export default function DoctorCall() {
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
    <Row>
        <Column style={callstyle.menu}>
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
            <List>
            {["Calendar", "Prescription", "Observations", "Measures", "Patient's details"].map((text, index) => (
                <ListItem button key={text}>
                <ListItemIcon>
                    {index === 0 && <FcPlanner size={30} onClick={() => handleMenu(index)} />}
                    {index === 1 && <FcDocument size={30} onClick={() => handleMenu(index)} />}
                    {index === 2 && <FcFinePrint size={30} onClick={() => handleMenu(index)} />}
                    {index === 3 && <FcComboChart size={30} onClick={() => handleMenu(index)} />}
                    {index === 4 && <FcAbout size={30} onClick={() => handleMenu(index)} />}
                </ListItemIcon>
                <ListItemText primary={text} />
                </ListItem>
            ))}
            </List>
        </Drawer>
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Content value={content} />
        </main>
        </div>
        </Column>
        <Column style={callstyle.call}>
            <div style={callstyle.container} >
                <IframeJitsi/>
            </div>
        </Column>
    </Row>
  );
}

function Content({value}) {
  return (
    <>
      {value === 0 &&
        <Typography paragraph>
          CALENDAR
        </Typography>}
        {value === 1 &&
        <Typography paragraph>
          PRESCRIPTION
        </Typography>}
        {value === 2 &&
        <Typography paragraph>
          OBSERVATIONS
        </Typography>}
        {value === 3 &&
        <Typography paragraph>
          MEASURES
        </Typography>}
        {value === 0 &&
        <Typography paragraph>
          PATIENT'S DETAILS
        </Typography>}
    </>
  )
}