import { useState, useEffect } from 'react';
import { InstagramUser } from './types';
import { Posts } from './Posts';

interface HeaderProps{
    data?: InstagramUser;
}

export const Alter: React.FC<HeaderProps> = ({data}) => {
    const [model, setModel] = useState(false)
    const [file, setFile] = useState("");
    const [forceUpdate, setforceUpdate] = useState(0);
    const [activeImgIndex, setActiveImgIndex] = useState(0);
    const [allpictureData, setAllpictureData] = useState<string[]>([]); // This needs to be sent to posts component


      
    useEffect(() => {
        const setAllPics = () => {
            setAllpictureData(data?.coversEncodedAll || [])
            console.log(allpictureData.length)
        }
        setAllPics();
        }, []);
    
    const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            const data = new FileReader();
            data.addEventListener('load', () => {
                if (typeof data.result === 'string') {
                    setFile(data.result);
                }
            });
            data.readAsDataURL(files[0]);
        }
    };    

    const toggleModel = () => {
        setModel(!model);
    }

    const toggleImg = (imgIndex: any) => (event: React.MouseEvent<HTMLDivElement>): void => {
        setActiveImgIndex(imgIndex);
        console.log(activeImgIndex)
    }

    const removePost = () => {
        console.log(activeImgIndex) // Image index to be removed
        setAllpictureData((prevItems) => prevItems.filter((_, index) => index !== activeImgIndex));
        setforceUpdate(forceUpdate+1); // remap
    }


    const addImage = () => {
        if(file.length != 0){
            setAllpictureData((prevData) => [
                file, ...prevData
            ]); 
        }
        setforceUpdate(forceUpdate+1);
    };

return(
    <div>
        <button onClick={toggleModel} className='text-[16px] font-semibold p-4 pt-0 pb-0 h-8 bg-[#0095F6] rounded-md absolute right-6 top-3'>Alter feed</button>
    {model &&
        <div>
            <div className='w-full h-auto bg-[#000] z-10 fixed top-0 bottom-0 right-0 left-0 overflow-scroll pb-10'>
            <button className='absolute top-3 right-6' onClick={toggleModel}>Close</button>
                <div className='md:flex block'>
                    <div className='md:w-1/5 md:fixed w-full md:p-10 p-6 border-[#363636] border-r-[.5px]'>
                    <p className='text-2xl mb-6'>Feed editor</p>
                    <div>
                        <p className='text-[#A8A8A8]'>ADD</p>
                        <hr className='border-[.5px] border-[#363636] m-2 ml-0 mb-4'></hr>
                            <div>
                                <form>
                                    <input
                                        type="file" onChange={handleImage}
                                        className="mt-2 block w-full text-sm text-slate-500
                                            file:mr-4 file:py-2 file:px-4 file:rounded-md
                                            file:border-0 file:text-sm file:font-semibold
                                            file:bg-[#0095F6] file:text-[#ffffff] file:cursor-pointer"
                                    />
                                </form>
                                <button className='text-sm font-semibold p-2.5 w-full bg-[#363636] rounded-md m-2 ml-0' onClick={addImage}>Add</button>
                            </div>
                        </div>


                        <div>
                        <p className='text-[#A8A8A8] mt-6'>REMOVE</p>
                        <hr className='border-[.5px] border-[#363636] m-2 ml-0 mb-2'></hr>
                            <div>
                                <p className='text-sm'>Click a post to remove and then click 'remove'</p>
                                <button className='text-sm font-semibold p-2.5 w-full bg-[#363636] rounded-md m-2 ml-0' onClick={removePost}>Remove</button>
                            </div>
                        </div>

                        <div>
                        <hr className='border-[.5px] border-[#363636] m-2 ml-0 mb-2'></hr>
                            <div>
                                <p className='text-sm mt-6'>Push changed made to profile screen</p>
                                <button className='text-sm font-semibold p-2.5 w-full bg-[#363636] rounded-md m-2 ml-0' onClick={removePost}>Confirm edits</button>
                            </div>
                        </div>


                    </div>
                    <div className="w-full md:w-4/5 overflow-scroll md:ml-[20%]  flex flex-wrap justify-center md:mt-10 mt-4" key={forceUpdate}>
                            {allpictureData.map((post, index) => (
                                    <div key={index} onClick={toggleImg(index)} className='cursor-pointer'>
                                        <img className="md:w-72 md:h-72 w-40 h-40 object-cover m-1.5" src={post} ></img>
                                    </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
        }
            <Posts posts={allpictureData}/>
    </div>
);
};