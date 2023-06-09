import { FileUpload } from "primereact/fileupload";
import { useRouter } from "next/navigation";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";

const FileUploadForm = () => {
  const router = useRouter( )
  return (
    <div className="flex flex-row w-full  items-center justify-center gap-2">
      <div className="w-1/2">
        <FileUpload
          name="image"
          mode="advanced"
          url="/api/editImage"
          emptyTemplate={
            "Drag & Drop a file here to Image generator endpoint /api/editImage."
          }
          headerStyle={{ textAlign: "center" }}
          auto={true}
          onUpload={() => router.push("/")}
        ></FileUpload>
      </div>
    </div>
  );
};

export default FileUploadForm;
