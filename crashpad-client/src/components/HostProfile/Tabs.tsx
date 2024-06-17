import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PadTab1 from './PadTab1';
import PadTab2 from './PadTab2';
import PadTab3 from './PadTab3';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number; // Corrected to number type
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', marginTop: '35px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Pad 1" {...a11yProps(0)} />
          <Tab label="Pad 2" {...a11yProps(1)} />
          <Tab label="Pad 3" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <PadTab1 />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <PadTab2 />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <PadTab3 />
      </CustomTabPanel>
    </Box>
  );
}
