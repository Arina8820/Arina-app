import type { FC } from "react";
import Header from "../components/Header";
import { Controller, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { Button } from "../shared/Button";
import type { Note } from "../model/Note";
import { useNotes, useToast } from "../store/NotesProvider";
import { useNavigate } from "@tanstack/react-router";

type Form = {
    title: string;
    text: string
}

const AddNote: FC = () => {
    const { addNote } = useNotes()
    const { addToast } = useToast()
    const navigate = useNavigate()
    
    // Подключаем логику формы из react-hook-form
    const { handleSubmit, control } = useForm<Form>({
        defaultValues: {
            title: "",
            text: ""
        },
        mode: "onBlur"
    });

    const onSubmit = (data:Form) =>{
        try {
            const NewNote: Note = {
                id: Math.floor(Math.random()*1000),
                title: data.title,
                text: data.text,
                createDate: new Date()
            }
            addNote(NewNote)
            addToast("✓ Заметка успешно создана!", "success")
            navigate({ to: '/' })
        } catch (error) {
            addToast("✗ Ошибка при сохранении заметки", "error")
        }
    }
 
    return (
        <div>
            <Header>
                <h1 className="text-4xl text-center font-bold">Создание заметки</h1>
            </Header>
            <div className="container mx-auto py-10">
                <form onSubmit={handleSubmit(onSubmit)} 
                className="w-150 mx-auto flex flex-col gap-4 text-center p-10 border rounded-xl">
                    <h2 className="text-2xl font-bold">Добавить заметку</h2>
                    <Controller
                        name="title"
                        control={control}
                        rules={{
                            required: true,
                            validate: (value) => value.length > 5 || "Минимум 6 символов"
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                label="Заголовок заметки"
                                fullWidth
                                variant="outlined"
                                error={!!error}
                                helperText={error?.message}
                            />
                        )}
                    />
                    <Controller
                        name="text"
                        control={control}
                        rules={{
                            required: true,
                            validate: (value) => value.length > 5 || "Минимум 6 символов"
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                label="Текст заметки"
                                fullWidth
                                variant="outlined"
                                error={!!error}
                                helperText={error?.message}
                            />
                        )}
                    />
                    <Button typeof="submit" text="Создать заметку" className="w-full" />
                </form>
            </div>
        </div>
    );
};

export default AddNote;
