import { FiMoreHorizontal, FiPlus, FiGrid, FiUserCheck } from "react-icons/fi";
import { InstagramUser } from './types';

interface HeaderProps{
  data?: InstagramUser;
}

export const Header: React.FC<HeaderProps> = ({data}) => {

return(
  <div>

  <div className="flex justify-center w-full">
    <div className="md:w-1/2 w-full">
      <div className="flex w-full mt-4 md:mt-10">
        <div className="w-1/4 md:mt-5 mt-0">
          <img className="rounded-full md:min-w-[154px] md:min-h-[154px] w-20 h-20 object-cover md:ml-0 ml-4" src = {data?.profileEncoded}></img>
        </div>

        <div className="w-3/4 md:ml-20 ml-4">
        <div className="md:flex block items-center">
          <div className="md:block flex items-center">
            <p className="md:text-[22px] text-[20px]">{data?.username}</p>
            <button className="text-2xl p-3 pt-0 pb-0 h-8 rounded-md flex items-center md:hidden block mt-1"><FiMoreHorizontal/></button>
          </div>
          <button className="md:w-fit w-3/4 text-[16px] font-semibold p-4 pt-0 pb-0 h-8 bg-[#363636] rounded-md md:ml-8 ml-0 mt-5 md:mt-0" >Follow</button>
          <button className="text-2xl p-3 pt-0 pb-0 h-8 rounded-md flex items-center md:block hidden"><FiMoreHorizontal/></button>
        </div>

        <div className="mt-6 hidden md:flex">
          <p className="text-[16px] flex items-center"><span className="font-semibold mr-1">{data?.edge_owner_to_timeline_media.count}</span>posts</p>
          <p className="text-[16px] flex items-center ml-10"><span className="font-semibold mr-1">{data?.edge_followed_by.count}</span>followers</p>
          <p className="text-[16px] flex items-center ml-10"><span className="font-semibold mr-1">{data?.edge_follow.count}</span>following</p>
        </div>

        <div className="mt-4 md:block hidden">
          <p className="text-[16px] font-semibold">{data?.full_name}</p>
          <button className="p-[8px] pt-0 pb-0 text-[13px] rounded-full bg-[#363636] flex items-center mt-1.5"><span className="text-[16px] mr-1">@</span>{data?.username}</button>
          <p className="text-[16px] mt-1.5">{data?.biography_with_entities.raw_text}</p>
        </div>

        </div>
      </div>

      <div className="mt-0 md:hidden block ml-2">
          <p className="text-[16px] font-semibold">{data?.full_name}</p>
          <button className="p-[8px] pt-0 pb-0 text-[13px] rounded-full bg-[#363636] flex items-center mt-1.5"><span className="text-[16px] mr-1">@</span>rowantiska</button>
          <p className="text-[16px] mt-1.5">{data?.biography_with_entities.raw_text}</p>
      </div>

      <div className="md:mt-12 mt-5 ml-2 flex">

      
      {data?.edge_highlight_reels.edges.map((highlight, index) => (
            <div key={index} className="">
                <div className="md:w-[78px] w-[56px] mr-8">
                  <div className="md:w-[78px] md:h-[78px] w-[56px] h-[56px] rounded-full object-cover border border-[#363636] flex items-center justify-center">
                    <img className="rounded-full md:w-[71px] md:h-[71px] w-[51px] h-[51px]" src = {data?.encodedHighlightCovers[index]}></img>
                  </div>
                  <p className="flex justify-center text-[13px] mt-2 font-semibold">{highlight.node.title}</p>
                </div>
            </div>
        ))}


        <div className="md:w-[78px] w-[56px]">
          <div className="md:w-[78px] md:h-[78px] w-[56px] h-[56px] rounded-full object-cover border border-[#363636] bg-[#121212] flex items-center justify-center">
            <span className="md:text-[52px] text-[30px] text-[#737373]"><FiPlus/></span>
          </div>
          <p className="flex justify-center text-[13px] mt-2 font-semibold">New</p>
        </div>

      </div>

      <div className="mt-5 md:hidden flex w-full border-t-[.5px] border-[#363636]">
          <div className="text-[14px] md:text-[16px] flex items-center justify-center p-2.5 w-1/3">
            <div>
            <p className="font-semibold mr-1 text-center">{data?.edge_owner_to_timeline_media.count}</p>
            <p>posts</p>
            </div>
          </div>
          <div className="text-[14px] md:text-[16px] flex items-center justify-center p-2.5 w-1/3">
            <div>
            <p className="font-semibold mr-1 text-center">{data?.edge_followed_by.count}</p>
            <p>followers</p>
            </div>
          </div>
          <div className="text-[14px] md:text-[16px] flex items-center justify-center p-2.5 w-1/3">
            <div>
            <p className="font-semibold mr-1 text-center">{data?.edge_follow.count}</p>
            <p>following</p>
            </div>
          </div>
      </div>
      
      <div className="md:mt-12 mt-0">
        <hr className="border border-[#262626] border-[.5px]"></hr>
        <div className="flex justify-center">
          <button className="md:w-fit w-1/2 p-3 pb-4 pt-4 font-semibold text-[13px] tracking-widest border-[#ffffff] border-t-[.5px] -mt-[.5px] md:text-[#ffffff] text-[#0095F6] flex items-center justify-center"><span className="mr-1.5 md:text-[16px] text-[20px]"><FiGrid/></span><span className="md:flex hidden">POSTS</span></button>
          <button className="md:w-fit w-1/2 p-3 pb-4 pt-4 ml-8 font-semibold text-[13px] tracking-widest md:text-[#A8A8A8] text-[#A8A8A8] flex items-center justify-center"><span className="mr-1.5 md:text-[16px] text-[20px]"><FiUserCheck/></span><span className="md:flex hidden">TAGGED</span></button>
        </div>

      </div>

    </div>
  </div>


  </div>
);
};