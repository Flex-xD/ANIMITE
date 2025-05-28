import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../../components/ui/dialog";
import { PostType } from "../../types/post";
import { createPost } from "../../api/apiClient";
import { CreateBlogForm } from "./CreateForms/CreateBlogForm";
import { CreateNormalForm } from "./CreateForms/CreateNormalForms";
import { CreateWatchlistForm } from "./CreateForms/CreateWatchlistForm";
import { CreatePollForm } from "./CreateForms/CreateFormPoll";
import { CreateReviewForm } from "./CreateForms/CreateReviewForm";
import { Button } from "../../../../components/ui/button";
import { useToast } from "../../../../hooks/use-toast";
// import { Button } from "../ui/button";
// import { PostType } from "../../types/post";
// import { CreateBlogForm } from "./CreateForms/CreateBlogForm";
// import { CreateNormalForm } from "./CreateForms/CreateNormalForms";
// import { CreateWatchlistForm } from "./CreateForms/CreateWatchlistForm";
// import { CreatePollForm } from "./CreateForms/CreatePollForm";
// import { CreateReviewForm } from "./CreateForms/CreateReviewForm";
// import { createPost } from "../../api/apiClient";
// import { useToast } from "../ui/use-toast";

export const PostModal = ({ onPostCreated }: { onPostCreated: () => void }) => {
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<PostType>("normal");
    const { toast } = useToast();

    const postTypes: PostType[] = ["normal", "blog", "watchlist", "poll", "review"];

    const handleSubmit = async (data: { content: string; stars?: number; options?: string[] }) => {
        try {
            await createPost({
                type: activeTab,
                content: data.content,
                stars: data.stars,
                options: data.options
            });

            toast({
                title: "Post created!",
                description: "Your post has been successfully created.",
                variant: "default",
            });

            setOpen(false);
            onPostCreated();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to create post. Please try again.",
                variant: "destructive",
            });
            console.error(error);
        }
    };

    const renderForm = () => {
        switch (activeTab) {
            case "blog":
                return <CreateBlogForm onSubmit={handleSubmit} />;
            case "normal":
                return <CreateNormalForm onSubmit={handleSubmit} />;
            case "watchlist":
                return <CreateWatchlistForm onSubmit={handleSubmit} />;
            case "poll":
                return <CreatePollForm onSubmit={handleSubmit} />;
            case "review":
                return <CreateReviewForm onSubmit={handleSubmit} />;
            default:
                return <CreateNormalForm onSubmit={handleSubmit} />;
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg">
                    Create Post
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl bg-gray-900 border-gray-700 rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-white">Create New Post</DialogTitle>
                </DialogHeader>

                <div className="flex border-b border-gray-700">
                    {postTypes.map((type) => (
                        <button
                            key={type}
                            onClick={() => setActiveTab(type)}
                            className={`px-4 py-2 text-sm font-medium capitalize ${activeTab === type ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'}`}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                <div className="mt-4">
                    {renderForm()}
                </div>
            </DialogContent>
        </Dialog>
    );
};