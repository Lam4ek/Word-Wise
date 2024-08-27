import { useEffect, useState } from "react";
import ModuleList from "./components/ModuleList/ModuleList";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../Hooks";
import { FolderData } from "../../../types/types";
import NotFoundPage from "../../../pages/NotFoundPage/NotFoundPage";
import { addModule } from "../../../store/dataSlice";

function Modules() {
  const [isLoading, setIsLoading] = useState(true);
  const { folderId } = useParams<{ folderId: string }>();

  const data = useAppSelector((state) =>
    state.userData.folders
      ? state.userData.folders.find(
          (folder: FolderData) => folder.id === folderId
        )
      : undefined
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigation = (moduleId: string) => {
    navigate(`./${moduleId}`);
  };

  const handleAddModule = () => {
    dispatch(addModule({ folderId: data.id }));
  };

  useEffect(() => {
    setIsLoading(!data);
  }, [data]);

  if (!data) {
    return <NotFoundPage />;
  }
  return (
    <>
      <h2 style={{ marginBottom: "10px" }}>Modules</h2>
      {folderId && !isLoading ? (
        <ModuleList
          data={data}
          handleNavigation={handleNavigation}
          handleAddModule={handleAddModule}
        />
      ) : (
        <>Loading...</>
      )}
    </>
  );
}

export default Modules;
