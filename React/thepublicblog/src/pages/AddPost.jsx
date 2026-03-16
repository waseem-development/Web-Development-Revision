import PostForm from "../components/post-form/PostForm";

export default function AddPost() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-8 pb-8 border-b border-default">
        <h1 className="font-display text-4xl font-semibold mb-2">Write a Post</h1>
        <p className="text-muted text-sm">Share your story with the world.</p>
      </div>
      <PostForm />
    </div>
  );
}