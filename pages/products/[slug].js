import React from 'react'
import styles from './products.module.scss'
import BannerSlider from '../../components/slider/BannerSlider'
import DefaultLayout from '../../layouts'
import BreadcrumbComponent from '../../components/breadcrumb'
import RateComment from '../../components/rateComment'


const Products = [
    {
        id: 'Product-1',
        name: 'Product 1 Thanh ls 11235 56324 Xin chào 123 alo 1235 ád xzcs',
        price: 5000000,
        listImg:[
        '/images/product_1.jpg',
        '/images/logo.png',
        '/images/logo.png',
        '/images/logo.png',
        '/images/logo.png'
      ],
      slug: 'product-1'
    },
    {
        id: 'Product-2',
        name: 'Product 2',
        price: 5000000,
        color: [
            'Đen',
            'Xanh'
        ],
        size:[
            'xs','s','m','l','xl'
        ],
        listImg:[
        '/images/product_2.jpg',
        '/images/logo.png',
        '/images/logo.png',
        '/images/logo.png',
        '/images/logo.png'
      ],
      slug: 'product-2',
      description: 'Sản phẩm đẹp',
      sale: 20
    },
    {
        id: 'Product-3',
        name: 'Product 3',
        price: 5000000,
        listImg:[
        '/images/product_3.jpg',
        '/images/logo.png',
        '/images/logo.png',
        '/images/logo.png',
        '/images/logo.png'
      ],
      slug: 'product-3'
    }
]

export async function getStaticPaths(){
    const paths = Products.map(products => ({
        params: {
            slug: products.slug
        }
    }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const productInfo = Products.find(product => product.slug === params.slug)
    return {
        props: {
            data: productInfo
        }
    }
}

export default function ProductInfo({data}) {

    const handleSelectOption = (e) => {
        const parent = e.currentTarget.parentElement
        if(parent){
            parent.querySelector('.'+styles['active'])?.classList.remove(styles['active'])
            e.currentTarget.classList.add(styles['active'])
        }
    }

    const handleAddCart = () => {
        const optionSelected = Array.from(document.querySelectorAll('.'+styles['active']))
        if(optionSelected.length){
            if(optionSelected.length === 1){
                if(optionSelected[0].classList.contains('size')){
                    alert('Vui lòng chọn màu!')
                }else{
                    alert('Vui lòng chọn size!')
                }
            }else{
                alert('Đã thêm vào giỏ hàng')
                optionSelected.forEach(option => {
                    option.classList.remove(styles['active'])
                })
            }
        }else{
            alert('Please select an option')
        }
    }

    React.useEffect(() => {
        const boxDesc = document.querySelector('.'+styles['info_description-text'])
        if(boxDesc.scrollHeight < 250){
            boxDesc.nextElementSibling.style.display = 'none'
        }
    },[])

    return (
        <DefaultLayout title={data.name}>
            <div className={styles['wrapper_products']}>
                <BreadcrumbComponent style={{margin: '0 auto'}} data={[{href:'/products',title:'Sản phẩm'},{href:'/products?category=ao',title:'Áo'}]} />
                <div className={styles['product_view']}>
                    <div className={styles['product_view-img']}>
                        <BannerSlider data={data.listImg.map((img,index) => ({
                            src: img,
                            alt: data.id + '-'+'img-'+index
                        }))} style={{width: '100%', marginTop: '0'}} border={{border: 'none',borderRadius: 'unset'}} thumbPlacement='left' navigation />
                    </div>
                    <div className={styles['product_view-info']}>
                        <h1 className={styles['info_name']}>{data.name}</h1>
                        <span className={styles['info_label']}>Mã sản phẩm : {data.id}</span>
                        <p className={styles['info_price']}>Giá : {
                            data.sale ? <><span>{data.price.toLocaleString('en-gb')}</span>
                            <strong>{(Number(data.price) * (100 - Number(data.sale)) / 100).toLocaleString('en-gb')}đ</strong></> 
                            : data.price.toLocaleString('en-gb')+'đ'}
                        </p>
                        <ul className={styles['info_listOption']}>
                            <span className={styles['info_listOption-title']}>Màu:</span>
                            {data?.color?.map((color,index) => (
                                <li key={index} className={`color ${styles['info_listOption-item']}`} onClick={handleSelectOption}><button className={`btn`}>{color}</button></li>
                            ))}
                        </ul>
                        <ul className={styles['info_listOption']}>
                            <span className={styles['info_listOption-title']}>Size:</span>
                            {data?.size?.map((size,index) => (
                                <li key={index} className={`size ${styles['info_listOption-item']}`} onClick={handleSelectOption}><button className={`btn`} style={{textTransform: 'uppercase'}}>{size}</button></li>
                            ))}
                        </ul>
                        <button className={`btn ${styles['info_addCart']}`} onClick={handleAddCart}>Thêm vào giỏ hàng</button>
                        <div className={styles['info_description']}>
                            <h4 className={styles['info_description-title']}>Mô tả sản phẩm</h4>
                            <p className={styles['info_description-text']}>{data?.description}</p>
                            <span className={styles['info_description-more']} onClick={(e) => {
                                if(e.currentTarget.previousElementSibling.style.maxHeight === 'unset'){
                                    e.currentTarget.previousElementSibling.style.maxHeight = '250px';
                                    e.target.innerText = 'Xem thêm ▼'
                                }else{
                                    e.currentTarget.previousElementSibling.style.maxHeight = 'unset';
                                    e.target.innerText = 'Ẩn bớt ▲'
                                }
                            }}>Xem thêm ▼</span>
                        </div>
                    </div>
                </div>
            </div>
            <RateComment />
        </DefaultLayout>
    )
}