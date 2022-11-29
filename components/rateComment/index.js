import React from 'react';
import styles from './rateComment.module.scss';

export default function RateComment() {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className={styles['wrapper']}>
            <div className={styles['wrapper_body']}>
                <h1 className={styles['body_title']}>Đánh giá:</h1>
                <div className={styles['body_content']}>
                    <ul className={styles['content_list-comment']}>
                        <div className={styles['list-comment-title--box']}>
                            <h3>Đánh giá: </h3>
                            5 sao 10 lần đánh giá
                        </div>
                        <li className={styles['list_comment-item']}>
                            item 1
                        </li>
                        <li className={styles['list_comment-item']}>
                            item 1
                        </li>
                        <li className={styles['list_comment-item']}>
                            item 1
                        </li>
                    </ul>
                    <div className={styles['comment_box']}>
                        <h1 className={styles['comment_box--title']}>
                            Hãy đánh giá cho sản phẩm "NIKE AIR JORDAN 1 LOW 'BLACK TOE'"
                        </h1>
                        5 sa0
                        <form className={styles['comment_box-input']} onSubmit={handleSubmit}>
                            <label htmlFor='input_comment'>
                                <span style={{color: 'red'}}>*</span>Nhận xét của bạn:
                            </label>
                            <textarea name='input_comment'/>
                            <button className={styles['btn_submit']} type='submit'>Gửi</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}