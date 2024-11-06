declare interface NavBarIconProps {
    color: String;
    size: String;
}

interface CustomInputProps {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    placeholder?:string, 
}

interface DateOfBirthInputProps {
    control: Control<any>;
    name: string;
    label: string;
}