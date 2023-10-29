
import Image from "next/image";

export const Loader = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="w-10 h-10 relative animate-spin">
        <Image alt="Logo" src="/logo.png" layout="fill" objectFit="contain" />
      </div>
      <p className="text-sm text-muted-foreground">BabaJi is thinking...</p>
    </div>
  );
};