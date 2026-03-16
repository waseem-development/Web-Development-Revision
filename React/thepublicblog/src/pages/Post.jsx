import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import appwriteService from "../appwrite/config";

export default function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData);

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

  if (!post) return null;

  const isAuthor = userData?.$id === post.userId;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {post.featuredImage && (
        <div className="rounded-2xl overflow-hidden aspect-video mb-10 bg-surface-raised">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="mb-8">
        <span className="text-xs font-medium uppercase tracking-widest text-amber mb-4 block">
          Article
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight text-foreground mb-4">
          {post.title}
        </h1>
        <div className="flex items-center justify-between pt-4 border-t border-default">
          <span className="text-sm text-ghost">
            {new Date(post.$createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          {isAuthor && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(`/edit-post/${post.$id}`)}
                className="px-3 py-1.5 text-xs font-medium border border-default rounded-lg text-foreground hover:bg-surface-raised transition-colors"
              >
                Edit
              </button>
              <button
                onClick={async () => {
                  if (confirm("Delete this post?")) {
                    await appwriteService.deletePost(post.$id);
                    await appwriteService.deleteFile(post.featuredImage);
                    navigate("/");
                  }
                }}
                className="px-3 py-1.5 text-xs font-medium border border-destructive/40 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div
        className="prose-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}