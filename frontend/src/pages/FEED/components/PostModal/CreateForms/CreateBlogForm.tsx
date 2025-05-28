import { useForm } from "react-hook-form";
import { Button } from "../../../../../components/ui/button";


interface FormData {
    content: string;
}

export const CreateBlogForm = ({ onSubmit }: { onSubmit: (data: FormData) => void }) => {
    const { register, handleSubmit, formState: { isValid } } = useForm<FormData>();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <textarea
                {...register("content", { required: true })}
                placeholder="Write your blog post here..."
                className="min-h-[200px] bg-gray-800 border-gray-700 text-white"
            />
            <Button
                type="submit"
                disabled={!isValid}
                className="w-full bg-purple-600 hover:bg-purple-700"
            >
                Publish Blog
            </Button>
        </form>
    );
};