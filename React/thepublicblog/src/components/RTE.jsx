import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import { Label } from "./ui/label";

function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && (
        <Label className="mb-2 block text-sm font-medium">{label}</Label>
      )}
      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            value={value}
            init={{
              branding: false,
              height: 500,
              menubar: true,
              skin: "oxide-dark",
              content_css: "dark",
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | bold italic forecolor backcolor | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | " +
                "link image media table | " +
                "code fullscreen preview | " +
                "removeformat | help",
              content_style: `
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, sans-serif;
                  font-size: 16px;
                  line-height: 1.6;
                  padding: 1rem;
                }
                img {
                  max-width: 100%;
                  height: auto;
                }
              `,
              // Image upload handling
              automatic_uploads: true,
              file_picker_types: "image",
              images_upload_handler: (blobInfo) =>
                new Promise((resolve, reject) => {
                  const reader = new FileReader();
                  reader.onload = () => resolve(reader.result);
                  reader.onerror = () => reject("Image upload failed");
                  reader.readAsDataURL(blobInfo.blob());
                }),
              // Table styles
              table_default_attributes: {
                border: "1",
              },
              table_default_styles: {
                "border-collapse": "collapse",
                width: "100%",
              },
              // Link settings
              link_assume_external_targets: true,
              link_default_target: "_blank",
              // Spell checker
              browser_spellcheck: true,
              // Word count
              wordcount_countcharacters: true,
            }}
            onEditorChange={(content) => onChange(content)}
          />
        )}
      />
    </div>
  );
}

export default RTE;