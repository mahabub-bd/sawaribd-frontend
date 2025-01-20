import dynamic from "next/dynamic";
import { useMemo, useRef } from "react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const editorRef = useRef(null);

  const editorConfig = useMemo(
    () => ({
      uploader: {
        insertImageAsBase64URI: true,
        imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
      },
      height: 300,
      readonly: false,
      toolbar: true,
    }),
    []
  );

  return (
    <div className="w-full">
      <JoditEditor
        ref={editorRef}
        value={value}
        config={editorConfig}
        onChange={onChange}
        className="bg-white"
      />
    </div>
  );
}
