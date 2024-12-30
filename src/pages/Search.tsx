import { useState, useEffect } from 'react';
import { AllHeader } from '../comps/AllHeader';
import LoadingLogo from '../static/instagram_loading_logo.png';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from "react-icons/fi";

function Search() {
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(false);
    }, []);

    const getUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(event.target.value);
    }

    const navToProfile = () => {
        if(user.length != 0){
            navigate('/profile?'+user, { state: {user} });
        }
    }

if (loading) {
return <div>
    <div className='flex justify-center items-center h-screen'>
        <div>
            <img className='w-40' src = {LoadingLogo}></img>
        </div>
            <p className='absolute bottom-10 text-sm'>No affiliation with meta or instagram. Privately made for public use</p>
        </div>
    </div>;
}

    return (
    <div>
        <AllHeader/>
            <div className='flex items-center justify-center h-[75vh] m-6'>
                <div>
                    <p className='text-2xl font-semibold'>Alter feed</p>
                    <p className='text-[#A8A8A8]'>Input a username of a <i>public</i> instagram account to alter the feed</p>
                        <input onChange={getUsername} value={user} placeholder='username' className='w-full text-[16px] p-4 pt-0 pb-0 h-10 mt-4 rounded-md bg-[#363636] text-sm'></input>
                        <br></br>
                        <button className="w-32 text-[16px] font-semibold p-4 pt-0 pb-0 h-10 bg-[#0095F6] rounded-md mt-2 flex items-center" onClick={navToProfile}>Search <span className='text-xl ml-1'><FiArrowRight/></span></button>
                </div>
            </div>
        </div>
    )
    }

export default Search
