import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import { Card } from '@mui/material';
import styled from 'styled-components'
import AdminsPage from './Admins';
import MembersPage from "./MembersPage";

const StyledTabs = styled(Tabs)`
.MuiTabs-indicator {
  background-color: black
}
`

const a11yProps = (index) => {
  return {
    id: `admin-tab-${index}`,
    "aria-controls": `admin-tabpanel-${index}`,
  };
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Card style={{ margin: 5 }} sx={{ p: 3 }}>
          {children}
        </Card>
      )}
    </div>
  );
}


export const AdminHome = () => {
  const [value, setValue] = useState(0)

  const handleChange = (_event, val) => {
    setValue(val)
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Box style={{ padding: 5 }}>
        <StyledTabs value={value} onChange={handleChange}
          TabIndicatorProps={{ color: 'text.primary' }}
          textColor="text.primary"
        //  indicatorColor="secondary"
        >
          <Tab disableRipple label={<strong>REPORTED CONTENT</strong>} {...a11yProps(0)} />
          <Tab disableRipple label={<strong>MEMBERS</strong>} {...a11yProps(1)} />
          <Tab disableRipple label={<strong>COMMUNITIES</strong>} {...a11yProps(2)} />
          <Tab disableRipple label={<strong>ADMINS</strong>} {...a11yProps(3)} />
        </StyledTabs>
      </Box>
      <Box>
        <TabPanel value={value} index={0}>
          REPORTED CONTENT
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MembersPage/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          COMMUNITIES
        </TabPanel>
        <TabPanel value={value} index={3}>
          <AdminsPage/>
        </TabPanel>
      </Box>
    </Box>
  )
}
