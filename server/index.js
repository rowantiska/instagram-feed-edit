const express = require('express');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const app = express();

app.use(cors());
app.use(express.json());

PORT = 1234;
const errorMessage = {"error message": "400 error with server"};

//encoding func
const encodeImage = async (imageUrl) => {
    try {
        const response = await fetch(imageUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
            },
        });
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return `data:${response.headers.get('content-type')};base64,${buffer.toString('base64')}`;
    } catch (error) {
        console.error('Error in encodeImage:', error.message);
    }
};

//upload instagram private url to new URL in "cloudinary"
const imageToNewURL = async (imageURL) => {
    cloudinary.config({ 
        cloud_name: 'dnthktaqa', 
        api_key: '752333568317677', 
        api_secret: 'wWDBedQCkQGu4-kyCOLrz5kZgzk',
    });
    //getting unique ID for every post so not uploaded everytime to cloudinary
    const splitURL  = imageURL.split("/t51.29350-15/");
    const postID = splitURL[1];
    console.log("Uploading image with ID: "+  String((postID)).substring(0,9))
    try {
        const uploadResult = await cloudinary.uploader.upload(imageURL, {
            public_id: String((postID)).substring(0,9),
            use_filename: false,
            overwrite: false,
            width: 400,
            height: 400,
            
        });
        return uploadResult.url;
    } catch (error) {
        console.log("Upload error: "+error);
    }
};

//get data from instagram.com
app.get('/instagramdata/:user', async (req, res) => {
    try {
        const userName = req.params.user;
        const response = await fetch('https://www.instagram.com/api/v1/users/web_profile_info/?username='+userName, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
                'Host': 'instagram.com',
                'priority': 'u=1, i',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Dest': 'empty',
                'Content-Type': 'application/json',
                'cookie' : 'ig_did=04FD8856-480D-4B17-BEAB-65C3BED001B2; csrftoken=WI3EYNkTz3SK-Gvv2MYROu; datr=hYNpZxh-KvXMWneDPUW1CbMJ; ig_nrcb=1; mid=Z2mDhgAEAAFt_wa4vKBgPkowKuib; wd=1049x873',
                'x-asbd-id': '129477',
                'x-ig-app-id' : '936619743392459',
                'x-web-session-id': 'y5ya36:zd0416:shr3r8'
            },
        });
        const data = await response.json();
        const imageUrl = data.data.user.profile_pic_url_hd;
        const userId = data.data.user.id;
        if (imageUrl) {
            var postCoversAll = []
            for(let i = 0; i< (data.data.user.edge_owner_to_timeline_media.edges).length; i++){
                const postCover = data.data.user.edge_owner_to_timeline_media.edges[i].node.thumbnail_src;
                postCoversAll.push(await encodeImage(postCover));
            }
            data.data.user.coversEncodedAll = postCoversAll;
            const base64Image = await encodeImage(imageUrl);
            data.data.user.profileEncoded = base64Image; 
        }
        
        const responseTwo = await fetch(`https://www.instagram.com/graphql/query/?query_id=9957820854288654&user_id=${userId}&include_chaining=false&include_reel=true&include_suggested_users=false&include_logged_out_extras=true&include_live_status=false&include_highlight_reels=true`)
        const dataHighlights = await responseTwo.json();
        var highLights = dataHighlights.data.user.edge_highlight_reels.edges;
        if(highLights.length > 0){
        var encodedHighlightCoversAll = [];
        for(let i = 0; i < highLights.length; i++){
            const highLightCover = highLights[i].node.cover_media.thumbnail_src;
            encodedHighlightCoversAll.push(await imageToNewURL(highLightCover));
        }
        data.data.user.encodedHighlightCovers = encodedHighlightCoversAll;
        }
        res.status(200).send({data, dataHighlights});
    } catch (e) {
        res.status(400).send(errorMessage);
        console.error('Error: '+ e);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});