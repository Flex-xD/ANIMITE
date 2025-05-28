import { useForm } from "react-hook-form";
import { Button } from "../../../../../components/ui/button";

interface FormData {
    content: string;
}

export const CreateWatchlistForm = ({ onSubmit }: { onSubmit: (data: FormData) => void }) => {
    const { register, handleSubmit, formState: { isValid } } = useForm<FormData>();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <textarea
                {...register("content", { required: true })}
                placeholder="List the anime you're currently watching (comma separated)"
                className="min-h-[120px] bg-gray-800 border-gray-700 text-white"
            />
            <div className="text-sm text-gray-400">
                Example: "Demon Slayer, Jujutsu Kaisen, Attack on Titan"
            </div>
            <Button
                type="submit"
                disabled={!isValid}
                className="w-full bg-cyan-600 hover:bg-cyan-700"
            >
                Share Watchlist
            </Button>
        </form>
    );
};