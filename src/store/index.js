import {AuthStore, SignUpStore, EditProfileStore, UserProfileStore, CreateGlobalBlockingStore} from '../User'
import {SettingsStore} from '../Settings';
import {BlogPostListStore, CreateBlogPostStore, BlogPostLikeStore, DeleteBlogPostDialogStore,
    BlogPostStore, BlockBlogPostAuthorStore, FeedStore} from "../BlogPost";
import {CreateBlogStore, BlogStore, BlogSubscribersBlockStore, SubscribeToBlogStore, UnsubscribeFromBlogStore,
    BlogManagersBlockStore, EditBlogDialogStore, CreateBlogBlockingStore, BlogSubscribersListStore,
    BlogBlockingsStore, UpdateBlogBlockingStore} from "../Blog";
import {AppBarStore, CurrentUserSubscriptionsStore} from "../AppBar";
import {CommentListStore, CreateCommentStore, CommentLikeStore, DeleteCommentStore,
    RestoreCommentStore, BlockCommentAuthorInBlogStore} from "../Comment";
import {NotificationsHolderStore} from "../Notification";

const authStore = new AuthStore();
const editProfileStore = new EditProfileStore(authStore);
const userProfileStore = new UserProfileStore(authStore);
const blogStore = new BlogStore(authStore);
const blogSubscribersBlockStore = new BlogSubscribersBlockStore(blogStore);
const appBarStore = new AppBarStore(authStore);
const currentUserSubscriptionsStore = new CurrentUserSubscriptionsStore(authStore, appBarStore);
const subscribeToBlogStore = new SubscribeToBlogStore(blogStore, currentUserSubscriptionsStore);
const unsubscribeFromBlogStore = new UnsubscribeFromBlogStore(blogStore, currentUserSubscriptionsStore);
const createBlogPostStore = new CreateBlogPostStore();
const blogPostLikeStore = new BlogPostLikeStore();
const blogPostListStore = new BlogPostListStore(blogStore, authStore, createBlogPostStore, blogPostLikeStore);
const deleteBlogPostDialogStore = new DeleteBlogPostDialogStore(blogPostListStore);
const blogManagersBlockStore = new BlogManagersBlockStore(authStore, blogStore);
const blogPostStore = new BlogPostStore(authStore, blogPostLikeStore);
const createCommentStore = new CreateCommentStore(blogPostStore);
const commentListStore = new CommentListStore(blogPostStore, authStore, createCommentStore);
const commentLikeStore = new CommentLikeStore(commentListStore);
const deleteCommentStore = new DeleteCommentStore(commentListStore);
const restoreCommentStore = new RestoreCommentStore(commentListStore);
const editBlogDialogStore = new EditBlogDialogStore(blogStore);
const notificationHolderStore = new NotificationsHolderStore(authStore);
const createBlogBlockingStore = new CreateBlogBlockingStore(blogStore, blogPostStore);
const blogSubscribersListStore = new BlogSubscribersListStore();
const createGlobalBlockingStore = new CreateGlobalBlockingStore();
const blockBlogPostAuthorStore = new BlockBlogPostAuthorStore(createGlobalBlockingStore);
const feedStore = new FeedStore(authStore, blogPostLikeStore);
const blogBlockingsStore = new BlogBlockingsStore();
const updateBlogBlockingStore = new UpdateBlogBlockingStore();

export default {
    authStore: authStore,
    blogPostListStore: blogPostListStore,
    blogPostLikeStore: blogPostLikeStore,
    signUpStore: new SignUpStore(),
    settingsStore: new SettingsStore(),
    createBlogStore: new CreateBlogStore(),
    editProfileStore: editProfileStore,
    userProfileStore: userProfileStore,
    blogStore: blogStore,
    blogSubscribersBlockStore: blogSubscribersBlockStore,
    subscribeToBlogStore: subscribeToBlogStore,
    unsubscribeFromBlogStore: unsubscribeFromBlogStore,
    createBlogPostStore: createBlogPostStore,
    appBarStore: appBarStore,
    currentUserSubscriptionsStore: currentUserSubscriptionsStore,
    deleteBlogPostDialogStore: deleteBlogPostDialogStore,
    blogManagersBlockStore: blogManagersBlockStore,
    blogPostStore: blogPostStore,
    commentListStore: commentListStore,
    createCommentStore: createCommentStore,
    commentLikeStore: commentLikeStore,
    deleteCommentStore: deleteCommentStore,
    restoreCommentStore: restoreCommentStore,
    editBlogDialogStore: editBlogDialogStore,
    notificationsHolderStore: notificationHolderStore,
    createBlogBlockingStore: createBlogBlockingStore,
    blockCommentAuthorInBlogStore: new BlockCommentAuthorInBlogStore(),
    blogSubscribersListStore: blogSubscribersListStore,
    createGlobalBlockingStore: createGlobalBlockingStore,
    blockBlogPostAuthorStore: blockBlogPostAuthorStore,
    feedStore: feedStore,
    blogBlockingsStore: blogBlockingsStore,
    updateBlogBlockingStore: updateBlogBlockingStore
};