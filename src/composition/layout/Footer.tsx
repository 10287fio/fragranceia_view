import type {NextPage} from 'next';
import langStyles from '@/composition/layout/Layout.module.scss';

const Footer: NextPage = () => {
    return <div className={langStyles.footer}>© Fragranceia, Co.</div>
};

export default Footer;