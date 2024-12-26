import { useState, useEffect } from 'react';
import { Header } from '../comps/Header';
import { Alter } from '../comps/Alter';
import { InstagramUser } from '../comps/types';
import Logo from '../static/instagram_logo.png';
import LoadingLogo from '../static/instagram_loading_logo.png';
import { useLocation } from 'react-router-dom';


function Profile() {
    const location = useLocation();
    const searchData = location.state; 
    const username = searchData.user;
    const [instagramData, setInstagramData] = useState<InstagramUser | null>(null);

    const [loading, setLoading] = useState(true)

    useEffect(() => {
    const getData = async () => {
        try {
            const response = await fetch('http://localhost:1234/instagramdata/'+username) 
            const result = await response.json();
            setLoading(false)
            setInstagramData({
                ...result.data.data.user, // Include user data
                ...result.dataHighlights.data.user // Include dataHighlights
            });
        } catch (e) {
            console.log("Error fetching data: "+e)
        }
    };
    getData();
    }, []);

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
            <div className='flex justify-center'>
                <div className='w-full'>
                    <img className='w-[126px] m-2' src={Logo}></img>
                </div>
            </div>
                <hr className='border border-[#363636] border-[.5px]'></hr>
            </div>

            {instagramData && <Header data={instagramData}/>}
            {instagramData && <Alter data={instagramData}/>}
        </div>
    )
    }

export default Profile
