export const commentsList = state => state.commentsState.comments || [];
export const getReversedCommentsList = state => [...commentsList(state)].reverse();
export const getLoadingComments = state => state.commentsState.loadingComments;