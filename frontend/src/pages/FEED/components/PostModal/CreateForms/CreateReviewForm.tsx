import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "../../../../../components/ui/button";

interface FormData {
    content: string;
    stars: number;
}

export const CreateReviewForm = ({ onSubmit }: { onSubmit: (data: FormData) => void }) => {
    const [stars, setStars] = useState(0);
    const { register, handleSubmit, formState: { isValid } } = useForm<FormData>();

    return (
        <form onSubmit={handleSubmit(() => onSubmit({ content: "", stars }))} className="space-y-4">
            <div className="flex justify-center space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => setStars(i)}
                        className="text-2xl focus:outline-none"
                    >
                        {i <= stars ? '★' : '☆'}
                    </button>
                ))}
            </div>

            <textarea
                {...register("content", { required: true })}
                placeholder="Write your review..."
                className="min-h-[150px] bg-gray-800 border-gray-700 text-white"
            />

            <Button
                type="submit"
                disabled={!isValid || stars === 0}
                className="w-full bg-pink-600 hover:bg-pink-700"
            >
                Post Review
            </Button>
        </form>
    );
};