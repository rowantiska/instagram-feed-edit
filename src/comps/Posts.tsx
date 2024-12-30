interface HeaderProps{
    posts: string[];
}

export const Posts: React.FC<HeaderProps> = ({posts}) => {

return(
    <div>
        <div className='w-full flex justify-center mb-12'>
            <div className="flex flex-wrap md:justify-start justify-center md:w-3/5 w-full">
                {posts.map((post, index) => (
                    <div key={index} className="">
                        <img className="md:w-80 md:h-80 w-44 h-44 object-cover m-1.5" src={post}></img>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
};