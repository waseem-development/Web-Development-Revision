import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader2, Upload, FileText, Settings } from "lucide-react";
import RTE from "../RTE";
import appwriteService from "../../appwrite/config";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
    defaultValues: {
      title:   post?.title   || "",
      slug:    post?.slug    || "",
      content: post?.content || "",
      status:  post?.status  || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData); // ← fixed
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [imagePreview, setImagePreview] = useState(
    post?.featuredImage ? appwriteService.getFilePreview(post.featuredImage) : null
  );

  // ── Slug auto-transform ──
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value.trim().toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  // ── Image preview ──
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  // ── Submit ──
  const submit = async (data) => {
    setSubmitting(true);
    setSubmitError("");
    try {
      if (post) {
        // Edit mode
        const file = data.image?.[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file) await appwriteService.deleteFile(post.featuredImage);

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
        });

        if (dbPost) navigate(`/post/${dbPost.$id}`);
      } else {
        // Create mode
        const file = await appwriteService.uploadFile(data.image[0]);
        if (file) {
          const dbPost = await appwriteService.createPost({
            ...data,
            featuredImage: file.$id,
            userId: userData.$id,
          });
          if (dbPost) navigate(`/post/${dbPost.$id}`);
        }
      }
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="w-full">

      {/* Error banner */}
      {submitError && (
        <div className="mb-6 p-4 rounded-xl border border-destructive/30 bg-destructive/5 text-sm text-destructive">
          {submitError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── Left: main content (2/3) ── */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium uppercase tracking-widest text-ghost">
              Post Title
            </label>
            <input
              type="text"
              placeholder="Write your title here..."
              className={`w-full px-4 py-3 rounded-xl bg-surface border text-sm outline-none transition-colors placeholder:text-ghost focus:border-amber font-display text-lg ${
                errors.title ? "border-destructive" : "border-default"
              }`}
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title.message}</p>
            )}
          </div>

          {/* Slug */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium uppercase tracking-widest text-ghost">
              URL Slug
            </label>
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-surface border border-default focus-within:border-amber transition-colors">
              <span className="text-ghost text-sm select-none">/post/</span>
              <input
                type="text"
                placeholder="your-post-slug"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-ghost"
                {...register("slug", { required: "Slug is required" })}
                onInput={(e) =>
                  setValue("slug", slugTransform(e.target.value), {
                    shouldValidate: true,
                  })
                }
              />
            </div>
            {errors.slug && (
              <p className="text-xs text-destructive">{errors.slug.message}</p>
            )}
          </div>

          {/* RTE */}
          <div className="flex flex-col gap-1.5">
            <RTE
              label="Content"
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
            {errors.content && (
              <p className="text-xs text-destructive">Content is required</p>
            )}
          </div>

        </div>

        {/* ── Right: sidebar (1/3) ── */}
        <div className="flex flex-col gap-6">

          {/* Publish card */}
          <div className="bg-surface border border-default rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-subtle flex items-center gap-2">
              <Settings size={14} className="text-ghost" />
              <span className="text-xs font-medium uppercase tracking-widest text-ghost">
                Publish Settings
              </span>
            </div>
            <div className="p-5 flex flex-col gap-4">

              {/* Status */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-widest text-ghost">
                  Status
                </label>
                <select
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-raised border border-default text-sm outline-none focus:border-amber transition-colors cursor-pointer"
                  {...register("status", { required: true })}
                >
                  <option value="active">✓ Published</option>
                  <option value="inactive">○ Draft</option>
                </select>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center justify-center gap-2 w-full py-3 bg-amber text-[oklch(0.08_0_0)] font-medium rounded-xl hover:opacity-90 disabled:opacity-60 transition-opacity text-sm mt-1"
              >
                {submitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    <FileText size={15} />
                    {post ? "Update Post" : "Publish Post"}
                  </>
                )}
              </button>

            </div>
          </div>

          {/* Featured image card */}
          <div className="bg-surface border border-default rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-subtle flex items-center gap-2">
              <Upload size={14} className="text-ghost" />
              <span className="text-xs font-medium uppercase tracking-widest text-ghost">
                Featured Image
              </span>
            </div>
            <div className="p-5 flex flex-col gap-4">

              {/* Preview */}
              {imagePreview && (
                <div className="rounded-xl overflow-hidden aspect-video bg-surface-raised">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Upload input */}
              <label className="flex flex-col items-center justify-center gap-2 px-4 py-6 rounded-xl border-2 border-dashed border-default hover:border-amber transition-colors cursor-pointer bg-surface-raised">
                <Upload size={20} className="text-ghost" />
                <span className="text-xs text-ghost text-center">
                  {imagePreview ? "Click to change image" : "Click to upload image"}
                </span>
                <span className="text-xs text-ghost/60">PNG, JPG, GIF</span>
                <input
                  type="file"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  className="hidden"
                  {...register("image", { required: !post })}
                  onChange={(e) => {
                    register("image").onChange(e);
                    handleImageChange(e);
                  }}
                />
              </label>
              {errors.image && (
                <p className="text-xs text-destructive">Featured image is required</p>
              )}

            </div>
          </div>

        </div>
      </div>
    </form>
  );
}

export default PostForm;