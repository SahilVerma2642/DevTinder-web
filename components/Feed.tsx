import axios from 'axios'
import { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import { RootState } from '../utils/appStore';
import UserCard from './UserCard';
import { UserData } from '../features/user/userSlice';

const Feed = () => {
    const feed = useSelector((store: RootState) => store.feed);
    const dispatch = useDispatch();

    const getFeed = async () => {
        if (feed && feed.length > 0) {
            return null;
        }
        try {
            const res = await axios.get(BASE_URL + "/feed",
                {
                    withCredentials: true
                }
            );
            if (res?.data?.data) {
                dispatch(addFeed(res?.data?.data));
            }
        } catch (err) {
            //TODO: error page
        }
    }
    useEffect(() => {
        getFeed();
    }, [])

    if (!feed) {
        return null;
    }

    return (
        <div className='flex flex-col justify-center items-center mx-auto my-2 p-4'>
            {feed?.map((data: UserData) => (
                <UserCard key={data._id} user={data} />
            ))}
        </div>
    )
}

export default Feed;