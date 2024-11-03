import { useState, useEffect } from "react";
import { Docs } from "./Docs";
import { Topbar } from "./Topbar";
import { Dialogbox } from "./Dialogbox";
import { useAppSelector } from "../hooks/redux.hook";
import { Navigate } from "react-router-dom";
import SocketService from "../services/socket";


interface DocumentType {
    _id: string;
    name: string;
    data: {
        ops: any[];
    };
    __v: number;
}


export const LandingPage = () => {
    const user = useAppSelector(state => state.user.userDetails);
    if (!user) return <Navigate to="/login" />;
    const [documents, setDocuments] = useState<DocumentType[]>([]);

    useEffect(() => {
        const socket = SocketService.getSocket().connect();
        console.log("socket is here", socket);

        socket.emit("get-all-documents", { page: 1, limit: 10 });

        socket.on("all-documents", (allDocuments: DocumentType[]) => {
            setDocuments(allDocuments);
        });

        return () => {
            socket.disconnect();
        }
    }, []);

    return (
        <div className="LandingPage">
            <Topbar user={user} />
            <div className="Docs-container-1">
                <div className="title-1"> Start a new document </div>
                <div> <Dialogbox /> </div>
            </div>

            {
                (documents.length > 0) && (
                    <div className="Docs-container-2">
                        <div className="title-2"> Recent documents </div>
                        <div className="grid grid-cols-6">
                            {
                                documents?.map((docs, index) =>
                                    <Docs documentId={docs._id} docName={docs.name} key={index} />
                                )
                            }
                        </div>
                    </div>)
            }
        </div>
    )
}