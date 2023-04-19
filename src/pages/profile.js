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

// mui icons
import SchoolIcon from '@mui/icons-material/School';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import BarChartIcon from '@mui/icons-material/BarChart';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <div className="flex flex-row w-full h-full">
            <LeftSidebar></LeftSidebar>

            <div className="flex flex-col w-full h-full" data-id="main-container">
                <div className="flex flex-row px-2 font-bold sm:px-4 lg:px-4 max-h-20 bg-white-800 py-3 justify-between border-b border-b-gray-200" data-id="header">
                    <a href="/" className="m-0 p-0 leading-none text-2xl self-center">
                        Code Together
                    </a>
                    <Button className="font-bold px-6 text-white bg-blue-600 hover:bg-blue-500 capitalize">
                        New Lobby
                    </Button>
                </div>

                <div className="flex grow max-w-full" data-id="main-content">
                    <div className="p-5 w-1/4" data-id="profile-left-summary">
                        <div>
                            <img src="https://avatars.githubusercontent.com/u/10101138?v=4" className="rounded-full w-20 h-20" data-id="profile-picture"></img>
                        </div>
                        <div className="font-bold text-xl" data-id="profile-name">
                            John Doe
                        </div>
                        <div className="text-gray-400" data-id="profile-username">
                            @johndoe
                        </div>
                        <div className="text-gray-400 my-2" data-id="profile-location">
                            San Francisco, CA
                        </div>
                        <div className="text-gray-400 text-sm mt-3" data-id="profile-bio">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet lorem. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet lorem.
                        </div>
                        <Button className="bg-blue-200 text-blue-800 text-sm my-5 font-medium rounded-md py-2 px-4 my-auto opacity-80 hover:bg-blue-100 hover:opacity-100">
                            Edit Profile
                        </Button>
                    </div>

                    <div className="grow" data-id="profile-right">
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
                                            0/10
                                        </div>
                                        <Chip className="opacity-75 truncate font-bold bg-orange-300 text-orange-700 mr-2 self-center hover:opacity-100" label="medium"/>
                                        <div className="text-right">
                                            0/10
                                        </div>
                                        <Chip className="opacity-75 truncate font-bold bg-rose-300 text-rose-700 mr-2 self-center hover:opacity-100" label="hard"/>
                                        <div className="text-right">
                                            0/10
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
                                            0
                                        </div>
                                        <div>
                                            <SentimentSatisfiedAltIcon/> Friendly
                                        </div>
                                        <div className="text-right">
                                            0
                                        </div>
                                        <div>
                                            <ArchitectureIcon/> Skilled
                                        </div>
                                        <div className="text-right">
                                            0
                                        </div>
                                        <div>
                                            <BarChartIcon/> Total
                                        </div>
                                        <div className="text-right">
                                            0
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 border border-gray-200 m-3 py-4 px-5" data-id="calendar">
                                <h2 className="font-medium mb-2">
                                    Calendar
                                </h2>
                                <CalendarHeatmap
                                    gutterSize={3}
                                    values={[
                                        { date: '2023-01-01', count: 21 },
                                        { date: '2023-01-22', count: 19 },
                                        { date: '2023-01-30', count: 9 },
                                        // ...and so on
                                    ]}
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

                                    }}
                                />
                            </div>
                        </TabPanel>
                        <TabPanel className="flex grow justify-center w-full" value={value} index={1}>
                            <Button className="flex flex-row w-full border-solid border-b border-b-slate-300 justify-between pt-3 pb-4 my-2 hover:cursor-pointer hover:bg-sky-100">
                                <div>
                                    <h2 className="ml-4 mb-2 text-lg font-medium capitalize text-left ">
                                        Flight Itinerary
                                    </h2>
                                    <DifficultyChip difficulty="Easy"></DifficultyChip>
                                    <span className="text-xs text-slate-500 lowercase">
                                        3 minutes ago
                                    </span>
                                </div>
                                <IconButton className="self-center w-10 h-10 mr-3">
                                    <ChevronRightIcon/>
                                </IconButton>
                            </Button>                            
                        </TabPanel>
                    </div>
                </div>
            </div>
        </div>
    )
}