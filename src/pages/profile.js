import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/LeftSideBar';
import DifficultyChip from '../../components/DifficultyChip';

// heatmap
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';


// mui components
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';

// mui icons
import SchoolIcon from '@mui/icons-material/School';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import BarChartIcon from '@mui/icons-material/BarChart';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SendIcon from '@mui/icons-material/Send';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <>{children}</>
          </Box>
        )}
      </div>
    );
}

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [value, setValue] = React.useState(0);
    const [profile, setProfile] = useState({})

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await fetch('/api/profile');
                const data = await response.json();
                setProfile(data)
                setLoading(false)
              } catch (error) {
                  console.error('Failed to fetch profile data:', error);
                throw error;
              }
        }
        fetchProfile();
      }, []);

    return (
        <div className="flex flex-row w-full h-full">
            <LeftSidebar></LeftSidebar>

            <div className="flex flex-col w-full h-full" data-id="main-container">
                <div className="flex flex-row px-2 font-bold sm:px-4 lg:px-4 max-h-20 bg-white-800 py-3 justify-between border-b border-b-gray-200" data-id="header">
                    <a href="/" className="m-0 p-0 leading-none text-2xl self-center">
                        Code Together
                    </a>
                    <Button className="bg-sky-600 text-white px-3 mx-1 my-auto hover:bg-sky-500" type="submit" color="primary">
                        New Lobby
                    </Button>
                </div>

                <div className="flex grow max-w-full" data-id="main-content">
                    <div className="p-5 w-1/4" data-id="profile-left-summary">
                        <div>
                            {loading ? <Skeleton className="mb-2" width={90} height={90} variant="circular" animation="wave"/> : <img src={profile?.picture} className="rounded-full w-20 h-20" data-id="profile-picture"></img>}
                        </div>
                        <div className="font-bold text-xl" data-id="profile-name">
                            {loading ? <Skeleton className="mb-2" width="40%"  animation="wave"/> : profile?.name}
                        </div>
                        <div className="text-gray-400" data-id="profile-username">
                            {loading ? <Skeleton className="mb-2" width="90%"  animation="wave"/> :  '@' + profile?.username}
                        </div>
                        <div className="text-gray-400 my-2" data-id="profile-location">
                            {loading ? <Skeleton className="mb-2" width="90%"  animation="wave"/> : profile?.location}
                        </div>
                        <div className="text-gray-400 text-sm mt-3" data-id="profile-bio">
                            {loading ? <Skeleton className="mb-2" variant="rectangular" width="90%" height={90} animation="wave"/> : profile?.bio}
                        </div>
                        <Button className="bg-sky-200 text-sky-700 px-3 mt-3 my-auto" variant="outlined">
                         Edit Profile
                        </Button>
                    </div>

                    <div className="grow lg:max-w-lg" data-id="profile-right">
                        <Tabs className="flex items-stretch" value={value} onChange={handleChange}>
                            <Tab label="Overview" {...a11yProps(0)} />
                            <Tab label="History" {...a11yProps(1)} />
                        </Tabs>
                        <TabPanel className="flex grow justify-center w-full" value={value} index={0}>
                            <div className="flex flex-row" data-id="profile-content">
                                <div className="flex-1 border border-gray-200 m-3 p-3" data-id="progress">
                                    <h2 className="font-medium mb-2">
                                        My Progress
                                    </h2>
                                    <div className="grid gap-2 grid-cols-2">
                                        <Chip className="opacity-75 truncate font-bold bg-emerald-200 text-cyan-700 mr-2 max-w-4 self-center hover:opacity-100" label="easy"/>
                                        <div className="text-right">
                                            {loading ? <Skeleton className="mb-2" width="90%" animation="wave"/> : profile?.progress[0].value}
                                        </div>
                                        <Chip className="opacity-75 truncate font-bold bg-orange-300 text-orange-700 mr-2 self-center hover:opacity-100" label="medium"/>
                                        <div className="text-right">
                                            {loading ? <Skeleton className="mb-2" width="90%" animation="wave"/> : profile?.progress[1].value}
                                        </div>
                                        <Chip className="opacity-75 truncate font-bold bg-rose-300 text-rose-700 mr-2 self-center hover:opacity-100" label="hard"/>
                                        <div className="text-right">
                                            {loading ? <Skeleton className="mb-2" width="90%" animation="wave"/> : profile?.progress[2].value}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 border border-gray-200 m-3 p-3" data-id="karma">
                                    <h2 className="font-medium mb-2">
                                        Karma
                                    </h2>
                                    <div className="grid grid-cols-2">
                                        <div>
                                            <SchoolIcon/> Helpful
                                        </div>
                                        <div className="text-right">
                                            {loading ? <Skeleton className="mb-2"  width="90%" animation="wave"/> : profile?.karma.helpful}
                                        </div>
                                        <div>
                                            <SentimentSatisfiedAltIcon/> Friendly
                                        </div>
                                        <div className="text-right">
                                        {loading ? <Skeleton className="mb-2" width="90%" animation="wave"/> : profile?.karma.friendly}
                                        </div>
                                        <div>
                                            <ArchitectureIcon/> Skilled
                                        </div>
                                        <div className="text-right">
                                        {loading ? <Skeleton className="mb-2" width="90%" animation="wave"/> : profile?.karma.skilled}
                                        </div>
                                        <div>
                                            <BarChartIcon/> Total
                                        </div>
                                        <div className="text-right">
                                        {loading ? <Skeleton className="mb-2" width="90%" animation="wave"/> : profile?.karma.total}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 border border-gray-200 m-3 py-4 px-5" data-id="calendar">
                                <h2 className="font-medium mb-2">
                                    Calendar
                                </h2>
                                {loading ? <Skeleton variant="rectangular" width="90%" height={120} animation="wave"/> :
                                    <CalendarHeatmap
                                        gutterSize={4}
                                        values={profile?.calendar}
                                        classForValue={(value) => {
                                        if (!value) {
                                            return 'color-empty';
                                        }

                                        if (value.count > 20) {
                                            return 'color-github-5';
                                        }
                                        
                                        if (value.count > 10) {
                                            return 'color-github-4';
                                        }

                                        if (value.count > 5) {
                                            return 'color-github-3';
                                        }

                                        if (value.count > 2) {
                                            return 'color-github-2';
                                        }

                                        return 'color-github-1';

                                    }}/>
                                }

                            </div>
                        </TabPanel>
                        <TabPanel className="flex grow justify-center w-full" value={value} index={1}>
                            {loading ? <Skeleton className="mt-5" variant="rectangular" width="90%" height={120} animation="wave"/> :
                    
                            profile?.history?.map((question) => {
                                return (
                                    <Button className="flex flex-row w-full border-solid border-b border-b-slate-300 justify-between pt-3 pb-4 my-2 hover:cursor-pointer hover:bg-sky-100">
                                        <div className="grid grid-cols-2"> 
                                            <h2 className="ml-4 mb-2 text-lg font-medium capitalize text-left ">
                                                {question.title}
                                            </h2>
                                    
                                            <DifficultyChip difficulty={question.difficulty}></DifficultyChip>
                                            <span className="text-xs row-start-2 col-start-2 text-slate-500 lowercase self-center text-left">
                                                {question.timeAgo}
                                            </span>
                                        </div>
                                        <IconButton className="self-center w-10 h-10 mr-3">
                                            <ChevronRightIcon/>
                                        </IconButton>
                                    </Button>
                                )
                            })
                            }
                        </TabPanel>
                    </div>
                </div>
            </div>
        </div>
    )
}