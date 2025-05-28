import { useForm } from "react-hook-form";

import { useState } from "react";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";

interface FormData {
    content: string;
    options: string[];
}

export const CreatePollForm = ({ onSubmit }: { onSubmit: (data: FormData) => void }) => {
    const [options, setOptions] = useState(["", ""]);
    const { register, handleSubmit, formState: { isValid } } = useForm<FormData>();

    const addOption = () => {
        if (options.length < 4) {
            setOptions([...options, ""]);
        }
    };

    const removeOption = (index: number) => {
        if (options.length > 2) {
            const newOptions = [...options];
            newOptions.splice(index, 1);
            setOptions(newOptions);
        }
    };

    const updateOption = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    return (
        <form
            onSubmit={handleSubmit(() => onSubmit({
                content: "",
                options: options.filter(opt => opt.trim() !== "")
            }))}
            className="space-y-4"
        >
            <input
                {...register("content", { required: true })}
                placeholder="Poll question"
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
            />

            <div className="space-y-2">
                {options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <Input
                            value={option}
                            onChange={(e:any) => updateOption(index, e.target.value)}
                            placeholder={`Option ${index + 1}`}
                            className="bg-gray-800 border-gray-700 text-white"
                        />
                        {options.length > 2 && (
                            <button
                                type="button"
                                onClick={() => removeOption(index)}
                                className="text-red-500 hover:text-red-400"
                            >
                                ×
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {options.length < 4 && (
                <button
                    type="button"
                    onClick={addOption}
                    className="text-sm text-purple-400 hover:text-purple-300"
                >
                    + Add option
                </button>
            )}

            <Button
                type="submit"
                disabled={!isValid || options.filter(opt => opt.trim() !== "").length < 2}
                className="w-full bg-yellow-600 hover:bg-yellow-700"
            >
                Create Poll
            </Button>
        </form>
    );
};