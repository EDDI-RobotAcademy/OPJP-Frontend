import BookmarkListPage from "../pages/BookmarkListPage.vue";

const BookmarkRoutes = [
    {
        path: '/bookmark/list',
        name: 'BookmarkListPage',
        components: {
            default: BookmarkListPage
        },
    },
]

export default BookmarkRoutes