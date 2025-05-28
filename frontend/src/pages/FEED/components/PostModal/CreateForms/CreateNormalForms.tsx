import { useForm } from "react-hook-form";
import { Button } from "../../../../../components/ui/button";


interface FormData {
    content: string;
}

export const CreateNormalForm = ({ onSubmit }: { onSubmit: (data: FormData) => void }) => {
    const { register, handleSubmit, formState: { isValid } } = useForm<FormData>();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <textarea
                {...register("content", { required: true })}
                placeholder="What's on your mind?"
                className="min-h-[120px] bg-gray-800 border-gray-700 text-white"
            />
            <Button
                type="submit"
                disabled={!isValid}
                className="w-full bg-purple-600 hover:bg-purple-700"
            >
                Post
            </Button>
        </form>
    );
};