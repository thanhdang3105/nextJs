import { forwardRef, useImperativeHandle, useRef } from "react";
import styles from './popover.module.scss'

function MenuPopover({children,style},ref) {


    const element = useRef()

    useImperativeHandle(ref, () => ({
        button: element.current.previousElementSibling,
        toggle: () => {
            element.current.classList.toggle(styles['show'])
        },
        add: () => {
            element.current.classList.add(styles['show'])
        },
        remove: () => {
            element.current.classList.remove(styles['show'])
        },
        checkChildren: (children) => element.current.parentElement.contains(children)
    }))

    return (
        <ul ref={element} className={styles['wrapper_menu']} style={style}>
            {children}
        </ul>
    )
}

export default forwardRef(MenuPopover)