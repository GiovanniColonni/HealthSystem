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
import BldIcon from '../icons/BloodPressureIcon.png';
import { Row, Column } from '@mui-treasury/components/flex';
import API_patient from '../api/API_patient';
import moment from 'moment';

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
                <Row>
                  <Typography>{moment(measure.date, 'YYYY-MM-DD').format('DD/MM/YYYY')}: </Typography>
                  <Row style={{margin: 'auto'}}>
                    <Typography color="secondary">{measure.value}</Typography>
                  </Row>
                </Row>
            )) }
            {(data === undefined || data.length === 0) &&
                <Typography paragraph>No Data Available</Typography>}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default function MeasureList({googleId}) {

    const [heartMeasures, setHeartMeasures] = useState({})
    const [oxyMeasures, setOxyMeasures] = useState({})
    const [bldMeasures, setBldMeasures] = useState({})

    useEffect(() => {
        console.log("Google id of patient:" , googleId)
        if (googleId !== undefined) {
        API_patient.getAllMeasures(googleId)
            .then((measures) =>{
                console.log("Some measures: ", measures)
                const listHeart = []
                const listOxy = []
                const listBld = []
                for (const measure of measures) {
                    if (measure.type === "OxygenSaturation"){
                        console.log("Adding oxygen measure: ", measure)
                        listOxy.push(measure)
                    } else if (measure.type === "HeartRate"){
                        console.log("Adding heart measure: ", measure)
                        listHeart.push(measure)
                    } else if (measure.type === "BloodPressure"){
                        console.log("Adding blood measure: ", measure)
                        listBld.push(measure)
                    } else {
                        console.log("Unrecognised measure: ", measure)
                    }
                }
                listHeart.sort(function (left, right) {
                  return moment(right.date, "YYYY-MM-DD").diff(moment(left.date, "YYYY-MM-DD"))
                })
                setHeartMeasures(listHeart)
                console.log("Heart list updated: ", heartMeasures)

                listOxy.sort(function (left, right) {
                  return moment(right.date, "YYYY-MM-DD").diff(moment(left.date, "YYYY-MM-DD"))
                })
                setOxyMeasures(listOxy)
                console.log("Oxy list updated: ", oxyMeasures)

                listBld.sort(function (left, right) {
                  return moment(right.date, "YYYY-MM-DD").diff(moment(left.date, "YYYY-MM-DD"))
                })
                setBldMeasures(listBld)
                console.log("Bld list updated: ", bldMeasures)
            })
            .catch((err) =>{
                console.log(err)
            })
        }
    },[googleId]);

    return (
        <>
        <Row style={{margin: 'auto'}}>
            <Column style={{width: '33%', minWidth: '180px'}}>
                <MeasureCard image={OxygenIcon} data={oxyMeasures} name="Oxygen percentage"/>
            </Column>
            <Column style={{width: '34%', minWidth: '180px'}}>
                <MeasureCard image={HeartIcon} data={heartMeasures} name="Heart rate"/>
            </Column>
            <Column style={{width: '33%', minWidth: '180px'}}>
                <MeasureCard image={BldIcon} data={bldMeasures} name="Blood pressure"/>
            </Column>
        </Row>
        </>
    )
}
