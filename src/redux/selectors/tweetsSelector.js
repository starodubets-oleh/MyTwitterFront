export const tweetsList = state => state.tweetsState.tweets || [];
export const getReversedTweetsList = state => [...tweetsList(state)].reverse();
export const getLoadingPosts = state => state.tweetsState.loadingPosts;