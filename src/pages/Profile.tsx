import { useState, useEffect } from 'react';
import { Header } from '../comps/Header';
import { Alter } from '../comps/Alter';
import { AllHeader } from '../comps/AllHeader';
import { InstagramUser } from '../comps/types';
import LoadingLogo from '../static/instagram_loading_logo.png';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const location = useLocation();
    const searchData = location.state; 
    const username = searchData.user;
    const [instagramData, setInstagramData] = useState<InstagramUser | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
    const getData = async () => {
        try {
            const response = await fetch('http://localhost:1234/instagramdata/'+username) 
            const result = await response.json();
            setLoading(false);
            setInstagramData({
                ...result.data.data.user,
                ...result.dataHighlights.data.user
            });
        } catch (e: any) {
            setLoading(false);
            console.log("Error fetching data: "+e);
            navigate("/");
        }
    };
    getData();
    }, []);

    if (loading) {
    return <div>
        <div className='flex justify-center items-center h-screen'>
                <div>
                    <img className='w-40' src = {LoadingLogo}></img>
                    <p className='text-center text-lg'>Encoding posts...</p>
                </div>
            <p className='absolute bottom-10 text-sm'>No affiliation with meta or instagram. Privately made for public use</p>
            </div>
        </div>;
    }

    return (
    <div>
            <AllHeader/>
            {instagramData && <Header data={instagramData}/>}
            {instagramData && <Alter data={instagramData}/>}
        </div>
    )
    }

export default Profile
