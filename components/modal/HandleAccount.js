import React from 'react';
import ModalDefault from './ModalDefault';
import styles from './HandleAccount.module.scss'
import { FacebookFilled, GoogleOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons';

export default function HandleAccount({state:{open,action,back},setState}) {
    const [loading,setLoading] = React.useState(false)

    const listTitle = React.useMemo(() => {
        return {
            login:'Đăng nhập',
            register: 'Đăng ký',
            forgot: 'Quên mật khẩu'
        }
    },[])

    const modalBody = React.useMemo(() => {
        return {
            login: <>
                    <input className={`input`} required title='VD: nva@gmail.com' type="email" name="username" placeholder="Tên đăng nhập" />
                    <input className={`input`} required type="password"  name="password" placeholder="Mật khẩu" />
                    <p className="text_link" onClick={() => {setState(prev => ({...prev,action: 'register',back: 'login'}))}}>Đăng ký</p>
                    <p className="text_link" onClick={() => {setState(prev => ({...prev,action: 'forgot',back: 'login'}))}}>Quên mật khẩu ?</p>
                   </>,
            register: <>
                <input className={`input`} required type="text" name="displayname" placeholder="Họ và tên" />
                <input className={`input`} required title='VD: nva@gmail.com' type="email" name="username" placeholder="Tên đăng nhập" />
                <input className={`input`} required title='Chú ý: Tối thiểu 6 ký tự' type="password" name="password" placeholder="Mật khẩu" />
                <input className={`input`} required type="password" name="check-password" placeholder="Nhập lại mật khẩu" />
                <p className="text_link" onClick={() => {setState(prev => ({...prev,action: 'login',back: false}))}}>Bạn đã có tài khoản ?</p>
            </>,
            forgot: <>
                <input className={`input`} required type="email" name="username" placeholder="Tên đăng nhập" />
            </>
        }
    },[])

    const handleSubmitForm = (e) => {
        e.preventDefault();
    }

    return (
        <ModalDefault open={open} title={back ? (
            <>
            <button type="button" className={`iconButton ${styles['btn_back']}`} onClick={() => {setState(prev => ({...prev,action: back,back: false}))}}><LeftOutlined /></button>
            {listTitle[action]}
            </>
            ) : listTitle[action]} onClose={() => {setState({open: false,action: 'login'})}} 
        footer={action === 'login' ? (
            <>
                <button type="button" className={`btn`} style={{backgroundColor: 'blue',color: 'white'}}><FacebookFilled /> Facebook</button>
                <button type="button" className={`btn`} ><GoogleOutlined /> Google</button>
            </>
        ) : null}>
            <form onSubmit={handleSubmitForm} className={styles['form_wrapper']}>
                {modalBody[action]}
                <button type="submit" className='btn btn_submit'>{loading && <LoadingOutlined style={{color: 'white'}} />}{listTitle[action]}</button>
            </form>
        </ModalDefault>
    )
}