import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Box, Typography } from '@material-ui/core';
import './carousel-react.scss';
import StopIcon from '@material-ui/icons/Stop';

import ReactImageZoom from 'react-image-zoom';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { createStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ProductDetailCollapse from './Product-detail-collapse/product-detail-collapse';
import useStyles from './_product-detail';
import AddToBasket from '../Add-to-basket/add-to-basket';
import MyGallery from './carousel-react'
import FeatureItem from './feature-item';
import ProductDetailTab from './Product-detail-tab/product-detail-tab';

export default function ProductDetail({ product }) {
  const { imageUrls, name, currentPrice, previousPrice, myCustomParams, brand } = product;
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.up('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  console.log('Mobile', isMobile);
  console.log('Tablet', isTablet);
  console.log('Desctop', isDesktop);
  const [modalIsVisible, setModalVisibility] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const handleChange = (event) => {
    setQuantity(event.target.value);
  };
  const closeModal = () => {
    setModalVisibility(false)
  };

  //   const zoom = { width: 400, zoomWidth: 400, offset: { vertical: 0, "horizontal": -100, zoomStyle: {} }};
  //
  //   const zoomImage = imageUrls.map((url) => (
  //
  //   <ReactImageZoom {img: url, ...zoom} />
  // ));

  const images = imageUrls.map((url) => (
    {
      original: url,
      thumbnail: url
    }
  ));

  const BootstrapInput = withStyles((theme) => createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }),)(InputBase);

  return (
    <Container maxWidth="xl">
      <AddToBasket
        open={modalIsVisible}
        onModalClose={closeModal}
        product={{ imageUrls, name, currentPrice }}
      />
      <h1 className={classes.title}>{name.toUpperCase()[0] + name.slice(1)}</h1>
      <Grid container spacing={4} justify="center">
        <Grid item xs={12} sm={12} md={7} xl={6}>
          <MyGallery
            images={images}
          />
          {!isTablet && <Divider />}
        </Grid>
        <Grid item xs={12} sm={12} md={5} xl={6}>
          <Grid container spacing={1}>
            {/* <Grid item xs={12} sm={12} md={12}> */}
            {/*  <Typography align="right"> */}
            {/*    <a href="#">Submit a review</a> */}
            {/*  </Typography> */}
            {/* </Grid> */}
            <Grid item xs={12} sm={6} md={12} xl={6}>
              <Box
                border={1}
                borderColor="text.primary"
                className={classes.productFeatures}
              >
                <ul className={classes.MuiListRoot}>
                  <li>
                    {brand}
                  </li>
                  <li>
                    Collection:
                    {' '}
                    {myCustomParams.collection}
                  </li>
                  <li>
                    {myCustomParams.setSize > 1 ? `${myCustomParams.setSize}-pcs.` : `${myCustomParams.setSize}-pc.`}
                  </li>
                </ul>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={12} xl={6}>
              <Box
                className={classes.productShopArea}
              >
                <Container>
                  <div className={classes.priceBox}>
                    {previousPrice && (
                      <span className={classes.oldPrice}>
                        &#8364;
                        {previousPrice}
                      </span>
                    )}
                    <span
                      className={previousPrice ? classes.specialPrice : classes.regularPrice}
                    >
                      &#8364;
                      {currentPrice}
                    </span>
                  </div>
                  <FormControl className={classes.margin}>
                    <InputLabel htmlFor="quantity">Quantity</InputLabel>
                    <NativeSelect
                      id="quantity"
                      value={quantity}
                      onChange={handleChange}
                      input={<BootstrapInput />}

                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                    </NativeSelect>
                  </FormControl>
                  <div className={classes.disableBlock}>
                    <span>Disable:</span>
                    <span>
                      <StopIcon />
                      In stock
                    </span>
                  </div>

                  <div className={classes.addToCart}>
                    <Button
                      size="large"
                      fullWidth
                      variant="contained"
                      color="primary"
                      disableElevation
                      onClick={() => {
                        setModalVisibility(true)
                      }}
                    >
                      <ShoppingCartOutlinedIcon />
                    </Button>
                  </div>
                </Container>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={12} xl={12}>
              <List>
                <FeatureItem label="Free delivery over 49€" />
                <FeatureItem label="Free returns" />
                <FeatureItem label="Secure payment" />
                <FeatureItem label="Certified online shop" />
              </List>
            </Grid>
          </Grid>
          {!isTablet && <Divider />}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} >
          <h3 className={classes.sectionTitle}>Product details</h3>
          {isDesktop && <ProductDetailTab data={product} />}
          {!isDesktop && <ProductDetailCollapse data={product} />}
        </Grid>

      </Grid>
    </Container>
  );
}

ProductDetail.propTypes = {
  product:
  PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string,
      PropTypes.boolean])
  )
    .isRequired,
};
