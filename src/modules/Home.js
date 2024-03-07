import { Grid } from '@mui/material';
import React from 'react';
import ProductHero from '../components/Home/ProductHero';
import ProductValues from '../components/Home/ProductValues';
import ProductCategories from '../components/Home/ProductCategories';


const Home = () => {
    return (
        <React.Fragment>
           <ProductHero />
           <ProductValues/>
           <ProductCategories/>
        </React.Fragment>
    );
};

export default Home;