import { CaretDownFilled, CloseOutlined, DeleteFilled, MenuOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import HandleAccount from '../modal/HandleAccount'
import MenuPopover from '../popover/Menu'
import DropDownMenu from '../popover/Dropdown'
import styles from './patials.module.scss'
import Badge from '../badge'

export default function Header({user}) {
    const [loginState,setLoginState] = React.useState({open: false,action: 'login',back: false})
    const [openDropdown,setOpenDropdown] = React.useState(false)
    const [collapseDropdown,setCollapseDropdown] = React.useState(false)
    const dropdownMenu = React.useRef()
    const inputSearch = React.useRef()
    const cartMenu = React.useRef()
    const accountMenu = React.useRef()
    const router = useRouter()

    const handleNavBarSearch = () => {
        if(inputSearch.current && inputSearch.current.classList.contains(styles['show'])){
            if(inputSearch.current.value){
                router.push('/search?q='+inputSearch.current.value)
            }else{
                inputSearch.current.classList.remove(styles['show'])
                inputSearch.current.disabled = true
            }
        }else if(inputSearch.current && !inputSearch.current.classList.contains(styles['show'])) {
            inputSearch.current.classList.add(styles['show'])
            inputSearch.current.disabled = false
            inputSearch.current.focus()
        }
    }

    React.useEffect(() => {
        const menuNav = document.querySelector(`.${styles["header_navbar-menu"]}`)
        if(menuNav.classList.contains(styles['show']))
            menuNav.classList.remove(styles['show'])
    },[router])

    React.useEffect(() => {
        if(window.innerWidth <= 768){
            setCollapseDropdown(true)
        }else{
            setCollapseDropdown(false)
        }
        document.body.onresize = (e) => {
            if(e.currentTarget.innerWidth <= 768){
                setCollapseDropdown(true)
            }else{
                setCollapseDropdown(false)
            }
        }
        document.onclick = (e) => {
            if(accountMenu.current.checkChildren(e.target)) {
                accountMenu.current.toggle()
                cartMenu.current.remove()
                setOpenDropdown(false)
            }else if(cartMenu.current.checkChildren(e.target)) {
                if(cartMenu.current.button.contains(e.target)){
                    cartMenu.current.toggle()
                }
                accountMenu.current.remove()
                setOpenDropdown(false)
            }else if(e.target === dropdownMenu.current || dropdownMenu.current.contains(e.target)) {
                setOpenDropdown(prev => !prev)
                cartMenu.current.remove()
                accountMenu.current.remove()
            }
            else{
                cartMenu.current.remove()
                accountMenu.current.remove()
                setOpenDropdown(false)
            }
        }
        return () => {
            document.onclick = null
            document.body.onresize = null
        }
    },[])

    const handleMenuMobile = () => {
        document.querySelector(`.${styles["header_navbar-menu"]}`).classList.toggle(styles['show'])
    }

    const handleLogOut = () => {

    }

    return (
        <div className={styles["wrapper_header"]}>
            <div className={styles["header_navbar"]}>
                <button type='button' className={`iconButton ${styles['navbar_menu-mobile-open']}`} onClick={handleMenuMobile}><MenuOutlined /></button>
                    <div className={styles["header_navbar-logo"]}>
                <Link href='/'>
                    <div>
                        <Image src='/images/logo.png' width={120} height={80} alt='Logo My Shop'/>
                    </div>
                </Link>
                    </div>
                <ul className={styles["header_navbar-menu"]}>
                        <button type='button' className={`iconButton ${styles['navbar_menu-mobile-close']}`} onClick={handleMenuMobile}><CloseOutlined /></button>
                        <li ref={dropdownMenu} className={styles["header_navbar-menu--item"]} >
                            Sản phẩm
                            <CaretDownFilled style={{fontSize: "1.6rem",lineHeight: "1.6rem"}} />
                            <DropDownMenu collapse={collapseDropdown} open={openDropdown} placement='bottom' data={[
                                {title: 'Tất cả sản phẩm',href: '/products'},
                                {title: 'Nam',href: '/products?sex=nam',children:[
                                    {title: 'Áo',href: '/products?sex=nam&category=ao',children: [{title: 'Áo khoác',href:'/products?sex=nam&category=ao&collection=aokhoac'}]},
                                    {title: 'Quần',href: 'products/nam/quan'},
                                ]},
                                {title: 'Nữ',href: 'products/nu',children:[
                                    {title: 'Áo',href: 'products/nu/ao'},
                                ]},
                            ]} />
                        </li>
                        <Link href='mixMatch'>
                            <li className={styles["header_navbar-menu--item"]}>
                                Bộ sưu tập
                            </li>
                        </Link>
                        <Link href='about'>
                            <li className={styles["header_navbar-menu--item"]}>
                                Giới thiệu
                            </li>
                        </Link>
                </ul>
                <ul className={styles["header_navbar-control"]}>
                    <li className={styles["header_navbar-control--item"]}>
                        <input ref={inputSearch} type="text" onKeyUp={(e) => {
                            (e.code === 'Enter' || e.code === 'NumpadEnter') && e.currentTarget.value && handleNavBarSearch()
                        }} className={`input ${styles["header_search"]}`} disabled placeholder="Search..."/>
                    </li>
                    <li className={styles["header_navbar-control--item"]}>
                        <button type='button' className='iconButton' onClick={handleNavBarSearch}><SearchOutlined /></button>
                    </li>
                    <li className={styles["header_navbar-control--item"]}>
                        <Badge content={2} style={{borderRadius: '99px'}}>
                            <button type='button' className='iconButton'><ShoppingCartOutlined /></button>
                        </Badge>
                         <MenuPopover ref={cartMenu}>
                            <h2 className={styles['cart_heading']}>Giỏ hàng</h2>
                            <ul className={styles['cart_list']}>
                                <li className={styles['cart_list-item']}>
                                    <Link href='/'>
                                        <div className={styles['cart_list-item--img']}>
                                            <img src='/images/logo.png' loading='lazy' />
                                        </div>
                                    </Link>
                                    <div className={styles['cart_list-item--content']}>
                                        <p className={styles['item_name']}>Sản phẩm 1</p>
                                        <span className={styles['item_info']}>màu sắc/size</span>
                                        <span className={styles['item_info']}>số lượng</span>
                                    </div>
                                    <DeleteFilled style={{alignSelf: 'flex-start', cursor: 'pointer'}} />
                                </li>
                            </ul>
                            <div className={styles["cart_action"]}>
                                <button className={`btn ${styles["cart_action-btn"]}`}>Giỏ hàng</button>
                                <button className={`btn ${styles["cart_action-btn"]}`}>Thanh toán</button>
                            </div>
                         </MenuPopover>
                    </li>
                    <li className={styles["header_navbar-control--item"]} >
                        {user ? <div className="avatar-user">T</div> 
                            :
                            <button type='button' className='iconButton'><UserOutlined /></button>
                        }
                        <MenuPopover ref={accountMenu}style={user ? {marginTop: '12px'} : {fontWeight: 'bold'}}>
                            {user ? <>
                                        <Link href='/tai-khoan'>
                                            <li className={styles["account_control-menu--item"]}>
                                                Thông tin tài khoản
                                            </li>
                                        </Link>
                                        <Link href='/tro-giup'>
                                            <li className={styles["account_control-menu--item"]}>
                                                Trợ giúp
                                            </li>
                                        </Link>
                                        <li className={styles["account_control-menu--item"]} onClick={handleLogOut} style={{fontWeight: 'bold', color: 'red'}}>
                                            Đăng xuất
                                        </li>
                                    </>
                                :
                                <>
                                        <li className={styles["account_control-menu--item"]} onClick={() => {
                                            document.title = 'Đăng nhập'
                                            setLoginState({open: true,action: 'login',back: false})
                                        }}>
                                            Đăng nhập
                                        </li>
                                        <li className={styles["account_control-menu--item"]}  onClick={() => {
                                            document.title = 'Đăng ký'
                                            setLoginState({open: true,action: 'register',back: false})
                                        }}>
                                            Đăng ký
                                        </li>
                                </>
                            }
                        </MenuPopover>
                    </li>
                </ul>
            </div>
            <HandleAccount state={loginState} setState={setLoginState} />
        </div>
    )
}