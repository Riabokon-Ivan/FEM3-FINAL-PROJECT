import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu, MenuItem, Button, Box } from '@material-ui/core';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import RoutesName from '../../../routes-list';

import useStyles from '../_header-navbar';
import TemporaryDrawer from '../../drawer';
import CollapsingItem from '../../Product-detail/Product-detail-collapse/collapsing-item';

export default function NavBar({ toggleCatalog, hideCatalog, children }) {
  const classes = useStyles();
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = (open) => {
    setDrawer(open)
  }
  return (
    <>
      <Button onClick={() => toggleDrawer(true)}>Open</Button>
      <Drawer
        open={drawer}
        onClose={() => toggleDrawer(false)}
      >
        {/* <Box className={classes.headerMenuList}> */}
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          className={classes.root}
        >
          <CollapsingItem border={1} label="CATALOG" >
            <CollapsingItem label="COOCKING">
              <CollapsingItem label="POTS" />
              <CollapsingItem label="FRYING" />
            </CollapsingItem>
            <CollapsingItem label="DINING" />
            <CollapsingItem label="DRINKING" />
            <CollapsingItem label="PREPARING" />
          </CollapsingItem>

          <ListItem
            className={`js_header-menu-list-item ${classes.headerMenuListItem}`}
            onMouseLeave={hideCatalog}
            onClick={toggleCatalog}
          >
        CATALOG
          </ListItem>
          <ListItem>
            <Link to={RoutesName.aboutUs} className={classes.headerMenuListHyperlink}>
          ABOUT US
            </Link>
          </ListItem>
          <ListItem>
            <Link to={RoutesName.delivery} className={classes.headerMenuListHyperlink}>
          DELIVERY & PAYMENT TERMS
            </Link>
          </ListItem>
          <ListItem>
            <Link to={RoutesName.contacts} className={classes.headerMenuListHyperlink}>
          CONTACTS
            </Link>
          </ListItem>
          {children}
        </List>
      </Drawer>
    </>
  )
}

NavBar.propTypes = {
  toggleCatalog: PropTypes.func.isRequired,
  hideCatalog: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};