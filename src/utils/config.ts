type Routes = {
    login: string;
    home: string;
  };
  
  type EnvironmentConfig = {
    routes: Routes;
  };
  
  const routes: Routes = {
    login: "/auth/login",
    home: "/home",
  };
  
  const environment: Record<string, EnvironmentConfig> = {
    development: { routes },
    production: { routes },
  };
  
  const currentEnv = "development";
  
  export default environment[currentEnv] || environment.development;
  