import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { Typography } from '@mui/material';

type ProgressBarProps={
    steps:{
        stepTitle:string,
        stepDescription:string,
        isFinished: boolean,
        category:string
    }[]
}

const Progressbar = ({steps}:ProgressBarProps) => {
    return (
    <Timeline position="right">
        {steps.map(({isFinished,stepTitle, stepDescription, category},index)=>{
            return(
            <TimelineItem key={index}>
                <TimelineOppositeContent
                  sx={{ m: 'auto 0' }}
                  align="right"
                  variant="body2" 
                  color="text.secondary">
                  {category}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineConnector />
                    <TimelineDot color={isFinished? 'success': 'secondary'}/>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                  <Typography variant="h6" component="span">
                    {stepTitle}
                  </Typography>
                  <Typography>{stepDescription}</Typography>
                </TimelineContent>
            </TimelineItem>
            )
        })}
    </Timeline>
          );
}

export default Progressbar