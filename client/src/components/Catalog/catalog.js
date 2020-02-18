import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import {
  Grid,
  Container,
  useTheme,
  SwipeableDrawer,
  Button,
  useMediaQuery
} from '@material-ui/core';

import Filter from '../Filter/filter';
import ProductList from '../Product-list/product-list';
import ProductBreadcrumbs from '../Breadcrumbs/breadcrumbs';
import Sorting from '../Sorting/sorting';

import useStyles from './_catalog';
import { productsLoaded, moreProductsLoaded } from '../../redux/actions/products';
import { getCategory } from '../../services/getCategories';
import { catalogLocation } from '../../redux/actions/categories';
import {
  getFilteredProducts,
  getInfinityFilteredProducts,
  parseToFilterValue
} from '../../services/filter';
import ProductCardCarousel from '../Product-card-carousel/product-card-carousel';
import { resetFilters } from '../../redux/actions/filter';

import getSearchedProducts from '../../services/search';

const Catalog = (props) => {
  const classes = useStyles();
  const {
    assortment,
    catalog,
    filter,
    productsLoaded,
    moreProductsLoaded,
    products,
    searchedValue
  } = props;
  const { filterResults, filterPages, sort } = filter;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const [topList, setTopList] = useState([]);
  const [productsToShow, setProductsToShow] = useState([]);
  const [filterIsOpenMobile, setFilterIsOpenMobile] = useState(false);
  const { allCategories } = catalog;

  const handleProductsRequest = async () => {
    let searchedResult = [];
    if (assortment === 'search' && searchedValue) {
      await getSearchedProducts(searchedValue)
        .then((products) => {
          if (!products.length) {
            productsLoaded({ products: [], productsQuantity: 0 });
          }
          searchedResult = products.map((product) => product.itemNo);
        })
      if (!searchedResult.length) return;
    }
    const valToFilter = parseToFilterValue(
      searchedResult,
      filterResults,
      sort,
      filterPages,
      allCategories,
      assortment
    );
    getInfinityFilteredProducts(valToFilter)
      .then((newPoducts) => {
        if (filterPages.startPage > 1) {
          moreProductsLoaded(newPoducts);
        } else {
          productsLoaded(newPoducts);
        }
      });
  };

  useEffect(() => {
    const request = assortment === 'search' ? 'cooking' : assortment;
    getCategory(request)
      .then((response) => setTopList(response.topSellers));
    handleProductsRequest();
  }, [assortment, sort, filterResults, filterPages, searchedValue]);

  const cardsToShowString = topList.toString();

  useEffect(() => {
    getFilteredProducts(`itemNo=${cardsToShowString}`)
      .then((response) => {
        setProductsToShow(response)
      })
  }, [cardsToShowString, topList]);

  const toggleFilterMobile = (open) => {
    setFilterIsOpenMobile(open);
  };

  const filterRender = (desktop) => {
    if (desktop) {
      return (
        <div className={classes.filterDesktop}>
          <Filter />
        </div>
      )
    }

    return (
      <div className={classes.filterMobile}>
        <Button
          onClick={() => toggleFilterMobile(true)}
          className={classes.button}
        >
          Open Filter
        </Button>

        <SwipeableDrawer
          onOpen={() => toggleFilterMobile(true)}
          anchor="bottom"
          open={Boolean(filterIsOpenMobile)}
          onClose={() => toggleFilterMobile(false)}
        >
          <Filter toggleFilter={toggleFilterMobile} />
        </SwipeableDrawer>
      </div>
    )
  };
  return (
    <>
      <Container maxWidth="xl">
        <ProductBreadcrumbs assortment={assortment} />
        <Grid container spacing={2} className={classes.root}>
          <Grid item sm={12} md={4}>
            {filterRender(isDesktop)}
          </Grid>
          <Grid item xs={12} md={8}>
            <Sorting sort={sort} />
            <ProductList productsResult={products} />
          </Grid>
          <Grid item xs={12}>
            <ProductCardCarousel
              products={productsToShow}
              label="most popular products"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  )
};

const mapStateToProps = (state) => ({
  catalog: state.categoriesReducer.catalog,
  filter: state.filterReducer,
  products: state.productsReducer.products,
  searchedValue: state.searchReducer.searchedValue
});

const mapDispatchToProps = (dispatch) => ({
  resetFilters: () => dispatch(resetFilters()),
  setCatalogLocation: (assortment) => dispatch(catalogLocation(assortment)),
  productsLoaded: (products) => dispatch(productsLoaded(products)),
  moreProductsLoaded: (products) => dispatch(moreProductsLoaded(products)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalog)

Catalog.propTypes = {
  assortment: PropTypes.string.isRequired,
  searchedValue: PropTypes.string,
  catalog: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.symbol,
    PropTypes.array,
    PropTypes.number,
    PropTypes.object
  ])).isRequired,
  filter: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string
  ])).isRequired,
  products: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number,
  ])).isRequired,
  productsLoaded: PropTypes.func.isRequired,
  moreProductsLoaded: PropTypes.func.isRequired,
};

Catalog.defaultProps = {
  searchedValue: ''
}
