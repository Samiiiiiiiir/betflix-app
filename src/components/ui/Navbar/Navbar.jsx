import MenuIcon from '@mui/icons-material/Menu';
import MovieIcon from '@mui/icons-material/Movie';
import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router';

import { iconComponents, MOVIE_LISTS, TOP_LISTS } from '../../../constanst';

const Icon = ({ iconName }) => {
  const IconComponent = iconComponents[iconName];
  return <IconComponent />;
};

export const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen((prevState) => !prevState);
  };
  const trigger = useScrollTrigger({
    target: window,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar>
        <Container maxWidth="lg">
          <Toolbar>
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Typography
              component={RouterLink}
              to="/"
              variant="h5"
              style={{ color: '#fff', textDecoration: 'none' }}
            >
              betflix
            </Typography>
            <Drawer open={isOpen} onClose={handleDrawerToggle}>
              <Box sx={{ width: 280 }} onClick={handleDrawerToggle}>
                <List>
                  {TOP_LISTS.map(({ title, url, icon }) => (
                    <Link key={title} component={RouterLink} to={url}>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <Icon iconName={icon} />
                          </ListItemIcon>
                          <ListItemText primary={title} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  ))}
                </List>
                <Divider />
                <List>
                  {MOVIE_LISTS.map(({ title, url, icon }) => (
                    <Link key={title} component={RouterLink} to={url}>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <Icon iconName={icon} />
                          </ListItemIcon>
                          <ListItemText primary={title} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Box>
            </Drawer>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
};
