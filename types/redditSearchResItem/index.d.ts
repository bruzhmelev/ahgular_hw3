type RedditSearchResItem = {
  kind: string,
  data: RedditSearchResItemData
};

type RedditSearchResItemData = {
  title: string,
  permalink: string,
  thumbnail: string,
  author: string,
  id: string,
  created: Date,
  subreddit_name_prefixed: string,
  url: string,
  selftext_html: string,
  selftext: string
};

