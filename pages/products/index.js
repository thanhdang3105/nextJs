import { useRouter } from 'next/router'
import React from 'react'
import BreadcrumbComponent from '../../components/breadcrumb'
import PaginationComponent from '../../components/pagination'
import ListCardProduct from '../../components/products/ListCardProduct'
import DefaultLayout from '../../layouts'
import styles from './products.module.scss'

const Products = [
    {
      id: 'Product-1',
      name: 'Product 1 Thanh ls 11235 56324 Xin chào 123 alo 1235 ád xzcs',
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
      href: '/products/product-2',
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
      href: '/products/product-3',
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
      sale: 20
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
      sale: 20
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
      sale: 20
    },
  ]

export default function ProductsPage() {
  const router = useRouter()

  React.useEffect(() => {console.log(router)},[router])

  const handleSelectFilter = (e) => {
    console.log(e.target.value)
  }

    return (
        <DefaultLayout title="Sản phẩm">
            {/*props: {width,placement: 'left,center,right',style,data} */}
          <div className={styles['heading_pageProduct']} style={{width: '80%',}}>
              <BreadcrumbComponent width='fit-content' data={[{href:'/products',title:'Sản phẩm'},{href:'/products/top',title:'Áo'}]} />
                <select className={styles['filter_select']} onChange={handleSelectFilter}>
                    <option value='new'>Mới nhất</option>
                    <option value='hot'>Mua nhiều nhất</option>
                    <option value='desc'>{`Giá: Cao -> Thấp`}</option>
                    <option value='asc'>{`Giá: Thấp -> Cao`}</option>
                </select>
            </div>
            <ListCardProduct width='80%' title={null} data={Products} badge='new' />
            <PaginationComponent /> {/* props: {width='80%',placement,style,count=8,pageChange=(page)=>{}} */}
        </DefaultLayout>
    )
}