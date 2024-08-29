import { useParams } from "react-router-dom";
import { useAppSelector } from ".";
import { FolderData, ModuleData } from "../types/types";

export function useModuleData() {
  const { moduleId, folderId } = useParams<{
    folderId: string;
    moduleId: string;
  }>();

  const folder = useAppSelector((state) =>
    state.userData.folders
      ? state.userData.folders.find(
          (folder: FolderData) => folder.id === folderId
        )
      : undefined
  );

  const module = folder?.modules?.find(
    (module: ModuleData) => module.id === moduleId
  );

  return { module, folder, moduleId, folderId };
}
