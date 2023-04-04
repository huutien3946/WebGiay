import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import styles from './Footer.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className="socialMedia">
                    <InstagramIcon style={{ color: '#fff', margin: '0 10px', fontSize: '40px', cursor: 'pointer' }} />
                    <FacebookIcon style={{ color: '#fff', margin: '0 10px', fontSize: '40px', cursor: 'pointer' }} />
                    <TwitterIcon style={{ color: '#fff', margin: '0 10px', fontSize: '40px', cursor: 'pointer' }} />
                </div>
                <p> &copy; 2023 Designed by Trinh Huu Tien</p>
            </div>
        </footer>
    );
}

export default Footer;
