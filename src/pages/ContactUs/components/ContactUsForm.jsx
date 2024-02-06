import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Box, Button, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { useParams } from "react-router-dom";
import { isValidHTML } from "../../../utils/isValidHTML";
import { toast } from "react-toastify";
import DOMPurify from 'dompurify';
import { formatDateTime } from "../../../utils/formatDateTime";
import { decodeHtml } from "../../../utils/decodeHTML";

export default function ContactUsForm() {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const queryClient = useQueryClient();
  const params = useParams();

  const { isLoading, mutate:SubmitMessage} = useMutation({
    mutationFn: async (data) => {
      const response = await axios({
        url: `http://localhost:5059/api/contact_messages/${params.id}`,
        method: "PUT",
        data: data
      });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["message"]);
      queryClient.invalidateQueries(["messages"]);
      toast.success("Message answered successfully");
    },
    onError: (error) => {
      //toast.error("Error answering message");
      toast.error(error.response.data.message);
    },
  });

  const {
    data: message,
    isLoading: dataIsLoading,
    error: getError, //BURDA NE YAPICAM BİLMİYORUM
  } = useQuery({
    queryKey: ["message", params.id],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5059/api/contact_messages/${params.id}`
      );
      return response.data.data;
    },
    enabled: !!params.id,
  });

  useEffect(() => {
    if (message) {
      setAnswer(message.answer ? message.answer : "");
    }
  }, [message]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(answer)
    setError("");
    if(answer === ""){
      setError("Answer cannot be empty");
      return;
    }

    let clean = decodeHtml(answer);

    if(!isValidHTML(answer)){
      setError("Answer is not valid HTML");
      return;
    }   
    SubmitMessage({answer:clean});
  };

  return (
    <div>
      <Typography variant="h4" sx={{ textAlign: "center", my: 4 }}>
        Answer Message
      </Typography>
      <Typography variant="h6" sx={{ my: 4 }}>
        <b>Message Id :</b> {message?.id ? message.id : "Not found"}
      </Typography>
      <Typography variant="h6" sx={{ my: 4 }}>
        <b>Status:</b> {message?.status ? message.status : "Error"}
      </Typography>
      <Typography variant="h6" sx={{ my: 4 }}>
        <b>Message Date :</b> {(message?.status === "Closed" && message.messageDate) ? formatDateTime(message.messageDate) : "Not answered yet"}
      </Typography>
      <Typography variant="h6" sx={{ my: 4 }}>
        <b>Answer Date :</b> {(message?.status === "Closed" && message.answerDate) ? formatDateTime(message.answerDate) : "Not answered yet"}
      </Typography>
      <Typography variant="h6" sx={{ my: 4 }}>
        <b>Sender name :</b> {message?.name}
      </Typography>
      <Typography variant="h6" sx={{ my: 4 }}>
        <b>Mail :</b> {message?.email}
      </Typography>
      <Typography variant="h6" sx={{ my: 4 }}>
        <b>Subject :</b> {message?.subject}
      </Typography>
      <Typography variant="h6" sx={{ my: 4 }}>
        <b>Message :</b> {message?.message}
      </Typography>


      <form onSubmit={onSubmitHandler}>
      <Typography variant="h6" sx={{ my: 4 }}>
        <b>Answer</b>
      </Typography>
        <CKEditor
          editor={ClassicEditor}
          data={answer}
          onChange={(event, editor) => {
            setAnswer(editor.getData());
            console.log(editor.getData());
          }}    
        />

        <Typography color={"error"} sx={{ my: 4, fontSize: "20px" }}>
          {error }
        </Typography>
        <Typography variant="h6" sx={{ my: 4 }}>
         Please do not send any personal information or any file or any media
      </Typography>

        <Button variant="contained" type="submit" fullWidth disabled={isLoading}>
          Send
        </Button>
      </form>
    </div>
  );
}
