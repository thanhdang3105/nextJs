import React from "react";
import styles from './badge.module.scss'

export default React.forwardRef(function Badge({children,content,style},ref){

    return (
        <div ref={ref} className={styles['wrapper']}>
            {children}
            {content && <span className={styles['badge']} style={style}>{content}</span>}
        </div>
    )
})