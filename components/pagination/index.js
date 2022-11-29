import styles from './pagination.module.scss'
import React from 'react'

export default function PaginationComponent({width='80%',placement,style,count=8,pageChange=()=>{}}){
    const [active,setActive] = React.useState(1)
    const [listItem,setListItem] = React.useState([1])

    React.useEffect(() => {
        pageChange(active)
        if(count <= 5) return setListItem(() =>{
            const arr = []
            let i = 1
            while(i <= count){
                arr.push(i)
                i++
            }
            return arr
        })
        setListItem(() => {
            const arr = []
            if(active <= 4){
                if(active === 1){
                    arr.push(1,2,3)
                }else{
                    let i = active
                    while(i >= 1){
                        if(i > 0){
                            arr.unshift(i)
                        }
                        i--
                    }
                }
            }else{
                arr.push(1,'...',active - 1)
            }
            if(active >= count - 3){
                if(active === count){
                    return [1,'...',active -2,active - 1,active]
                }else{
                    let i = active
                    while(i <= count){
                        if(!arr.includes(i)){
                            arr.push(i)
                        }
                        i++
                    }
                }
            }else{
                let i = active - 1
                while(i <= active + 1){
                    if(!arr.includes(i) && i > 0){
                        arr.push(i)
                    }
                    i++
                }
                arr.push('...',count)
            }
            return arr
        })
    },[active])

    return (
        <div className={styles['wrapper_pagination']}>
            <ul className={`${styles['pagination']} ${placement && styles[placement]}`} style={{width,...style}}>
                {count > 1 && listItem.map((item,index) => (<li key={index} 
                className={`${styles['pagination_item']} ${active === item ? styles['active'] : ''} ${item === '...' ? styles['disabled']: ''}`}
                {...item !== '...' && {onClick: () => setActive(item)}}
                >{item}</li>))}
            </ul>
        </div>
    )
}