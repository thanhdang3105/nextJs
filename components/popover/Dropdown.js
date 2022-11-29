import { CaretDownFilled } from "@ant-design/icons";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import styles from './popover.module.scss'

function DropDownMenu({data,placement,style,open,collapse}) {
    const [openDropdownChildren,setOpenDropdownChildren] = useState()

    const dropdownRef = useRef()

    useEffect(() => {
        if(open){
            dropdownRef.current.classList.add(styles['show'])
        }else{
            dropdownRef.current.classList.remove(styles['show'])
            setOpenDropdownChildren(undefined)
        }
    },[open])

    return (
        <ul ref={dropdownRef} className={`${styles['wrapper_dropdown']} ${styles[`${placement}`]} ${collapse && styles['collapse']}`} style={style}>
            {data && data.map(({title,href,children},index) => (
                <li key={index} className={styles['dropdown_item']}>
                    <Link href={href}>{title}</Link>
                    {children && <>
                        <CaretDownFilled onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdownChildren((prev) => {
                                if(prev !== undefined && prev === index){
                                    return undefined
                                }else{
                                    return index
                                }
                            })}
                        }/>
                        <DropDownMenu collapse={collapse} open={openDropdownChildren === index} placement='right' data={children}/>
                    </>}
                </li>
            ))}
        </ul>
    )
}

export default DropDownMenu