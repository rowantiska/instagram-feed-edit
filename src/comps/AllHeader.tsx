import Logo from '../static/instagram_logo.png';
import { Link } from 'react-router-dom';

export const AllHeader: React.FC = () => {

return(
    <div>
        <div>
            <div className='flex justify-center'>
                <div className='w-full'>
                    <Link to={'/'}><img className='w-[126px] m-2 cursor-pointer' src={Logo}></img></Link>
                </div>
            </div>
                <hr className='border border-[#363636] border-[.5px]'></hr>
        </div>
    </div>
);
};