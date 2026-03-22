import axios from 'axios'
import { useCallback, useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { addFeed, removeFeed } from '../features/feed/feedSlice';
import type { RootState } from '../utils/appStore';
import UserCard from './UserCard';
import type { UserData } from '../features/user/user.types';

const Feed = () => {
    const feed = useSelector((store: RootState) => store.feed);
    const dispatch = useDispatch();

    const getFeed = useCallback(async () =>{
        // if (feed && feed.length > 0) {
        //     return null;
        // }
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
            console.error("Error fetching feed:", err);
        }
    }, [dispatch]);


    useEffect(() => {
        getFeed();
    }, [getFeed]);

    if (!feed || feed.length === 0) {
        return (
            <div className="flex justify-center items-center h-96">
                <p className="text-xl text-gray-500">No more profiles!</p>
            </div>
        );
    }

    const handleSwipe = async (user: UserData, direction: 'left' | 'right') => {
        const status = direction === 'right' ? 'interested' : 'ignored';
        try {
            await axios.post(`${BASE_URL}/request/send/${status}/${user._id}`, {}, { withCredentials: true });
        } catch (err) {
            console.error("Swipe error:", err);
        }
        dispatch(removeFeed(user._id));
    };

    const visibleCards = feed.slice(0, 3);

    return (
        <div className="flex justify-center items-center my-8 px-4">
            <div className="relative w-80 md:w-96 h-[500px]">
                {[...visibleCards].reverse().map((user: UserData, reverseIndex: number) => {
                    const stackIndex = visibleCards.length - 1 - reverseIndex;
                    return (
                        <UserCard
                            key={user._id}
                            user={user}
                            isTop={stackIndex === 0}
                            stackIndex={stackIndex}
                            onSwipeLeft={() => handleSwipe(user, 'left')}
                            onSwipeRight={() => handleSwipe(user, 'right')}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Feed;
