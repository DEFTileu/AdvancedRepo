import { Toaster as SonnerToaster, type ToasterProps } from 'sonner';

const Toaster = (props: ToasterProps) => {
  return <SonnerToaster className="toaster group" {...props} />;
};

export { Toaster };
