import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import api from "@/lib/api";
import { ACCESS_TOKEN } from "@/lib/utils";

interface Question {
    id: number;
    user_firstName: string;
    user_lastName: string;
    subject: string;
    description: string;
    admin_solved: boolean;
    admin_solved_by: number | null;
    admin_solved_by_username: string | null;
}

interface QuestionsListProps {
    questionsList: Question[];
    admin: any;
}

export default function QuestionsList({ questionsList, admin }: QuestionsListProps) {

    const handleQuestionSolve = async (questionId: any, value: boolean) => {
        try {
            const response = await api.patch(`/api/questions-update/${questionId}/`, {
                admin_solved: value,
                admin_solved_by: value ? admin.user_id : null,
            },
                {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                    },
                },
            )

            window.location.reload()

        } catch (error) {
            return null
        }
    }

    return (
        <Table>
            <TableHeader>
                <TableRow className="border-2">
                    <TableHead>Questions id</TableHead>
                    <TableHead>User Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead className="max-w-[350px]">Description</TableHead>
                    <TableHead>Solve</TableHead>
                    <TableHead>Admin Solved By</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {questionsList?.length ? (
                    questionsList.map((question: any) => (
                        <TableRow key={question.id} className={`h-[50px] border-2 ${question.admin_solved ? "bg-green-200 hover:bg-green-400" : "bg-red-200 hover:bg-red-400"
                            }`} >
                            <TableCell className="border-2">{question.id}</TableCell>
                            <TableCell className="border-2">{question.user_firstName}&nbsp;{question.user_lastName}</TableCell>
                            <TableCell className="border-2">{question.user_email}</TableCell>
                            <TableCell className="border-2">{question.subject}</TableCell>
                            <TableCell className="max-w-[350px] border-2">{question.description}</TableCell>
                            <TableCell className="border-2">{question.admin_solved ? (
                                <Button onClick={() => { handleQuestionSolve(question.id, false) }}>
                                    Cancel
                                </Button>
                            ) : (
                                <Button className="px-5" onClick={() => { handleQuestionSolve(question.id, true) }}>
                                    Solve
                                </Button>
                            )}</TableCell>
                            <TableCell className="border-2">{question.admin_solved_by_username}</TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center">
                            No questions found.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
