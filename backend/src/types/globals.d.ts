export interface UsuarioAutenticado 
{
  id: string;
  email: string;
}

declare global 
{
  namespace Express 
  {
    interface Request 
    {
      user?: UsuarioAutenticado;
    }
  }
}