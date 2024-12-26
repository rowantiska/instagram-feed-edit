import { useState, useEffect } from 'react';
import Logo from '../static/instagram_logo.png';
import LoadingLogo from '../static/instagram_loading_logo.png'
import { Link } from 'react-router-dom';


function Search() {
    const [user, setUser] = useState("") // Get ursername from url 
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    }, []);

    const getUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(event.target.value);
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
        <div>
            <div className='flex'>
                <img className='w-[126px] m-2' src={Logo}></img>
            </div>
                <hr className='border border-[#363636] border-[.5px]'></hr>
            </div>

            <div className='flex items-center justify-center h-[75vh] m-6'>
                <div>
                    <p className='text-2xl font-semibold'>Search a profile</p>
                    <p className='text-[#A8A8A8]'>Input a username of a <i>public</i> instagram account to alter look of your feed</p>
                    <form>
                        <input onChange={getUsername} value={user} placeholder='Account username' className='w-72 text-[16px] p-4 pt-0 pb-0 h-10 mt-4 rounded-md bg-[#363636]'></input>
                        <br></br>
                        <Link to={'/profile?'+user} state={{user}}><button className="w-32 text-[16px] font-semibold p-4 pt-0 pb-0 h-10 bg-[#0095F6] rounded-md mt-2">Search</button></Link>
                    </form>
                </div>
            </div>

        </div>
    )
    }

export default Search
