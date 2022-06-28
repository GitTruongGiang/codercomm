import { Tab, Tabs, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { capitalCase } from "change-case";
import React, { useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShareIcon from "@mui/icons-material/Share";
import AccountGeneral from "../feature/user/AccountGeneral";
import AccountSocial from "../feature/user/AccountSocial";

function AccountPage() {
  const [currentTabs, setCurrentTabs] = useState("general");
  const ACCOUNT_TABS = [
    {
      value: "general",
      icon: <AccountBoxIcon sx={{ fontSize: 30 }} />,
      component: <AccountGeneral />,
    },
    {
      value: "social_links",
      icon: <ShareIcon sx={{ fontSize: 30 }} />,
      component: <AccountSocial />,
    },
  ];

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Account Settings
      </Typography>
      <Tabs
        value={currentTabs}
        variant="scrollable"
        onChange={(e, value) => setCurrentTabs(value)}
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        {ACCOUNT_TABS.map((tab) => {
          return (
            <Tab
              key={tab.value}
              value={tab.value}
              icon={tab.icon}
              label={capitalCase(tab.value)}
              disableRipple
            />
          );
        })}
      </Tabs>
      <Box sx={{ mb: 5 }}></Box>
      {ACCOUNT_TABS.map((tab) => {
        const isMatched = tab.value === currentTabs;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Container>
  );
}

export default AccountPage;
