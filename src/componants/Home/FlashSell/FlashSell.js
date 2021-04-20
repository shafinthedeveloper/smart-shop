import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import ProductCard from '../ProductCard/ProductCard';

const FlashSell = () => {

    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;

    const [flashSellsProducts, setFlashSellProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/flashSell')
            .then(function (response) {
                const data = response.data;
                setFlashSellProducts(data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }, [flashSellsProducts])

    const windowsWidth = window.screen.width;
    return (
        <div style={{marginTop: "30px"}} className='container-fluid row'>
            <h1 style={{marginBottom: "30px"}}>Flash Sell</h1>
            <div style={{ padding: `0 ${ chevronWidth }px` }}>
                <ItemsCarousel
                    requestToChangeActive={setActiveItemIndex}
                    activeItemIndex={activeItemIndex}
                    numberOfCards={windowsWidth > 1088 ? 5 : (windowsWidth > 690 ? 3 : (windowsWidth > 300 ? 1 : 1))}
                    infiniteLoop={true}
                    gutter={20}
                    leftChevron={<button className="btn btn-success">{'<'}</button>}
                    rightChevron={<button className="btn btn-success">{'>'}</button>}
                    outsideChevron={true}
                    chevronWidth={chevronWidth}
                >

                    {
                        flashSellsProducts.map(product => <ProductCard product={product}></ProductCard>)
                    }
                </ItemsCarousel>
            </div>
        </div >
    );
};

export default FlashSell;