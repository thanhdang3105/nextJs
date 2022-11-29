import { CloseOutlined } from '@ant-design/icons'
import React from 'react'
import styles from './ModalDefault.module.scss'

function ModalDefault({title,children,footer,open=false,onClose,onOk = () => {}, onCancel = () => {},okButtonProps = {},cancelButtonProps = {}}) {
    const modal = React.useRef()

    React.useEffect(() => {
        if(open){
            modal.current.classList.add(styles['show'])
        }else{
            handleCloseModal()
        }
    },[open])

    const handleCloseModal = React.useCallback(() => {
        modal.current.classList.remove(styles['show'])
        onClose()
        document.title = 'My Shop'
    },[])

    return (
        <div ref={modal} className={`${styles['wrapper_modal']}`}>
            <div className={styles['modal_overlay']} onClick={handleCloseModal}></div>
            <div className={styles['modal_content']}>
                <div className={styles['modal_header']}>
                    <h2 className={styles['modal_header-title']}>{title || 'Modal Title'}</h2>
                    <button type="button" className={`iconButton ${styles['modal_close']}`} onClick={handleCloseModal}><CloseOutlined /></button>
                </div>
                <div className={styles['modal_body']}>
                    {children}
                </div>
                {footer ? (
                        <div className={styles['modal_footer']}>
                            {footer}
                        </div>
                    ): footer !== null && (
                        <div className={styles['modal_footer']}>
                            <button className={`btn ${styles['btn_ok']}`} onClick={onOk} {...okButtonProps}>Ok</button>
                            <button className={`btn ${styles['btn_cancel']}`} onClick={onCancel} {...cancelButtonProps}>Cancel</button>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default React.memo(ModalDefault)