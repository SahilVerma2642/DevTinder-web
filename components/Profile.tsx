import EditProfile from './EditProfile';
import { useSelector } from 'react-redux';
import type { RootState } from '../utils/appStore';

const Profile = () => {
    const user = useSelector((store: RootState) => store.user);
    return (user?.status) && (user?.data) && (
        <div><EditProfile user={user.data} /></div>
    )
}

export default Profile;