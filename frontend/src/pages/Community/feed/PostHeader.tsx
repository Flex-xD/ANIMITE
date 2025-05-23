import { Avatar, AvatarImage, AvatarFallback } from '../../../components/ui/avatar';
import { User } from '../../../constants/types';

type PostHeaderProps = {
    user: User;
    timestamp: string;
};

const PostHeader = ({ user, timestamp }: PostHeaderProps) => (
    <div className="p-4 border-b border-gray-700/50 flex items-center">
        <Avatar className="mr-3 border border-purple-500/50">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
            <h3 className="font-medium text-white">{user.username}</h3>
            <p className="text-xs text-gray-400">{timestamp}</p>
        </div>
    </div>
);

export default PostHeader;