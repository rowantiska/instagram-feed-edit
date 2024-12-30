export interface InstagramUser {
username: string;
full_name: string;
profile_pic_url: string;
profileEncoded: string;
coversEncodedAll: [];
encodedHighlightCovers: [];
edge_follow: {
    count: number;
}
biography_with_entities:{
    raw_text: number;
};
edge_followed_by: {
    count: number;
};
edge_owner_to_timeline_media: {
    count: number;
    edges: [
        {
          node: {
            id: number,
            display_url: string,
            edge_media_to_caption: {
              edges: [
                {
                  node: { text: string },
                },
              ],
            },
          },
        },
    ]
};
edge_highlight_reels:{
  edges: [
    {
      node: {
        cover_media: string,
        title: string
      }
    }
  ]
};
}

