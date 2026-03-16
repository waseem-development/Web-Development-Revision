import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

function RTE({ name, control, label, defaultValue = "" }) {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-medium uppercase tracking-widest text-ghost mb-2">
          {label}
        </label>
      )}
      <div className="rounded-xl overflow-hidden border border-default">
        <Controller
          name={name || "content"}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { onChange, value } }) => (
            <Editor
              value={value}
              init={{
                branding: false,
                height: 520,
                menubar: true,
                skin: isDark ? "oxide-dark" : "oxide",
                content_css: isDark ? "dark" : "default",
                plugins: [
                  "advlist", "autolink", "lists", "link", "image",
                  "charmap", "preview", "anchor", "searchreplace",
                  "visualblocks", "code", "fullscreen", "insertdatetime",
                  "media", "table", "help", "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | bold italic forecolor backcolor | " +
                  "alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist outdent indent | " +
                  "link image media table | " +
                  "code fullscreen preview | removeformat | help",
                content_style: `
                  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
                  body {
                    font-family: 'DM Sans', sans-serif;
                    font-weight: 300;
                    font-size: 16px;
                    line-height: 1.75;
                    padding: 1.5rem 2rem;
                    max-width: 780px;
                    margin: 0 auto;
                    color: ${isDark ? "#edeae2" : "#1a1a1a"};
                    background: ${isDark ? "#1c1c1c" : "#ffffff"};
                  }
                  h1, h2, h3, h4 {
                    font-family: 'Playfair Display', serif;
                    letter-spacing: -0.02em;
                    line-height: 1.2;
                  }
                  img { max-width: 100%; height: auto; border-radius: 8px; }
                  a { color: #d97706; }
                  blockquote {
                    border-left: 3px solid #d97706;
                    margin-left: 0;
                    padding-left: 1.5rem;
                    font-style: italic;
                    opacity: 0.8;
                  }
                `,
                automatic_uploads: true,
                file_picker_types: "image",
                images_upload_handler: (blobInfo) =>
                  new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = () => reject("Image upload failed");
                    reader.readAsDataURL(blobInfo.blob());
                  }),
                table_default_attributes: { border: "1" },
                table_default_styles: { "border-collapse": "collapse", width: "100%" },
                link_assume_external_targets: true,
                link_default_target: "_blank",
                browser_spellcheck: true,
                wordcount_countcharacters: true,
              }}
              onEditorChange={(content) => onChange(content)}
            />
          )}
        />
      </div>
    </div>
  );
}

export default RTE;