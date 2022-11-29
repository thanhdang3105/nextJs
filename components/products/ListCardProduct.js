import React from "react";
import styles from './card.module.scss'
import Link from 'next/link'
import Badge from "../badge";

export default function ListCardProduct({width='80%',data,title='Danh sách sản phẩm',more,max}) {
    const idProduct = React.useId()

    const handlePreviewImg = (e,id) => {
        document.getElementById(id).src = e.currentTarget.src
    }

    return (
        <div className={styles['wrapper']} style={{width}}>
            {title && <h1 className={styles['wrapper_title']}>{title}</h1>}
            <ul className={styles['wrapper_body']}>
                {data && data.map(({id,name,price,href,listImg,badge,sale},index) => {
                    if(max && index >= max) return
                    let priceSale
                    if(sale) priceSale = Number(price) * (100 - Number(sale)) / 100
                    return (
                        <li key={idProduct+'-'+id} className={styles['card_product']}>
                            <div className={styles['card_product-img']}>
                                <Badge content={badge || (sale && `-${sale}%`) || undefined} >
                                    <Link href={href}><img src={listImg[0]} id={idProduct+'-'+id} alt={name}/></Link>
                                </Badge>
                            </div>
                            <div className={styles['card_product-body']}>
                                <div className={styles['product_info']}>
                                    <h4 className={styles['product_info-name']}>{name}</h4>
                                    <span className={styles['product_info-span']}>{sale ? (
                                        <>
                                        <span>{price.toLocaleString('en-gb')}đ</span>
                                        <span>{priceSale.toLocaleString('en-gb')}đ</span>
                                        </>
                                    ) : `${price.toLocaleString('en-gb')}đ`}</span>
                                </div>
                                <ul className={styles['product_listImg-preview']}>
                                {listImg && listImg.map((src,index) => {
                                    if(index < 4){
                                        return (
                                            <li key={index} className={styles['listImg_preview-item']}>
                                                <img src={src} alt={`preview-${index}`} onMouseEnter={(e) => handlePreviewImg(e,idProduct+'-'+id)} />
                                            </li>
                                        )
                                    }
                                })}
                                </ul>
                            </div>
                        </li>
                    )
                })}
            </ul>
            {more && (
                <div className={styles['more_link']}>
                    <Link href={more.href}><span>{more.text} {more.icon}</span></Link>
                </div>
            )}
        </div>
    )
}