import styles from './bannerSlider.module.scss'
import React from 'react'
import { DownOutlined, LeftOutlined, RightOutlined, UpOutlined } from '@ant-design/icons'
import Link from 'next/link'

function BannerSlider({data,autoPlay = false,slidePerView=1,spaceBetween=0,thumbPlacement,pagination,navigation,slideToThumb=(x)=>{},direction,style,width,height,border={}}) {
    const [scrollToX,setScrollToX] = React.useState(0)

    const sliderRef = React.useRef()
    const thumbRef = React.useRef()
    const autoPlayRef = React.useRef()
    const idNext = React.useId()
    const idPrev = React.useId()

    React.useEffect(() => {
        handleSliderHover(false)
        return () => {
            handleSliderHover(true)
        }
    },[])

    React.useEffect(() => {
        slideToThumb(scrollToX)
        const maxScroll = sliderRef.current?.childNodes.length - slidePerView
        const btnPrev = document.getElementById(idPrev)
        const btnNext = document.getElementById(idNext)
        const btnThumbPrev = document.getElementById('thumb-'+idPrev)
        const btnThumbNext = document.getElementById('thumb-'+idNext)
        const dotActive = document.getElementById('dot-'+(scrollToX - maxScroll > 0 ? maxScroll : scrollToX)+'-'+idNext)
        dotActive?.parentElement.querySelector('.'+styles['active'])?.classList.remove(styles['active'])
        dotActive?.classList.add(styles['active'])
        if(scrollToX <= 0){
            btnPrev?.classList.add(styles['disabled'])
            btnNext?.classList.remove(styles['disabled'])
            btnThumbPrev?.classList.add(styles['disabled'])
            btnThumbNext?.classList.remove(styles['disabled'])
        }else if(scrollToX >= maxScroll){
            btnPrev?.classList.remove(styles['disabled'])
            btnNext?.classList.add(styles['disabled'])
            btnThumbPrev?.classList.remove(styles['disabled'])
            btnThumbNext?.classList.add(styles['disabled'])
        }else{
            btnPrev?.classList.remove(styles['disabled'])
            btnNext?.classList.remove(styles['disabled'])
            btnThumbPrev?.classList.remove(styles['disabled'])
            btnThumbNext?.classList.remove(styles['disabled'])
        }
        if(direction === 'column'){
            sliderRef.current.scrollTo({
                top: (sliderRef.current.clientHeight / slidePerView) * scrollToX + spaceBetween * scrollToX,
                left: 0,
                behavior: 'smooth',
            })
        }else{
            sliderRef.current.scrollTo({
                top: 0,
                left: (sliderRef.current.clientWidth / slidePerView) * scrollToX + spaceBetween * scrollToX,
                behavior: 'smooth',
            })
        }
        if(thumbPlacement) {
            const thumbActive = document.getElementById('thumb-'+scrollToX+'-'+idNext)
            thumbActive?.parentElement?.querySelector('.'+styles['active'])?.classList.remove(styles['active'])
            thumbActive?.classList.add(styles['active'])
            
        }
        if(thumbPlacement === 'left' || thumbPlacement === 'right'){
            thumbRef.current.scrollTo({
                top: (thumbRef.current.clientHeight / 4) * (scrollToX - 1),
                left: 0,
                behavior: 'smooth',
            })
        }else if(thumbPlacement === 'top' || thumbPlacement === 'bottom'){
            thumbRef.current.scrollTo({
                top: 0,
                left: (thumbRef.current.clientWidth / 4) * (scrollToX - 1),
                behavior: 'smooth',
            })
        }
    },[scrollToX, sliderRef.current,idNext,idPrev])

    const handleScrollSlider = (action) => {
        const maxScroll = sliderRef.current?.childNodes.length - slidePerView
        if(scrollToX && action === 'prev'){
            setScrollToX(prev => (prev - 1))
        }else if(scrollToX < maxScroll && action === 'next'){
            setScrollToX(prev => (prev + 1))
        }
    }

    const  handleSliderHover = (isHover) => {
        if(autoPlay){
            if(isHover){
                clearInterval(autoPlayRef.current)
                autoPlayRef.current = null
            }else if(!autoPlayRef.current){
                const maxScroll = sliderRef.current?.childNodes.length - slidePerView
                autoPlayRef.current = setInterval(() => {
                    setScrollToX(prev => {
                        if(prev === maxScroll){
                            return 0
                        }else{
                            return prev + 1
                        }
                    })
                },5000)
            }
        }
    }

    return (
        <div className={`${styles['wrapper_bannerSlider']} ${direction === 'column' ? styles['column'] : ''} ${thumbPlacement ? styles['thumb_'+thumbPlacement] : ''}`} onMouseEnter={()=> handleSliderHover(true)} onMouseLeave={()=>handleSliderHover(false)} style={{width,height,...style}}>
            <div className={styles['wrapper_slider']}>
                {navigation && data.length > slidePerView && (
                    <>
                        <button type='button' id={idPrev} className={`iconButton ${styles['btn_prev']}`} onClick={() => {handleScrollSlider('prev')}}><LeftOutlined /></button>
                        <button type='button' id={idNext} className={`iconButton ${styles['btn_next']}`} onClick={() => {handleScrollSlider('next')}}><RightOutlined /></button>
                    </>
                )}
                <ul ref={sliderRef} className={styles['bannerSlider_list']} style={{gap: spaceBetween+'px',...border}}>
                    {data?.map(({href,...props},index) => (
                        <li key={index} className={styles['bannerSlider_item']} style={direction === 'column' ? 
                        {minWidth: '100%',minHeight: `calc(100% / ${slidePerView})`,maxHeight: `calc(100% / ${slidePerView})`} : {minWidth: `calc(100% / ${slidePerView})`,maxWidth: `calc(100% / ${slidePerView})`}}>
                            {href ? <Link href={href}><img {...props} /></Link> : <img {...props} />}
                        </li>
                    ))}
                </ul>
                {pagination && data.length > slidePerView && (
                    <div className={styles['bannerSlider_pagination']}>
                        {data?.map((_,index) => {
                            if(index < data.length - slidePerView + 1){
                                return (
                                    <div key={index} id={`dot-${index+'-'+idNext}`} className={styles['pagination_dot']} 
                                    onClick={() => {setScrollToX(index)}}></div>
                                )
                            }
                        })}
                    </div>
                )}
            </div>
            {thumbPlacement && (
                <div className={`${styles['wrapper_thumb']}`} onMouseEnter={()=> handleSliderHover(true)} onMouseLeave={()=>handleSliderHover(false)}>
                    {data.length > 4 && (
                        <div className={styles['thumb_navigation']}>
                            <button type='button' id={'thumb-'+idPrev} className={`iconButton ${styles['btn_prev']}`} onClick={() => {handleScrollSlider('prev')}}><UpOutlined /></button>
                            <button type='button' id={'thumb-'+idNext} className={`iconButton ${styles['btn_next']}`} onClick={() => {handleScrollSlider('next')}}><DownOutlined /></button>
                        </div>
                    )}
                    <ul ref={thumbRef} className={styles['bannerSlider_list-thumb']} >
                        {data?.map(({href,...props},index) => (
                            <li key={index} id={'thumb-'+index+'-'+idNext} className={styles['bannerSlider_item']} 
                            style={(thumbPlacement === 'top' || thumbPlacement === 'bottom') ? {minWidth: `calc((100% - ${(data.length - 2) * 10}px) / 4)`,maxWidth: `calc((100% - ${(data.length - 2) * 10}px) / 4)`} 
                            : {minHeight: `calc((100% - ${(data.length - 2) * 10}px) / 4)`,maxHeight: `calc((100% - ${(data.length - 2) * 10}px) / 4)`}}
                            onClick={() => {setScrollToX(index)}}>
                                <img {...props} />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default BannerSlider