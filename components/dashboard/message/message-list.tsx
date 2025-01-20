import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { fetchData } from "@/utils/apiServices";
import MessageDeleteAction from "./MessageDeleteAction";

export default async function MessageList() {
    const messages = await fetchData("message");


    return (
        <section className="md:p-4 p-4 bg-white shadow-xl rounded-lg">
            <div className="flex justify-between mb-4">
                <h2 className="text-lg font-semibold">Messages Found: {messages?.length}</h2>
            </div>

            <Table>
                <TableCaption className="font-bold">Message List</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Delete</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {messages && messages.length > 0 ? (
                        messages.map((message: any) => (
                            <TableRow key={message._id}>
                                <TableCell>{message.name}</TableCell>
                                <TableCell>{message.email}</TableCell>
                                <TableCell>{message.message}</TableCell>
                                <TableCell>
                                    {new Date(message.createdAt).toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    <MessageDeleteAction id={message._id} />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                No messages found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </section>
    );
}
