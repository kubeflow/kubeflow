import { useContext } from 'react';
import { ProfileContext} from '../contexts/get-profile-context';

export const useProfile = () => useContext(ProfileContext);
export const ProfileConsumer = ProfileContext.Consumer;