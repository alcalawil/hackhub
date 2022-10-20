import { Link } from 'react-router-dom';
import { AiOutlineClose, AiFillHome } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa';
import { MdOutlineEmojiEvents } from 'react-icons/md';
import { GoBook } from 'react-icons/go';
import { useApp } from '../../hooks/useApp';
import { scrollToTop } from '../../common/utils';
import './index.css';
import { version } from '../../../package.json';
import LoginButton from '../LoginButton';

const Topbar = () => {
    const { isOpenTopbar, setIsOpenTopbar } = useApp();

    return (
        <div className={`shadow bgnd-primary d-flex flex-column justify-content-center topbar topbar-${isOpenTopbar ? 'open' : 'close'}`}>
            <div className='p-4 mb-auto d-flex justify-content-between'>
                <div className='d-flex'>
                    <h1 className='d-flex justify-content-center align-items-center fw-bold py-0 ps-0 pe-3'>hackhub</h1>
                    <LoginButton />
                </div>
                <AiOutlineClose size={25} onClick={() => setIsOpenTopbar(false)}/> 
            </div>

            <ul className='text-left'>
                <Link onClick={() => { setIsOpenTopbar(false); scrollToTop(0); }} to='' className='py-2 d-flex flex-inline'>
                    <AiFillHome color='black' size={25} />
                    <h5 className='mx-3'>Inicio</h5>
                </Link>

                <Link onClick={() => { setIsOpenTopbar(false); scrollToTop(0); }} to='/attendees' className='py-2 d-flex flex-inline'>
                    <FaUsers color='black' size={25} />
                    <h5 className='mx-3'>Attendees</h5>
                </Link>

                <Link onClick={() => { setIsOpenTopbar(false); scrollToTop(0); }} to='/events' className='py-2 d-flex flex-inline'>
                    <MdOutlineEmojiEvents color='black' size={25} />
                    <h5 className='mx-3'>Events</h5>
                </Link>

                <Link onClick={() => { setIsOpenTopbar(false); scrollToTop(0); }} to='' className='py-2 d-flex flex-inline'>
                    <GoBook color='black' size={25} />
                    <h5 className='mx-3'>Organizer</h5>
                </Link>
            </ul>

            <div className='p-4 mt-auto text-center d-flex flex-column' style={{ fontSize: 15 }}>
                <div>ver { version }</div>
            </div>
        </div>
    );
}
 
export default Topbar;