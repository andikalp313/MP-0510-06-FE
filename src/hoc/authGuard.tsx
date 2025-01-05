import LoadingScreen from "@/components/LoadingScreen";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard(Component: any) {
  return function IsAuth(props: any) {
    const { id } = useAppSelector((state) => state.user);
    const router = useRouter();
    useEffect(() => {
      if (!id) {
        router.push("/login");
      }
    }, [id, router]);

    if (!id) {
      return <LoadingScreen />;
    }

    return <Component {...props} />;
  };
}