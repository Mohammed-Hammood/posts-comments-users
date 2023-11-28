
type Post = {
    id: number;
    userId: number;
    title: string;
    body: string;
}


type CommentT = {
    postId: number
    id: number
    name: string
    email: string
    body: string
}

type Filters = {
    order: "id" | "-id";
    query: string;
    page: number;
    limit: number;
}

type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        string;
        geo: {
            lat: string;
            lng: string;
        }
    },
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    }
}