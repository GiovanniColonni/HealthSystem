import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { FiChevronDown } from 'react-icons/fi';
import OxygenIcon from '../icons/OxyIcon.png';
import HeartIcon from '../icons/HeartBeatingIcon.png';
import { Row, Column } from '@mui-treasury/components/flex';
import API_patient from '../api/API_patient';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function MeasureCard({image, data, name}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardMedia
        className={classes.media}
        image={image}
        title="Oxugen Percentage"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {name}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <FiChevronDown />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
            {data !== undefined && data.length > 0 &&
                data.map(measure => (
                <Typography>{measure.date}: {measure.value}</Typography>
            )) }
            {data === undefined &&
                <Typography paragraph>No Data Available</Typography>}
            {data.length === 0 &&
                <Typography paragraph>No Data Available</Typography>}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default function MeasureList() {

    const history = useHistory()

    const [heartMeasures, setHeartMeasures] = useState({})
    const [oxyMeasures, setOxyMeasures] = useState({})

    useEffect(() => {
        console.log("Google id of patient:" , history.location.state.patient.googleId)
        if (history.location.state.patient.googleId !== undefined) {
        API_patient.getAllMeasures(history.location.state.patient.googleId)
            .then((measures) =>{
                console.log("Some measures: ", measures)
                const listHeart = []
                const listOxy = []
                for (const measure of measures) {
                    if (measure.type === "Operc"){
                        console.log("Adding oxygen measure: ", measure)
                        listOxy.push(measure)
                    } else if (measure.type === "HRate"){
                        console.log("Adding heart measure: ", measure)
                        listHeart.push(measure)
                    } else {
                        console.log("Unrecognised measure: ", measure)
                    }
                }
                setHeartMeasures(listHeart)
                console.log("Heart list updated: ", heartMeasures)
                setOxyMeasures(listOxy)
                console.log("Oxy list updated: ", oxyMeasures)
            })
            .catch((err) =>{
                console.log(err)
            })
        }
    },[]);

    return (
        <>
        <Row>
            <Column style={{width: '50%'}}>
                <MeasureCard image={OxygenIcon} data={oxyMeasures} name="Oxygen percentage"/>
            </Column>
            <Column style={{width: '50%'}}>
                <MeasureCard image={HeartIcon} data={heartMeasures} name="Heart rate"/>
            </Column>
        </Row>
        </>
    )
}