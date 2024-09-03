import { FC } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useVideoPlayerStore } from "@/app/store";
import { jsonParser } from "@/lib/utils";

export const UploadScreen: FC = () => {
  const { setVidoUrl, setDefects } = useVideoPlayerStore();

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setVidoUrl(url);
  };

  const handleJsonFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = JSON.parse(e.target?.result as string);
          const defectsMap = jsonParser(content);
          setDefects(defectsMap);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex flex-col gap-16 justify-center items-center">
      <h1 className="text-2xl ">Please Upload Files For 360 Video</h1>
      <div className="flex gap-8 flex-col">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="video">Upload Video</Label>
          <Input
            id="video"
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="json">Upload JSON</Label>
          <Input
            id="json"
            type="file"
            accept="application/json"
            onChange={handleJsonFileUpload}
          />
        </div>
      </div>
    </div>
  );
};
