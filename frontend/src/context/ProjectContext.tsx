import { createContext, useContext, ReactNode } from "react";

type ProjectContextType = {
  integrations: any[];
  currentIntegrationId: string;
};

const ProjectContext = createContext<ProjectContextType>({
  integrations: [],
  currentIntegrationId: "",
});

export const ProjectProvider = ({
  integrations,
  currentIntegrationId,
  children,
}: {
  integrations: any[];
  currentIntegrationId: string;
  children: ReactNode;
}) => {
  return (
    <ProjectContext.Provider value={{ integrations, currentIntegrationId }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);
