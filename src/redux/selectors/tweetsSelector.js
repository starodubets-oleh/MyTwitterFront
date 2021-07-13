export const tweetsList = state => state.tweetsState.tweets || [];
export const getReversedTweetsList = state => [...tweetsList(state)].reverse();
export const getLoadingTweets = state => state.tweetsState.loadingTweets;
export const getTweet = state => state.tweetsState.tweet || {};
export const getLoadingTweet = state => state.tweetsState.loadingTweet;
export const getPaginationTweets = state => state.tweetsState.paginationTweets;