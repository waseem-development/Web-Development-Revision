import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import appwriteService from "../appwrite/config";
import PostForm from "../components/post-form/PostForm";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      appwriteService.getPost(id).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
        setLoading(false);
      });
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber" />
      </div>
    );
  }

  // Guard: post failed to load but navigate hasn't fired yet
  if (!post) return null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-8 pb-8 border-b border-default">
        <h1 className="font-display text-4xl font-semibold mb-2">Edit Post</h1>
        <p className="text-muted text-sm">Update your post below.</p>
      </div>
      <PostForm post={post} />
    </div>
  );
}