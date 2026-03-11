import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-0">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-48 object-cover rounded-t-xl"
          />
        </CardContent>

        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>

        <CardFooter>
          <span className="text-sm text-gray-500">Read more →</span>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default PostCard;
