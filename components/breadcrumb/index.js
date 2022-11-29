import React from 'react'
import { HomeOutlined } from '@ant-design/icons'
import Link from 'next/link'
import styles from './breadcrumb.module.scss'

export default function BreadcrumbComponent({width='80%',placement,style,data}){
    return (
        <div className={styles['wrapper_breadCrumb']}>
            <ul className={`${styles['breadcrumb_body']} ${placement && styles[placement]}`} style={{width,...style}}>
                <Link href='/'><li className={styles['breadcrumb_body-link']}><HomeOutlined /></li></Link>
                {data && data.map(({href,title},index) => {
                    if(index === data.length - 1 || !href){
                        return (
                            (
                                <React.Fragment key={index}>
                                    <li className={styles['breadcrumb_body-link']}>{title}</li>
                                </React.Fragment>
                            )
                        )
                    }else{
                        return (
                            <React.Fragment key={index}>
                                <Link href={href}><li className={styles['breadcrumb_body-link']}>{title}</li></Link>
                            </React.Fragment>
                        )
                    }
                })}
            </ul>
        </div>
    )
}