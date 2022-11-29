import { CaretDownFilled } from '@ant-design/icons';
import React from 'react'
import ListCardProduct from '../components/products/ListCardProduct';
import BannerSlider from "../components/slider/BannerSlider";
import DefaultLayout from "../layouts";

const listBanners = [//đây là giữ liệu giả, dữ liệu thật sẽ được call từ api lên
  {
      href: '/banner1',
      src: '/images/banner_1.jpg',
      alt: 'Banner 1'
  },
  {
      href: '/banner2',
      src: '/images/banner_2.jpg',
      alt: 'Banner 2'
  },
  {
      href: '/banner3',
      src: '/images/banner_3.jpg',
      alt: 'Banner 3'
  },
  {
      href: '/banner4',
      src: '/images/banner_4.jpg',
      alt: 'Banner 4'
  },
  {
      href: '/banner5',
      src: '/images/banner_5.jpg',
      alt: 'Banner 5'
  }
]

const Products = [
  {
    id: 'Product-1',
    name: 'Product 1',
    price: 5000000,
    href: '/products/product-1',
    listImg:[
      'images/product_1.jpg',
      'images/logo.png',
      'images/logo.png',
      'images/logo.png',
      'images/logo.png'
    ],
    badge: 'new'
  },
  {
    id: 'Product-2',
    name: 'Product 1',
    price: 5000000,
    href: '/products/product-1',
    listImg:[
      'images/product_2.jpg',
      'images/logo.png',
      'images/logo.png',
      'images/logo.png',
      'images/logo.png'
    ],
    badge: 'new'
  },
  {
    id: 'Product-3',
    name: 'Product 1',
    price: 5000000,
    href: '/products/product-1',
    listImg:[
      'images/product_3.jpg',
      'images/logo.png',
      'images/logo.png',
      'images/logo.png',
      'images/logo.png'
    ]
  },
  {
    id: 'Product-4',
    name: 'Product 1',
    price: 5000000,
    href: '/products/product-1',
    listImg:[
      'images/product_4.jpg',
      'images/logo.png',
      'images/logo.png',
      'images/logo.png',
      'images/logo.png'
    ]
  },
  {
    id: 'Product-5',
    name: 'Product 1',
    price: 5000000,
    href: '/products/product-1',
    listImg:[
      'images/product_5.jpg',
      'images/logo.png',
      'images/logo.png',
      'images/logo.png',
      'images/logo.png'
    ]
  },
  {
    id: 'Product-6',
    name: 'Product 1',
    price: 5000000,
    href: '/products/product-1',
    listImg:[
      'images/product_6.jpg',
      'images/logo.png',
      'images/logo.png',
      'images/logo.png',
      'images/logo.png'
    ],
    sale: 25
  },
]

export default function Home() {

  return (
    <DefaultLayout title="My Shop">
      <BannerSlider data={listBanners} autoPlay slidePerView={1} pagination navigation />
      {/* Props: data,autoPlay = false,slidePerView,spaceBetween=0,thumbPlacement='top || bottom || left || right',pagination,navigation,slideToThumb=(x) =>{},direction,width='80%',height='80vh',border */}
      <ListCardProduct width='80%' title='Sản phẩm mới' data={Products} max={8} more={{href:'/products',text: 'Xem thêm',icon: <CaretDownFilled/>}} />
      <BannerSlider data={[{
      href: '/banner6',
      src: '/images/banner_6.jpg',
      alt: 'Banner 6'
  }]} width={'100%'} height='unset' border={{border: 'unset', borderRadius: 'unset'}} />
    <ListCardProduct width='80%' title='Sản phẩm khuyến mãi' data={Products} more={{href:'/sale',text: 'Xem thêm',icon: <CaretDownFilled/>}} />
    </DefaultLayout>
  )
}
