    import type { FC } from "react";
    import Header from "../components/Header";
    import { Controller, useForm } from "react-hook-form";
    import { TextField } from "@mui/material";
    import { Button } from "../shared/Button";
    import type { Note } from "../model/Note";
    import { useNotes, useToast } from "../store/NotesProvider";
    import { useNavigate, useParams } from "@tanstack/react-router";
    import React from "react";

    type Form = {
        title: string;
        text: string
    }

    const EditNote: FC = () => {
        const { data: notes, updateNote } = useNotes()
        const { addToast } = useToast()
        const navigate = useNavigate()

        const params = useParams({ from: '/notes/$id/edit' })
        const id = params.id
        const noteId = Number(id)
        const note = notes.find((n) => n.id === noteId)

        if (!note) {
            return <div>Заметка не найдена</div>
        }

        // Подключаем логику формы из react-hook-form
        const { handleSubmit, control, reset } = useForm<Form>({
            defaultValues: {
                title: note.title,
                text: note.text
            },
            mode: "onBlur"
        });
        
        React.useEffect(() => {
            reset({ title: note.title, text: note.text });
        }, [note, reset]);

        const onSubmit = (data:Form) =>{
            try {
                const updatedNote: Note = {
                    ...note,
                    title:data.title,
                    text:data.text
                }
                updateNote(updatedNote);

                addToast("✓ Заметка успешно изменена!", "success")
                navigate({ to: '/' })
            } catch (error) {
                addToast("✗ Ошибка при изменении заметки", "error")
            }
        }
    
        return (
            <div>
                <Header>
                <h1 className="text-4xl text-center font-bold">Редактирование заметки</h1>
                </Header>
                <div className="container mx-auto py-10">
                    <form onSubmit={handleSubmit(onSubmit)} 
                    className="w-150 mx-auto flex flex-col gap-4 text-center p-10 border rounded-xl">
                        <h2 className="text-2xl font-bold">Редактировать заметку</h2>
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
                        <Button typeof="submit" text="Отредактировать заметку" className="w-full" />
                    </form>
                </div>
            </div>
        );
    };

    export default EditNote;

